package com.jobtracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JobRequestDTO {

    @NotBlank
    private String companyName;
    @NotBlank
    private String jobTitle;
    @NotBlank
    private String status;

    public JobRequestDTO() {}

    public JobRequestDTO(String companyName, String jobTitle, String status) {
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.status = status;
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
