package com.jobtracker.service;

import com.jobtracker.entity.User;
import com.jobtracker.exception.JobNotFoundException;
import com.jobtracker.exception.UserForbiddenJobException;
import com.jobtracker.repository.JobRepository;
import com.jobtracker.dto.JobRequestDTO;
import com.jobtracker.dto.JobResponseDTO;
import com.jobtracker.entity.Job;
import com.jobtracker.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
        dto.setUserId(job.getUser().getId());
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
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jobRepository.findByUser(user)
                            .stream()
                            .map(this::toJobResponseDTO)
                            .toList();
    }

    public JobResponseDTO postJob(JobRequestDTO jobRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Job job = toJob(jobRequest);
        job.setUser(user);
        Job savedJob = jobRepository.save(job);
        return toJobResponseDTO(jobRepository.findById(savedJob.getId()).orElseThrow());
    }

    public JobResponseDTO getJob(Long id) {
        Optional<Job> tempJob = jobRepository.findById(id);

        if (tempJob.isEmpty()) {
            throw new JobNotFoundException(id);
        }

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!tempJob.get().getUser().getId().equals(currentUser.getId())) {
            throw new UserForbiddenJobException();
        }

        return toJobResponseDTO(tempJob.get());
    }

    public JobResponseDTO updateJob(Long id, JobRequestDTO jobRequest) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException(id));

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!job.getUser().getId().equals(currentUser.getId())) {
            throw new UserForbiddenJobException();
        }

        job.setCompanyName(jobRequest.getCompanyName());
        job.setJobTitle(jobRequest.getJobTitle());
        job.setStatus(jobRequest.getStatus());

        jobRepository.save(job);

        return toJobResponseDTO(job);
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!job.getUser().getId().equals(currentUser.getId())) {
            throw new UserForbiddenJobException();
        }

        jobRepository.delete(job);
    }
}
