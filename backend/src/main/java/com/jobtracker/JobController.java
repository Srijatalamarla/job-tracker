package com.jobtracker;

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
    public ResponseEntity<JobResponseDTO> postJob(@RequestBody JobRequestDTO jobRequest) {
        JobResponseDTO job = jobService.postJob(jobRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(job);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<JobResponseDTO> getJob(@PathVariable Long id) {
        JobResponseDTO tempJob;
        try {
            tempJob = jobService.getJob(id);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(tempJob);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        try {
            jobService.deleteJob(id);
        }catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
