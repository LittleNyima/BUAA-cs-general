package com.example.sandwichbiscuit.ui.introduction;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class IntroductionViewModel extends ViewModel {
    private MutableLiveData<String> mText;

    public IntroductionViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("The following is the introduction of the Family Service Robots: ");
    }

    public LiveData<String> getText() {
        return mText;
    }
}
