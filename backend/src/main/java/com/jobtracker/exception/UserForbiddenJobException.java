package com.jobtracker.exception;

public class UserForbiddenJobException extends RuntimeException{
    public UserForbiddenJobException() {
        super("Forbidden to access this job");
    }
}
