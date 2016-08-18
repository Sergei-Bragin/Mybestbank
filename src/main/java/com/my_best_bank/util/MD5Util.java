package com.my_best_bank.util;

import org.apache.commons.codec.digest.DigestUtils;

public class MD5Util {

    public String passwordHash(String password) {
        return DigestUtils.md5Hex(password);
    }
}
