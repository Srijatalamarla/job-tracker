package com.jobtracker.exception;

public class RefreshTokenExpiredException extends RuntimeException{
    public RefreshTokenExpiredException() {
        super("Refresh token expired, please login again");
    }
}
