package com.transistorsoft.backgroundgeolocation.react;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.graphics.Color;

import static android.content.Context.NOTIFICATION_SERVICE;
import static android.content.Intent.FLAG_ACTIVITY_SINGLE_TOP;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class HeadlessTask extends HeadlessJsTaskService {
    private static final String TAG = "HeadlessTask";

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        Log.d(TAG, "Service (HeadlessTask) Lifecycle | getTaskConfig()");
        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "IssueHeadlessTask",
                    Arguments.fromBundle(extras),
                    0,
                    true
            );
        }
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "Service (HeadlessTask) Lifecycle | onStartCommand()");
        startForeground(123456, buildNotification(MainApplication.getAppContext(), "channel_id", "channel_name", "Issue Notification Title"));
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "Service (HeadlessTask) Lifecycle | onDestroy()");
        stopForeground(true);
    }

    private Notification buildNotification(Context context, String channelId, String channelName, String title) {
        Intent notificationIntent = new Intent(context, MainActivity.class);
        notificationIntent.setFlags(FLAG_ACTIVITY_SINGLE_TOP);

        Notification notification;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationChannel notificationChannel = new NotificationChannel(channelId,
                    channelName, NotificationManager.IMPORTANCE_LOW);
            notificationChannel.setLightColor(Color.WHITE);
            notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
            NotificationManager manager = (NotificationManager) context.getSystemService(NOTIFICATION_SERVICE);
            manager.createNotificationChannel(notificationChannel);

            Notification.Builder builder = new Notification.Builder(context, channelId)
                    .setOngoing(true)
                    .setAutoCancel(false)
                    .setContentTitle(title)
                    .setSmallIcon(R.mipmap.ic_launcher);

            notification = builder.build();
        } else {
            notification = new Notification.Builder(context)
                    .setOngoing(true)
                    .setAutoCancel(false)
                    .setContentIntent(PendingIntent.getActivity(context, 0, notificationIntent, 0))
                    .setContentTitle(title)
                    .setPriority(Notification.PRIORITY_MIN)
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .build();
        }
        return notification;
    }

}
