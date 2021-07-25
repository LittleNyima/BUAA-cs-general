package com.example.sandwichbiscuit.ui.introduction;

import android.os.Bundle;
import android.service.autofill.TextValueSanitizer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.sandwichbiscuit.R;

public class IntroductionFragment extends Fragment{
    private IntroductionViewModel introductionViewModel;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        introductionViewModel = new ViewModelProvider(this).get(IntroductionViewModel.class);

        View root = inflater.inflate(R.layout.fragment_introduction, container, false);

        final TextView textView = root.findViewById(R.id.text_introduction);

        introductionViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String s) {
                textView.setText(s);
            }
        });
        return root;
    }
}
