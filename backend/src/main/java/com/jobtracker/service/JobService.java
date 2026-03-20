package com.jobtracker.service;

import com.jobtracker.entity.User;
import com.jobtracker.exception.JobNotFoundException;
import com.jobtracker.repository.JobRepository;
import com.jobtracker.dto.JobRequestDTO;
import com.jobtracker.dto.JobResponseDTO;
import com.jobtracker.entity.Job;
import com.jobtracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    private JobResponseDTO toJobResponseDTO(Job job) {
        JobResponseDTO dto = new JobResponseDTO();
        dto.setId(job.getId());
        dto.setUserId(job.getUser().getId());
        dto.setCompanyName(job.getCompanyName());
        dto.setJobTitle(job.getJobTitle());
        dto.setStatus(job.getStatus());

        return dto;
    }

    private Job toJob (JobRequestDTO jobRequest) {
        Job job = new Job();
        User user = userRepository.findById(jobRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + jobRequest.getUserId()));
        job.setUser(user);
        job.setCompanyName(jobRequest.getCompanyName());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setStatus(jobRequest.getStatus());

        return job;
    }

    public List<JobResponseDTO> getAllJobs() {
        return jobRepository.findAll()
                            .stream()
                            .map(this::toJobResponseDTO)
                            .toList();
    }

    public JobResponseDTO postJob(JobRequestDTO jobRequest) {
        Job job = toJob(jobRequest);
        Job savedJob = jobRepository.save(job);
        return toJobResponseDTO(jobRepository.findById(savedJob.getId()).orElseThrow());
    }

    public JobResponseDTO getJob(Long id) {
        Optional<Job> tempJob = jobRepository.findById(id);

        if (tempJob.isEmpty()) {
            throw new JobNotFoundException(id);
        }
        return toJobResponseDTO(tempJob.get());
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));
        jobRepository.delete(job);
    }
}
