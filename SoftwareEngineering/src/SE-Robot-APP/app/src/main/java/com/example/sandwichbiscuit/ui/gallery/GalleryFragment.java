package com.example.sandwichbiscuit.ui.gallery;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.PixelFormat;
import android.graphics.drawable.AnimationDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.StrictMode;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.target.Target;
import com.bumptech.glide.request.transition.Transition;
import com.dou361.ijkplayer.widget.PlayStateParams;
import com.dou361.ijkplayer.widget.PlayerView;
import com.example.sandwichbiscuit.R;
import com.example.sandwichbiscuit.config.Config;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutionException;

//建图功能界面
public class GalleryFragment extends Fragment{

    public static ArrayList<String> waypoints = new ArrayList<String>();
    private GalleryViewModel galleryViewModel;
    private ImageView Imview_up;
    private ImageView Imview_down;
    private Bitmap bmImg;
    private String prefix = Config.BASE_URL;
    //private String postUrl = "http://10.136.142.46:60130/test";
    private String forwardUrl = prefix + "forward";
    private String backUrl = prefix + "back";
    private String leftUrl = prefix + "left";
    private String rightUrl = prefix + "right";
    private String stopUrl = prefix + "stop";
    private String addWaypointUrl = prefix + "waypoint";
    private String graphUrl = prefix + "img/map/1.png";
    private String saveMapUrl = prefix + "saveMap";
    private String resetMapUrl = prefix + "resetMap";
    private EditText waypoint_name;
    private TextView waypoint_error;
    View focusView = null;
    //private String
    Timer timer = new Timer();
    //private PlayerView player;
    private AnimationDrawable mAnimationDrawable;

    private Handler mHandler = new Handler() {
        public void handleMessage(Message message) {
            if (getContext() != null) {
                Glide.with(GalleryFragment.this).load(graphUrl).apply(new RequestOptions()
                        .diskCacheStrategy(DiskCacheStrategy.NONE)
                        .skipMemoryCache(true))
                        .into(Imview_up);
            }
        }
    };

    //下层图层加载
    private Handler downHandler = new Handler() {
        public void handleMessage(Message message) {
            if (getContext() != null) {
                Glide.with(GalleryFragment.this).load(graphUrl).apply(new RequestOptions()
                        .diskCacheStrategy(DiskCacheStrategy.NONE)
                        .skipMemoryCache(true))
                        .into(Imview_down);
            }
        }
    };

    //private Handler mHandler = null;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        galleryViewModel =
                new ViewModelProvider(this).get(GalleryViewModel.class);
        View root = inflater.inflate(R.layout.fragment_gallery, container, false);
        /*player = new PlayerView((Activity)getContext())
                .setTitle("这是标题")
                .setScaleType(PlayStateParams.fitparent)
                // 禁止双击（双击切换全屏）
                .setForbidDoulbeUp(true)
                // 隐藏菜单键
                .hideMenu(true)
                // 隐藏分辨率
                .hideSteam(true)
                // 隐藏全屏按钮
                .hideFullscreen(true)
                //隐藏中间播放按钮,ture为隐藏
                .hideCenterPlayer(true)
                // 隐藏屏幕旋转按钮
                .hideRotation(true)
                //是否隐藏bottonbar
                //                .hideBottonBar(true)
                //是否隐藏上下bar
                .hideControlPanl(false)
                //是否仅仅为全屏
                .setOnlyFullScreen(false)
                //设置2/3/4/5G和WiFi网络类型提示 true为进行2/3/4/5G网络类型提示 false 不进行网络类型提示
                .setNetWorkTypeTie(true)
                //显示加载网速
                .setShowSpeed(true);

        player.setPlaySource("rtmp://10.135.170.210:60001/live/ros").startPlay();*/
        return root;
    }

    @Override
    public void onActivityCreated(@Nullable final Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);


        getActivity().findViewById(R.id.Upward).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("part1", "Robots move Upward!");
                    doGet(forwardUrl);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                /*OkGo.<String>get("http://10.136.142.46:60130/test")
                        .tag(this)
                        .cacheKey("cacheKey")
                        .cacheMode(CacheMode.NO_CACHE)
                        .execute(new StringCallback() {
                            @Override
                            public void onSuccess(Response<String> response) {
                                //println("Receive");
                            }
                        });*/

            }
        });

        getActivity().findViewById(R.id.Downward).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("part1", "Robots move Downward!");
                    doGet(backUrl);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                /*OkGo.<String>post(postUrl)
                        .tag(this)
                        .upJson(jsonObject.toString());*/

            }
        });

        getActivity().findViewById(R.id.Leftward).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("part1", "Robots move Leftward!");
                    doGet(leftUrl);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                /*OkGo.<String>post(postUrl)
                        .tag(this)
                        .upJson(jsonObject.toString());*/
            }
        });

        getActivity().findViewById(R.id.Rightward).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("part1", "Robots move Rightward!");
                    doGet(rightUrl);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                /*OkGo.<String>post(postUrl)
                        .tag(this)
                        .upJson(jsonObject.toString());*/
            }
        });

        getActivity().findViewById(R.id.stop).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    doGet(stopUrl);
            }
        });

        getActivity().findViewById(R.id.save_map).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(getContext(), "保存成功！！", Toast.LENGTH_LONG).show();
                //    通过AlertDialog.Builder这个类来实例化我们的一个AlertDialog的对象
                AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
                //    设置Title的图标
                builder.setIcon(R.drawable.ic_launcher_foreground);
                //    设置Title的内容
                builder.setTitle("提示");
                //    设置Content来显示一个信息
                builder.setMessage("是否保存已建好的地图？");
                //    设置一个PositiveButton
                builder.setPositiveButton("是", new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        Toast.makeText(getContext(), "已保存地图！", Toast.LENGTH_SHORT).show();
                        doGet(saveMapUrl);
                    }
                });
                //    设置一个NegativeButton
                builder.setNegativeButton("否", new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        Toast.makeText(getContext(), "请重新操作！", Toast.LENGTH_SHORT).show();
                    }
                });
                builder.show();
            }
        });

        getActivity().findViewById(R.id.reset_map).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //    通过AlertDialog.Builder这个类来实例化我们的一个AlertDialog的对象
                AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
                //    设置Title的图标
                builder.setIcon(R.drawable.ic_launcher_foreground);
                //    设置Title的内容
                builder.setTitle("提示");
                //    设置Content来显示一个信息
                builder.setMessage("是否确定删除指定的航点？");
                //    设置一个PositiveButton
                builder.setPositiveButton("是", new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        Toast.makeText(getContext(), "已删除指定的航点！", Toast.LENGTH_SHORT).show();
                        String delName = waypoint_name.getText().toString();
                        waypoints.remove(delName);
                        waypoint_name.setText("");
                        JSONObject json = new JSONObject();
                        try {
                            json.put("waypoint_name",delName);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                        doPost(resetMapUrl, json.toString());
                        //doGet(resetMapUrl);
                    }
                });
                //    设置一个NegativeButton
                builder.setNegativeButton("否", new DialogInterface.OnClickListener()
                {
                    @Override
                    public void onClick(DialogInterface dialog, int which)
                    {
                        Toast.makeText(getContext(), "请重新操作！", Toast.LENGTH_SHORT).show();
                    }
                });
                builder.show();
            }
        });

        waypoint_name = getActivity().findViewById(R.id.waypoint_name);

        getActivity().findViewById(R.id.add_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (waypoint_name.getText().equals("")) {
                    waypoint_error.setText("航点名称不能为空！");
                    waypoint_error.setVisibility(View.VISIBLE);
                    focusView = waypoint_name;
                    focusView.requestFocus();
                } else {
                    String name = waypoint_name.getText().toString();
                    waypoints.add(name);
                    waypoint_name.setText("");
                    JSONObject json = new JSONObject();
                    try {
                        json.put("waypoint_name",name);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    doPost(addWaypointUrl, json.toString());
                }
            }
        });


        Imview_up = getActivity().findViewById(R.id.Mapping);
        Imview_down = getActivity().findViewById(R.id.Mapping_down);

        /*new Thread(new Runnable()  {
            @Override
            public void run() {
                    //initAnimationDrawable();
                while (true) {

                    mHandler = new Handler() {
                        public void handleMessage(Message message) {
                            super.handleMessage(message);
                            switch (message.what) {
                                case 1 :
                                    try {
                                        System.err.println("before init");
                                        initAnimationDrawable();
                                    } catch (ExecutionException e) {
                                        e.printStackTrace();
                                    } catch (InterruptedException e) {
                                        e.printStackTrace();
                                    }
                                    break;
                            }
                        }
                    };
                    Message message = new Message();
                    message.what = 1;
                    mHandler.sendMessage(message);
                }
            }
        }).start();*/
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                Message message = new Message();
                mHandler.sendMessage(message);
            }
        };
        timer.scheduleAtFixedRate(task, 0, 2000);
        TimerTask task1 = new TimerTask() {
            @Override
            public void run() {
                Message message = new Message();
                downHandler.sendMessage(message);
            }
        };
        timer.scheduleAtFixedRate(task1, 0, 2000);
        /*gainBitmap(graphUrl, new BitmapCallback() {
            @Override
            public void onSuccess(Response<Bitmap> response) {
                Imview.setImageBitmap(response.body());
            }
        });*/
    }

    /*private void initAnimationDrawable() throws ExecutionException, InterruptedException {
        System.err.println("in Animation");
        mAnimationDrawable = new AnimationDrawable();

        for (; ; ) {
            //int id = getResources().getIdentifier("sample_" + i,"mipmap",getPackageName());

            //Drawable drawable = getResources().getDrawable(id);
            Drawable drawable = Glide.with(GalleryFragment.this).load(graphUrl).apply(new RequestOptions()
                    .diskCacheStrategy(DiskCacheStrategy.NONE)
                    .skipMemoryCache(true)).submit().get();


            mAnimationDrawable.addFrame(drawable,100);
            mAnimationDrawable.setOneShot(false);

            Imview.setImageDrawable(mAnimationDrawable);
        }
    }*/

    public  Bitmap drawableToBitmap(Drawable drawable) {
        /*
         * Drawable转化为Bitmap
         */
        int width = drawable.getIntrinsicWidth();
        int height = drawable.getIntrinsicHeight();
        Bitmap bitmap = Bitmap.createBitmap(width, height,
                drawable.getOpacity() != PixelFormat.OPAQUE ? Bitmap.Config.ARGB_8888: Bitmap.Config.RGB_565);
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0,0,width,height);
        drawable.draw(canvas);
        return bitmap;
    }

    /*public void gainBitmap(String url, BitmapCallback bitmapCallback) {
        OkGo.<Bitmap>post(url)
                .retryCount(3)
                .tag(url)
                .execute(bitmapCallback);
    }*/

    public void doGet(final String httpurl) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                //println("in doGet");
                HttpURLConnection connection = null;
                InputStream is = null;
                BufferedReader br = null;
                String result = null;// 返回结果字符串
                try {
                    // 创建远程url连接对象
                    //String name = "fwt";
                    URL url = new URL(httpurl);
                    // 通过远程url连接对象打开一个连接，强转成httpURLConnection类
                    connection = (HttpURLConnection) url.openConnection();
                    // 设置连接方式：get
                    connection.setRequestMethod("GET");
                    // 设置连接主机服务器的超时时间：15000毫秒
                    connection.setConnectTimeout(15000);
                    // 设置读取远程返回的数据时间：60000毫秒
                    connection.setReadTimeout(60000);
                    // 发送请求
                    connection.connect();
                    // 通过connection连接，获取输入流
                    if (connection.getResponseCode() == 200) {
                        is = connection.getInputStream();
                        // 封装输入流is，并指定字符集
                        br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                        // 存放数据
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
                    // 关闭资源
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
                    //connection.disconnect();// 关闭远程连接
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
            // 通过远程url连接对象打开连接
            connection = (HttpURLConnection) url.openConnection();
            // 设置连接请求方式
            connection.setRequestMethod("POST");
            // 设置连接主机服务器超时时间：15000毫秒
            connection.setConnectTimeout(15000);
            // 设置读取主机服务器返回数据超时时间：60000毫秒
            connection.setReadTimeout(60000);
            // 默认值为：false，当向远程服务器传送数据/写数据时，需要设置为true
            connection.setDoOutput(true);
            // 默认值为：true，当前向远程服务读取数据时，设置为true，该参数可有可无
            connection.setDoInput(true);
            connection.setUseCaches(false);
            // 设置传入参数的格式:请求参数应该是 name1=value1&name2=value2 的形式。
            //connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            // 设置鉴权信息：Authorization: Bearer da3efcbf-0845-4fe3-8aba-ee040be542c0
            //connection.setRequestProperty("Authorization", "Bearer da3efcbf-0845-4fe3-8aba-ee040be542c0");
            // 通过连接对象获取一个输出流
            os = connection.getOutputStream();
            // 通过输出流对象将参数写出去/传输出去,它是通过字节数组写出的
            os.write(param.getBytes());
            // 通过连接对象获取一个输入流，向远程读取
            if (connection.getResponseCode() == 200) {
                is = connection.getInputStream();
                // 对输入流对象进行包装:charset根据工作项目组的要求来设置
                br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                StringBuffer sbf = new StringBuffer();
                String temp = null;
                // 循环遍历一行一行读取数据
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
            // 关闭资源
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
            // 断开与远程地址url的连接
            //connection.disconnect();
        }
        return result;
    }
}