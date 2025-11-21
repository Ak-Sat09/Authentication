package com.example.UserService.services.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.UserService.services.TokenService;
import com.example.UserService.utils.JwtUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final JwtUtils jwtUtils;

    @Override
    public String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }

    @Override
    public boolean isVerificationTokenValid(String token, LocalDateTime expiry) {
        return token != null && expiry != null && expiry.isAfter(LocalDateTime.now());
    }

    @Override
    public String generateJwtToken(String email, Long userId, String role) {
        return jwtUtils.generateToken(email, String.valueOf(userId), role);
    }
}
