package com.awesomeproject2;

public class ContactDto {
    String phoneNum;
    String phoneName;

    public ContactDto(String phoneNum, String phoneName) {
        this.phoneNum = phoneNum;
        this.phoneName = phoneName;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getPhoneName() {
        return phoneName;
    }

    public void setPhoneName(String phoneName) {
        this.phoneName = phoneName;
    }
}
