package com.awesomeproject2;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject2";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != 1 || requestCode != RESULT_OK) return;

        Uri contactData = data.getData();
        Cursor cursor = getContentResolver().query(
                ContactsContract.Contacts.CONTENT_URI, null, null, null, null);

        cursor.moveToFirst();

        String[] phoneResult = this.getContactPhone(cursor);

        if (phoneResult.length > 0) {
            MainApplication.getMyMainPackage().getMyMainModule().sendMsgToRn(phoneResult[0], phoneResult[1] );
        }
    }

    /**
     * 参数: Cursor cursor; 指定游标
     * 功能:　从指定游标中取出联系人姓名和电话，并且返回
     * 返回值：　String[] 0位置是联系人姓名 1位置是联系人电话
     */
    private String[] getContactPhone(Cursor cursor) {

        int phoneColumn = cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER);
        int phoneNum = cursor.getInt(phoneColumn);
        // 最终要返回的String数组
        String[] phoneResult = new String[2];
        if (phoneNum > 0) {
            // 获得联系人的ID号
            int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
            String contactId = cursor.getString(idColumn);
            // 获得联系人的电话号码的cursor;
            Cursor phones = getContentResolver().query(
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                    null,
                    ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId,
                    null, null);
            if (phones.moveToFirst()) {
                // 遍历所有的电话号码
                for (; !phones.isAfterLast(); phones.moveToNext()) {// 得到选定联系人的号码
                    String phoneNumber = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.TYPE));
                    // 得到选定联系人的名字
                    String phoneName = phones.getString(phones.getColumnIndex(ContactsContract.PhoneLookup.DISPLAY_NAME));
                    phoneResult[1] = phoneNumber;
                    phoneResult[0] = phoneName;
                }
                // 最后 要关闭Cursor
                if (!phones.isClosed()) {
                    phones.close();
                }
            }
        }
        return phoneResult;
    }
}
