package com.jobtracker.service;

import com.jobtracker.dto.JobResponseDTO;
import com.jobtracker.dto.UserRequestDTO;
import com.jobtracker.dto.UserResponseDTO;
import com.jobtracker.entity.User;
import com.jobtracker.exception.UserNotFoundException;
import com.jobtracker.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserResponseDTO toUserResponseDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setJobs(user.getJobs()
                .stream().map(job -> {
                    JobResponseDTO jobResponseDTO = new JobResponseDTO();
                    jobResponseDTO.setId(job.getId());
                    jobResponseDTO.setUserId(job.getUser().getId());
                    jobResponseDTO.setCompanyName(job.getCompanyName());
                    jobResponseDTO.setJobTitle(job.getJobTitle());
                    jobResponseDTO.setStatus(job.getStatus());
                    return jobResponseDTO;
                }).toList());
        return dto;
    }

    private User toUser(UserRequestDTO userRequest) {
        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        return user;
    }

    @Transactional
    public UserResponseDTO getUser(Long id) {
        return userRepository.findById(id)
                .map(this::toUserResponseDTO).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Transactional
    public UserResponseDTO postUser(UserRequestDTO userRequest) {
        User newUser = toUser(userRequest);
        User savedUser = userRepository.save(newUser);
        return toUserResponseDTO(userRepository.findById(savedUser.getId()).orElseThrow());
    }
}
