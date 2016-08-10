package com.my_best_bank.model;

@SuppressWarnings("unused")
public class LoginResponse {

    public String token;

    public LoginResponse(final String token) {
        this.token = token;
    }
}
