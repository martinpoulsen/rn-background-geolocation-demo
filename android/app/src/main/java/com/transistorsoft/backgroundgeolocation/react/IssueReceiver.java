package com.transistorsoft.backgroundgeolocation.react;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.util.Pair;

import java.util.ArrayList;
import java.util.List;

public class IssueReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(IssueReceiver.class.getSimpleName(), "IssueReceiver#onReceive()");
        Bundle bundle = new Bundle();
        bundle.putString("foo", "bar");
        Intent serviceIntent = new Intent(context, HeadlessTask.class);
        serviceIntent.putExtras(bundle);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent);
        } else {
            context.startService(serviceIntent);
        }
    }
}
