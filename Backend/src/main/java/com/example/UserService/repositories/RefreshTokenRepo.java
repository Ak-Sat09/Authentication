package com.example.UserService.repositories;

import com.example.UserService.models.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findByToken(String token);

    void deleteByUserId(Long userId);
}
