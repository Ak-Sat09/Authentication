package com.example.UserService.services.impl;

import com.example.UserService.models.RefreshTokenEntity;
import com.example.UserService.repositories.RefreshTokenRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepo refreshTokenRepo;
    private final long refreshTokenDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days

    public RefreshTokenEntity createRefreshToken(Long userId) {
        RefreshTokenEntity token = RefreshTokenEntity.builder()
                .userId(userId)
                .token(UUID.randomUUID().toString())
                .expiryDate(LocalDateTime.now().plusSeconds(refreshTokenDurationMs / 1000))
                .build();
        return refreshTokenRepo.save(token);
    }

    public boolean isValid(RefreshTokenEntity token) {
        return token.getExpiryDate().isAfter(LocalDateTime.now());
    }

    public void deleteByUserId(Long userId) {
        refreshTokenRepo.deleteByUserId(userId);
    }

    public RefreshTokenEntity getByToken(String tokenStr) {
        return refreshTokenRepo.findByToken(tokenStr)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }
}
