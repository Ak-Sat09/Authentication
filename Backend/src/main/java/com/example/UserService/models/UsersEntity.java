package com.example.UserService.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Column(nullable = false)
    private String password; // store hashed password

    @Column(nullable = false)
    private String role;

    @Builder.Default
    private boolean verified = false;

    @Column(unique = true)
    private String verificationToken;

    private LocalDateTime tokenExpiry;

}
