package com.example.sandwichbiscuit.data;

import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.IntentSender;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.database.Cursor;
import android.database.DatabaseErrorHandler;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.UserHandle;
import android.util.Log;
import android.view.Display;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.sandwichbiscuit.data.model.LoggedInUser;
import com.example.sandwichbiscuit.database.Database;
import com.example.sandwichbiscuit.ui.login.LoginActivity;
import com.example.sandwichbiscuit.ui.register.RegisterActivity;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    public Result<LoggedInUser> login(String username, String password, Database db) {

        try {
            // TODO: handle loggedInUser authentication
            String args[] = new String[] {"%" + username + "%"};
            System.out.println(username);
            Cursor cursor = db.query(args);
            cursor.moveToNext();
            if(!cursor.moveToFirst()) {
                return new Result.Error(new IOException("this user doesn't exists"));
            }
            if (!cursor.getString(2).equals(password)) {
                return new Result.Error(new IOException("password is wrong"));
            }
            //extract displayName from username(email)
            String name = "(.*)@.*";
            Pattern getname = Pattern.compile(name);
            Matcher mname = getname.matcher(username);
            String disname = "";
            while (mname.find()) {
                disname = mname.group(1);
            }

            LoggedInUser fakeUser =
                    new LoggedInUser(
                            cursor.getString(0),
                            disname);
            return new Result.Success<>(fakeUser);
        } catch (Exception e) {
            return new Result.Error(new IOException("Error logging in", e));
        }
    }

    public void logout() {
        // TODO: revoke authentication
    }
}
