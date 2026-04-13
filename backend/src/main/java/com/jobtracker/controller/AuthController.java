package com.jobtracker.controller;

import com.jobtracker.dto.AuthResponseDTO;
import com.jobtracker.dto.LoginRequestDTO;
import com.jobtracker.dto.RefreshTokenRequestDTO;
import com.jobtracker.dto.UserRequestDTO;
import com.jobtracker.entity.RefreshToken;
import com.jobtracker.entity.User;
import com.jobtracker.exception.InvalidCredentialsException;
import com.jobtracker.exception.UserAlreadyExistsException;
import com.jobtracker.repository.UserRepository;
import com.jobtracker.service.JwtService;
import com.jobtracker.service.RefreshTokenService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;

    public AuthController(UserRepository userRepository, JwtService jwtService, BCryptPasswordEncoder passwordEncoder, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@Valid @RequestBody UserRequestDTO userRequest) {
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        String passwordHash = passwordEncoder.encode(userRequest.getPassword());

        User newUser = new User();
        newUser.setName(userRequest.getName());
        newUser.setEmail(userRequest.getEmail());
        newUser.setPassword(passwordHash);

        User newSavedUser = userRepository.save(newUser);
        refreshTokenService.deleteByUser(newSavedUser);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(newSavedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponseDTO(jwtService.generateToken(newSavedUser.getEmail()), refreshToken.getToken()));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException());
        boolean isCorrectPassword = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
        if (!isCorrectPassword) {
            throw new InvalidCredentialsException();
        }
        refreshTokenService.deleteByUser(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        return ResponseEntity.ok(new AuthResponseDTO(jwtService.generateToken(loginRequest.getEmail()), refreshToken.getToken()));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        RefreshToken refreshToken = refreshTokenService.validateRefreshToken(refreshTokenRequestDTO.getRefreshToken());
        String newToken = jwtService.generateToken(refreshToken.getUser().getEmail());
        return ResponseEntity.ok(new AuthResponseDTO(newToken, refreshToken.getToken()));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<String> logout(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        refreshTokenService.deleteByToken(refreshTokenRequestDTO.getRefreshToken());
        return ResponseEntity.ok("Logged out successfully");
    }
}
