package com.jobtracker.entity;

import jakarta.persistence.*;

@Entity
public class Job {
    @Id
    @GeneratedValue
    private Long id;
    private String companyName;
    private String jobTitle;
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    public Job() {}

    public Job(String companyName, String jobTitle, String status, User user) {
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.status = status;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public String getStatus() {
        return status;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
