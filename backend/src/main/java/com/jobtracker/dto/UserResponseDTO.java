package com.jobtracker.dto;

import java.util.List;

public class UserResponseDTO {

    private Long id;
    private String name;
    private String email;
    private List<JobResponseDTO> jobs;

    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String name, String email, List<JobResponseDTO> jobs) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.jobs = jobs;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public List<JobResponseDTO> getJobs() {
        return jobs;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setJobs(List<JobResponseDTO> jobs) {
        this.jobs = jobs;
    }
}
