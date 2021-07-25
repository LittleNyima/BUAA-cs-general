package com.example.sandwichbiscuit.ui.register;

import android.database.Cursor;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.sandwichbiscuit.R;
import com.example.sandwichbiscuit.database.Database;
import com.example.sandwichbiscuit.data.LoginDataSource;
import com.example.sandwichbiscuit.ui.login.LoginActivity;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegisterActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText register_email;
    private EditText register_password;
    private EditText register_password_confirm;
    private Button register_confirm_button;
    private TextView email_error;
    private TextView password_error;
    private TextView password_confirm_error;

    private Database db;

    public void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_register);

        db = new Database(this);

        register_email = findViewById(R.id.register_email);
        register_password = findViewById(R.id.register_password);
        register_password_confirm = findViewById(R.id.register_password_confirm);
        register_confirm_button = findViewById(R.id.register_confirm_button);
        email_error = findViewById(R.id.email_error);
        password_error = findViewById(R.id.error_password);
        password_confirm_error = findViewById(R.id.error_password_confirm);

        register_confirm_button.setOnClickListener(this);

        register_email.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                email_error.setVisibility(View.INVISIBLE);
            }
        });

        register_password.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                password_error.setVisibility(View.INVISIBLE);
            }
        });

        register_password_confirm.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                password_confirm_error.setVisibility(View.INVISIBLE);
            }
        });
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.register_confirm_button :
                atteptRegister();
                break;
        }
    }

    private void atteptRegister() {
        //reset error
        email_error.setError(null);
        password_error.setError(null);
        password_confirm_error.setError(null);

        String address = register_email.getText().toString();
        String password = register_password.getText().toString();
        String password_confirm = register_password_confirm.getText().toString();

        View focusView = null;
        boolean cancel = false;

        if (TextUtils.isEmpty(address)) {
            email_error.setText(R.string.error_empty_email);
            email_error.setVisibility(View.VISIBLE);
            focusView = register_email;
            cancel = true;
        } else if (!AddressIsValid(address)) {
            email_error.setText(R.string.error_invalid_email);
            email_error.setVisibility(View.VISIBLE);
            focusView = register_email;
            cancel = true;
        }

        if (TextUtils.isEmpty(password)) {
            password_error.setText(R.string.error_empty_reg_password);
            password_error.setVisibility(View.VISIBLE);
            focusView = register_password;
            cancel = true;
        } else if (!PasswordIsValid(password)) {
            password_error.setText(R.string.error_invalid_reg_password);
            password_error.setVisibility(View.VISIBLE);
            focusView = register_password;
            cancel = true;
        }

        if (TextUtils.isEmpty(password_confirm)) {
            password_confirm_error.setText(R.string.error_empty_reg_password);
            password_confirm_error.setVisibility(View.VISIBLE);
            focusView = register_password_confirm;
            cancel = true;
        } else if (!ConfirmPasswordIsValid(password, password_confirm)) {
            password_confirm_error.setText(R.string.error_invalid_confirm_password);
            password_confirm_error.setVisibility(View.VISIBLE);
            focusView = register_password_confirm;
            cancel = true;
        }

        if (!hasRegistered(address)) {
            email_error.setText(R.string.error_used_email);
            email_error.setVisibility(View.VISIBLE);
            focusView = register_email;
            cancel = true;
        }

        if (cancel) {
            focusView.requestFocus();
        } else {
            db.insert(address, password);
            /*System.out.println(address);
            String args[] = {"%" + address + "%"};
            Cursor cursor = db.query(args);
            String cols[] = cursor.getColumnNames();
            System.out.println(cols[0]);
            if (cursor == null) {
                System.out.println("cursor is null");
            }
            while(cursor.moveToNext()) {
                Log.i("info", cursor.getString(1));
            }*/
            Toast.makeText(getApplicationContext(), R.string.register_success, Toast.LENGTH_LONG).show();
            finish();
        }
    }

    private boolean AddressIsValid(String address) {
        String root = ".*@(.*)";
        Pattern getRoot = Pattern.compile(root);
        Matcher mgetRoot = getRoot.matcher(address);
        String latter = "";

        while (mgetRoot.find()) {
            latter = mgetRoot.group(1);
        }

        if (latter.equals("buaa.edu.cn")) {
            return true;
        } else {
            return false;
        }
    }

    private boolean PasswordIsValid(String password) {
        return password.length() > 6;
    }

    private boolean ConfirmPasswordIsValid(String password, String confirm_password) {
        return password.equals(confirm_password);
    }

    private boolean hasRegistered(String address) {
        String args[] = {"%" + address + "%"};
        Cursor cursor = db.query(args);
        if (cursor.moveToFirst() == false) { //未找到已存在用户，可以注册
            return true;
        } else {
            return false;
        }
    }
}
