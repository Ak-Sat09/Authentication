package com.example.UserService.services;

import java.time.LocalDateTime;

public interface TokenService {
    String generateVerificationToken();

    boolean isVerificationTokenValid(String token, LocalDateTime expiry);

    String generateJwtToken(String email, Long userId, String role);
}
