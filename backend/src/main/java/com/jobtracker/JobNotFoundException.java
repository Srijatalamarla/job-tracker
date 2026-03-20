package com.jobtracker;

public class JobNotFoundException extends RuntimeException{
    public JobNotFoundException(Long id) {
        super("Job not found with id: " + id);
    }
}
