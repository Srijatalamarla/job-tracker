package com.jobtracker;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class JobController {
    private Long idCounter = 1L;
    private List<Job> jobs = new ArrayList<>();

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return jobs;
    }

    @PostMapping("/jobs")
    public ResponseEntity<Job> postJob(@RequestBody Job job) {
        job.setId(idCounter++);
        jobs.add(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(job);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        Job tempJob = null;
        for (Job job : jobs) {
            if (job.getId().equals(id)) {
                tempJob = job;
            }
        }
        if (tempJob == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(tempJob);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable Long id) {
        Job tempJob = null;
        for (Job job : jobs) {
            if (job.getId().equals(id)) {
                tempJob = job;
            }
        }
        if (tempJob == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        jobs.remove(tempJob);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
