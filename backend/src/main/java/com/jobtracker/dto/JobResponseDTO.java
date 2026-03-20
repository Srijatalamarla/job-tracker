package com.jobtracker.dto;

public class JobResponseDTO {
    private Long id;
    private String companyName;
    private String jobTitle;
    private String status;

    public JobResponseDTO() {}

    public JobResponseDTO(Long id, String companyName, String jobTitle, String status) {
        this.id = id;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.status = status;
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
}
