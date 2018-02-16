package com.example.fredi.bequality;

import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ProgressBar;
import android.widget.RatingBar;
import android.widget.SeekBar;
import android.widget.TextView;


public class MainActivity extends AppCompatActivity {
    private TextView textview;
    private ProgressBar progressbar;
    private SeekBar seekBar;
    private TextView textvview;
    private RatingBar ratingBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textview=(TextView) findViewById(R.id.textView7);
      //  textvview=(TextView)findViewById(R.id.textView8);
        progressbar=(ProgressBar) findViewById(R.id.progressBar);
        seekBar=(SeekBar) findViewById(R.id.seekBar);
       ratingBar=(RatingBar) findViewById(R.id.rating_rating_Bar);
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener(){
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                progressbar.setProgress(i);
                textview.setText(""+i+"%");
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });
   /*     ratingBar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float v, boolean b) {
                if((v+1)<=1)
                textvview.setText("Your rating is: "+(v+1));
            }
        }); */




    }




}
