package com.example.sandwichbiscuit.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.sandwichbiscuit.data.LoginDataSource;
import com.example.sandwichbiscuit.ui.login.LoginActivity;

public class Database extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "user_info.db";
    private static final int DATABASE_VER = 1;
    private static final String DATABASE_TABLE = "user_account";

    public Database(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VER);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "CREATE TABLE " + DATABASE_TABLE
                + "(_id INTEGER PRIMARY KEY, "
                + "user_email VARCHAR(50) NOT NULL, "
                + "user_password VARCHAR(20) NOT NULL, "
                + "displayName VARCHAR(30))";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "DROP TABLE IF EXISTS " + DATABASE_TABLE;
        db.execSQL(sql);
        onCreate(db);
    }

    //获取游标
    public Cursor select() {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.query(DATABASE_TABLE, null, null, null, null, null, null);
        return cursor;
    }

    //插入一条记录
    public long insert(String email,String password ) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();
        cv.put("user_email", email);
        cv.put("user_password", password);
        long row = db.insert(DATABASE_TABLE, null, cv);
        return row;
    }

    //根据条件查询
    public Cursor query(String[] args) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = db.rawQuery("SELECT * FROM "+ DATABASE_TABLE +" WHERE user_email LIKE ?", args);
        return cursor;
    }

}
