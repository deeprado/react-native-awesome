package com.awesomeproject2;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.PixelUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * 原生模块，以供RN调用
 */
public class MyMainModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public MyMainModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @Override
    public String getName() {
        // 必须有，RN里面需要通过名字进行调用
        return "MyMainModule";
    }

    /**
     * 自定义方法，不能有返回值，异步调用
     *
     * @param msg
     */
    @ReactMethod
    public void rnCallNative(String msg) {
        Toast.makeText(getReactApplicationContext(), msg, Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void openActivity() {
        Intent intent =  new Intent(mContext, MyActivity.class);
        // 必须加，否则报错
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);
    }

    @ReactMethod
    public void getContacts() {
        Intent intent =  new Intent(Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI);
        Bundle bundle = new Bundle();

        if (intent.resolveActivity(mContext.getPackageManager()) != null) {
            mContext.startActivityForResult(intent, 1, bundle);
        } else {
            // 要调起的应用不存在时的处理
        }

    }

    /**
     * Java to RN
     * @param phoneNum
     * @param phoneName
     */
    public void sendMsgToRn(String phoneNum, String phoneName) {
        //
        ContactDto contact = new ContactDto(phoneNum, phoneName);
//        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", contact);
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", phoneNum);
    }

}
