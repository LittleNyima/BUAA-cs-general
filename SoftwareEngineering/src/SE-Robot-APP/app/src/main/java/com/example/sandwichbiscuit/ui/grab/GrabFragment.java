package com.example.sandwichbiscuit.ui.grab;

import android.annotation.SuppressLint;
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.StrictMode;
import android.service.autofill.TextValueSanitizer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.example.sandwichbiscuit.R;
import com.example.sandwichbiscuit.config.Config;
import com.example.sandwichbiscuit.ui.slideshow.SlideshowFragment;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import static com.example.sandwichbiscuit.ui.gallery.GalleryFragment.waypoints;

public class GrabFragment extends Fragment {
    private GrabViewModel grabViewModel;
    private ImageView grab_img_up;
    private ImageView grab_img_down;
    private String baseUrl = Config.BASE_URL;
    private String imgUrl = baseUrl + "img/map/1.png";
    private String grabUrl = baseUrl + "grab";
    private String passUrl = baseUrl + "pass";
    private String selected_point;
    //private String graphUrl = baseUrl + "img/navigation/2.jpg";

    Timer timer = new Timer();
    //private PlayerView player;
    private AnimationDrawable mAnimationDrawable;

    private Handler mHandler = new Handler() {
        public void handleMessage(Message message) {
            if (getContext() != null) {
                Glide.with(GrabFragment.this).load(imgUrl).apply(new RequestOptions()
                        .diskCacheStrategy(DiskCacheStrategy.NONE)
                        .skipMemoryCache(true))
                        .into(grab_img_up);
            }
        }
    };

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        grabViewModel = new ViewModelProvider(this).get(GrabViewModel.class);

        View root = inflater.inflate(R.layout.fragment_grab, container, false);

        //final TextView textView = root.findViewById(R.id.text_grab);

        /*grabViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String s) {
                textView.setText(s);
            }
        });*/
        return root;
    }

    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        List<String> list = waypoints;
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, list);
        adapter.setDropDownViewResource(android.R.layout.simple_list_item_checked);
        Spinner sp = (Spinner)getActivity().findViewById(R.id.grab_choice_bar);
        sp.setAdapter(adapter);
        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selected_point = adapter.getItem(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        getActivity().findViewById(R.id.Grab).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject json = new JSONObject();
                try {
                    json.put("grab_name", selected_point);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                doPost(grabUrl, json.toString());
            }
        });

        getActivity().findViewById(R.id.pass_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                doGet(passUrl);
            }
        });

        grab_img_up = getActivity().findViewById(R.id.grab_img);
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                Message message = new Message();
                mHandler.sendMessage(message);
            }
        };
        timer.scheduleAtFixedRate(task, 0, 1500);
    }

    public void doGet(final String httpurl) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                //println("in doGet");
                HttpURLConnection connection = null;
                InputStream is = null;
                BufferedReader br = null;
                String result = null;// ?????????????????????
                try {
                    // ????????????url????????????
                    //String name = "fwt";
                    URL url = new URL(httpurl);
                    // ????????????url??????????????????????????????????????????httpURLConnection???
                    connection = (HttpURLConnection) url.openConnection();
                    // ?????????????????????get
                    connection.setRequestMethod("GET");
                    // ?????????????????????????????????????????????15000??????
                    connection.setConnectTimeout(15000);
                    // ??????????????????????????????????????????60000??????
                    connection.setReadTimeout(60000);
                    // ????????????
                    connection.connect();
                    // ??????connection????????????????????????
                    if (connection.getResponseCode() == 200) {
                        is = connection.getInputStream();
                        // ???????????????is?????????????????????
                        br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                        // ????????????
                        StringBuffer sbf = new StringBuffer();
                        String temp = null;
                        while ((temp = br.readLine()) != null) {
                            sbf.append(temp);
                            sbf.append("\r\n");
                        }
                        result = sbf.toString();
                    }
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    // ????????????
                    if (null != br) {
                        try {
                            br.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (null != is) {
                        try {
                            is.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    //connection.disconnect();// ??????????????????
                }
            }
        }).start();
    }

    @SuppressLint("NewApi")
    public String doPost(final String httpUrl, String param) {
        HttpURLConnection connection = null;
        InputStream is = null;
        OutputStream os = null;
        BufferedReader br = null;
        String result = null;
        try {
            URL url = new URL(httpUrl);
            // ????????????url????????????????????????
            connection = (HttpURLConnection) url.openConnection();
            // ????????????????????????
            connection.setRequestMethod("POST");
            // ??????????????????????????????????????????15000??????
            connection.setConnectTimeout(15000);
            // ??????????????????????????????????????????????????????60000??????
            connection.setReadTimeout(60000);
            // ???????????????false????????????????????????????????????/??????????????????????????????true
            connection.setDoOutput(true);
            // ???????????????true???????????????????????????????????????????????????true????????????????????????
            connection.setDoInput(true);
            connection.setUseCaches(false);
            // ???????????????????????????:????????????????????? name1=value1&name2=value2 ????????????
            //connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            // ?????????????????????Authorization: Bearer da3efcbf-0845-4fe3-8aba-ee040be542c0
            //connection.setRequestProperty("Authorization", "Bearer da3efcbf-0845-4fe3-8aba-ee040be542c0");
            // ???????????????????????????????????????
            os = connection.getOutputStream();
            // ???????????????????????????????????????/????????????,?????????????????????????????????
            os.write(param.getBytes());
            // ?????????????????????????????????????????????????????????
            if (connection.getResponseCode() == 200) {
                is = connection.getInputStream();
                // ??????????????????????????????:charset???????????????????????????????????????
                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                StringBuffer sbf = new StringBuffer();
                String temp = null;
                // ????????????????????????????????????
                while ((temp = br.readLine()) != null) {
                    sbf.append(temp);
                    sbf.append("\r\n");
                }
                result = sbf.toString();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // ????????????
            if (null != br) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != os) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != is) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            // ?????????????????????url?????????
            //connection.disconnect();
        }
        return result;
    }
}
