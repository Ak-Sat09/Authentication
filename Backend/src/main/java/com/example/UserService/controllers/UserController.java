package com.example.UserService.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.UserService.dtos.ApiResponseDTO;
import com.example.UserService.dtos.UserRequestDto;
import com.example.UserService.models.RefreshTokenEntity;
import com.example.UserService.models.UsersEntity;
import com.example.UserService.repositories.UserRepo;
import com.example.UserService.services.TokenService;
import com.example.UserService.services.UserService;
import com.example.UserService.services.impl.RefreshTokenService;
import com.example.UserService.utils.JwtUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;
    private final UserRepo userRepo; // currently missing
    private final TokenService tokenService; // currently missing

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO<?>> register(@Valid @RequestBody UserRequestDto request) {
        ApiResponseDTO<?> response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<?>> login(@Valid @RequestBody UserRequestDto request) {
        ApiResponseDTO<?> response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/email")
    public ResponseEntity<ApiResponseDTO<String>> getEmail(
            @RequestHeader("Authorization") String tokenHeader) {

        if (tokenHeader == null || tokenHeader.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }

        // Remove 'Bearer ' prefix
        String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7).trim() : tokenHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);

        ApiResponseDTO<String> response = ApiResponseDTO.<String>builder()
                .success(true)
                .message("Email extracted successfully")
                .data(email)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/userid")
    public ResponseEntity<ApiResponseDTO<String>> getUserId(
            @RequestHeader("Authorization") String tokenHeader) {

        if (tokenHeader == null || tokenHeader.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }

        // Remove 'Bearer ' prefix
        String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7).trim() : tokenHeader.trim();

        String userId = jwtUtils.getUserIdFromToken(token);

        ApiResponseDTO<String> response = ApiResponseDTO.<String>builder()
                .success(true)
                .message("UserId extracted successfully")
                .data(userId)
                .build();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-role")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponseDTO<UserRequestDto>> updateUserRole(
            @Valid @RequestBody UserRequestDto request) {

        UserRequestDto updatedUser = userService.updateUserRole(request.getEmail(), request.getRole());

        return ResponseEntity.ok(
                ApiResponseDTO.<UserRequestDto>builder()
                        .success(true)
                        .message("Role updated successfully")
                        .data(updatedUser)
                        .build());
    }

    @GetMapping("/verify")
    public ResponseEntity<ApiResponseDTO<?>> verifyEmail(@RequestParam String token) throws Exception {
        ApiResponseDTO<?> response = userService.verifyAccount(token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forget-password")
    public ResponseEntity<ApiResponseDTO<?>> forgetPassword(@RequestParam String email) {
        return ResponseEntity.ok(userService.forgetPassword(email));
    }

    // ------------------- RESET PASSWORD -------------------
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponseDTO<?>> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {
        return ResponseEntity.ok(userService.resetPassword(token, newPassword));
    }

    // ------------------- CHANGE PASSWORD -------------------
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponseDTO<?>> changePassword(
            @RequestHeader("Authorization") String tokenHeader,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {

        String token = extractToken(tokenHeader);
        String email = jwtUtils.getEmailFromToken(token);
        return ResponseEntity.ok(userService.changePassword(email, oldPassword, newPassword));
    }

    private String extractToken(String tokenHeader) {
        if (tokenHeader == null || tokenHeader.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }
        return tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7).trim() : tokenHeader.trim();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponseDTO<?>> refreshToken(@RequestParam String refreshToken) {
        RefreshTokenEntity tokenEntity = refreshTokenService.getByToken(refreshToken);

        if (!refreshTokenService.isValid(tokenEntity)) {
            return ResponseEntity.badRequest()
                    .body(ApiResponseDTO.builder().success(false).message("Refresh token expired").build());
        }

        UsersEntity user = userRepo.findById(tokenEntity.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = tokenService.generateJwtToken(user.getEmail(), user.getId(), user.getRole());

        return ResponseEntity.ok(
                ApiResponseDTO.builder()
                        .success(true)
                        .message("Token refreshed successfully")
                        .data(Map.of("accessToken", newAccessToken))
                        .build());
    }

}
