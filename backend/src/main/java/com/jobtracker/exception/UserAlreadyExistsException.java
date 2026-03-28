package com.jobtracker.exception;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String e) {
        super(e);
    }
}
