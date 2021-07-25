package com.example.sandwichbiscuit.ui.home;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class HomeViewModel extends ViewModel {

    private MutableLiveData<String> mText;

    public HomeViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("WELCOME TO FAMILY SERVICE ROBOTS SYSTEM!!!");
    }

    public LiveData<String> getText() {
        return mText;
    }
}