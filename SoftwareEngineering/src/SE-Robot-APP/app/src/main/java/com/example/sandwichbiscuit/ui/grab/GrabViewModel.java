package com.example.sandwichbiscuit.ui.grab;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class GrabViewModel extends ViewModel {
    private MutableLiveData<String> mText;

    public GrabViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("This is grab model fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}
