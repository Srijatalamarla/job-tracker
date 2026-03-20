package com.jobtracker.controller;

import com.jobtracker.dto.JobRequestDTO;
import com.jobtracker.dto.JobResponseDTO;
import com.jobtracker.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/jobs")
    public List<JobResponseDTO> getAllJobs() {
        return jobService.getAllJobs();
    }

    @PostMapping("/jobs")
    public ResponseEntity<JobResponseDTO> postJob(@RequestBody @Valid JobRequestDTO jobRequest) {
        JobResponseDTO job = jobService.postJob(jobRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(job);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<JobResponseDTO> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJob(id));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
