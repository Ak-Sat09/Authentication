package com.example.UserService.services.impl;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.UserService.dtos.ApiResponseDTO;
import com.example.UserService.dtos.UserRequestDto;
import com.example.UserService.mapper.UserMapper;
import com.example.UserService.models.RefreshTokenEntity;
import com.example.UserService.models.UsersEntity;
import com.example.UserService.repositories.UserRepo;
import com.example.UserService.services.TokenService;
import com.example.UserService.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

        private final UserRepo userRepo;
        private final TokenService tokenService;
        private final EmailQueueService emailQueueService;
        private final BCryptPasswordEncoder passwordEncoder;

        private final RefreshTokenService refreshTokenService;

        @Override
        public ApiResponseDTO<?> register(UserRequestDto request) {
                if (userRepo.findByEmail(request.getEmail()) != null) {
                        return ApiResponseDTO.builder().success(false).message("Email already exists").build();
                }

                String token = tokenService.generateVerificationToken();

                UsersEntity user = UserMapper.toEntity(request)
                                .toBuilder()
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role("USER")
                                .verified(false)
                                .verificationToken(token)
                                .tokenExpiry(LocalDateTime.now().plusMinutes(15))
                                .build();

                userRepo.save(user);

                // ✅ Correct verification link
                String link = "http://localhost:8080/api/users/verify?token=" + token;
                emailQueueService.addEmailTask(
                                user.getEmail(),
                                "Verify your email",
                                "Click the link to verify your account: " + link);

                return ApiResponseDTO.builder()
                                .success(true)
                                .message("User registered successfully. Please check your email to verify your account.")
                                .data(null)
                                .build();
        }

        @Override
        public ApiResponseDTO<?> login(UserRequestDto request) {
                UsersEntity user = userRepo.findByEmail(request.getEmail());

                if (user == null)
                        return ApiResponseDTO.builder().success(false).message("Invalid email").build();

                if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
                        return ApiResponseDTO.builder().success(false).message("Invalid password").build();

                if (!user.isVerified())
                        return ApiResponseDTO.builder().success(false)
                                        .message("Please verify your email before logging in.").build();

                String accessToken = tokenService.generateJwtToken(user.getEmail(), user.getId(), user.getRole());
                RefreshTokenEntity refreshToken = refreshTokenService.createRefreshToken(user.getId());

                return ApiResponseDTO.builder()
                                .success(true)
                                .message("Login successful")
                                .data(Map.of(
                                                "accessToken", accessToken,
                                                "refreshToken", refreshToken.getToken()))
                                .build();
        }

        @Override
        public ApiResponseDTO<?> verifyAccount(String token) {
                UsersEntity user = userRepo.findByVerificationToken(token);

                if (user == null || !tokenService.isVerificationTokenValid(token, user.getTokenExpiry()))
                        return ApiResponseDTO.builder().success(false).message("Invalid or expired verification link")
                                        .build();

                user.setVerified(true);
                user.setVerificationToken(null);
                user.setTokenExpiry(null);
                userRepo.save(user);

                return ApiResponseDTO.builder()
                                .success(true)
                                .message("Email verified successfully! You can now login.")
                                .build();
        }

        @Override
        public ApiResponseDTO<?> forgetPassword(String email) {
                UsersEntity user = userRepo.findByEmail(email);
                if (user == null)
                        return ApiResponseDTO.builder().success(false).message("Email not found").build();

                String token = tokenService.generateVerificationToken();
                user.setVerificationToken(token);
                user.setTokenExpiry(LocalDateTime.now().plusMinutes(15));
                userRepo.save(user);

                String link = "http://localhost:8080/reset-password?token=" + token;
                emailQueueService.addEmailTask(user.getEmail(), "Reset Password", "Click to reset: " + link);

                return ApiResponseDTO.builder().success(true).message("Reset link sent to email").build();
        }

        // ✅ Reset Password (via token)
        @Override
        public ApiResponseDTO<?> resetPassword(String token, String newPassword) {
                UsersEntity user = userRepo.findByVerificationToken(token);
                if (user == null || !tokenService.isVerificationTokenValid(token, user.getTokenExpiry())) {
                        return ApiResponseDTO.builder().success(false).message("Invalid or expired token").build();
                }

                user.setPassword(passwordEncoder.encode(newPassword));
                user.setVerificationToken(null);
                user.setTokenExpiry(null);
                userRepo.save(user);

                return ApiResponseDTO.builder().success(true).message("Password reset successfully").build();
        }

        // ✅ Change Password (logged-in user)
        @Override
        public ApiResponseDTO<?> changePassword(String email, String oldPassword, String newPassword) {
                UsersEntity user = userRepo.findByEmail(email);
                if (user == null)
                        return ApiResponseDTO.builder().success(false).message("User not found").build();

                if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                        return ApiResponseDTO.builder().success(false).message("Old password incorrect").build();
                }

                user.setPassword(passwordEncoder.encode(newPassword));
                userRepo.save(user);

                return ApiResponseDTO.builder().success(true).message("Password changed successfully").build();
        }

        @Override
        public UserRequestDto updateUserRole(String email, String newRole) {

                throw new UnsupportedOperationException("Unimplemented method 'updateUserRole'");
        }

}
