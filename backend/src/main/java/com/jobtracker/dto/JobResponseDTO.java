package com.jobtracker.dto;

public class JobResponseDTO {
    private Long id;
    private Long userId;
    private String companyName;
    private String jobTitle;
    private String status;

    public JobResponseDTO() {}

    public JobResponseDTO(Long id, Long userId, String companyName, String jobTitle, String status) {
        this.id = id;
        this.userId = userId;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
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

    public void setUserId(Long userId) {
        this.userId = userId;
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
