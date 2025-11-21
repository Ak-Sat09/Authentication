package com.example.UserService.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private LocalDateTime expiryDate;
}
