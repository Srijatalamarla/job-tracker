package com.jobtracker;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    private JobResponseDTO toJobResponseDTO(Job job) {
        JobResponseDTO dto = new JobResponseDTO();
        dto.setId(job.getId());
        dto.setCompanyName(job.getCompanyName());
        dto.setJobTitle(job.getJobTitle());
        dto.setStatus(job.getStatus());

        return dto;
    }

    private Job toJob (JobRequestDTO jobRequest) {
        Job job = new Job();
        job.setCompanyName(jobRequest.getCompanyName());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setStatus(jobRequest.getStatus());

        return job;
    }

    public List<JobResponseDTO> getAllJobs() {
        List<JobResponseDTO> jobs = new ArrayList<>();
        List<Job> tempJobs = jobRepository.findAll();
        for(Job job : tempJobs) {
            jobs.add(toJobResponseDTO(job));
        }
        return jobs;
    }

    public JobResponseDTO postJob(JobRequestDTO jobRequest) {
        Job job = toJob(jobRequest);
        jobRepository.save(job);
        return toJobResponseDTO(job);
    }

    public JobResponseDTO getJob(Long id) {
        Optional<Job> tempJob = jobRepository.findById(id);

        if (tempJob.isEmpty()) {
            throw new RuntimeException("NOT FOUND");
        }
        return toJobResponseDTO(tempJob.get());
    }

    public void deleteJob(Long id) {
        Optional<Job> tempJob = jobRepository.findById(id);
        if (tempJob.isEmpty()) {
            throw new RuntimeException("NOT FOUND");
        }
        jobRepository.deleteById(id);
    }
}
