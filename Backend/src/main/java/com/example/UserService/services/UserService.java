package com.example.UserService.services;

import com.example.UserService.dtos.ApiResponseDTO;
import com.example.UserService.dtos.UserRequestDto;

public interface UserService {
    ApiResponseDTO<?> register(UserRequestDto request);

    ApiResponseDTO<?> login(UserRequestDto request);

    UserRequestDto updateUserRole(String email, String newRole);

    ApiResponseDTO<?> verifyAccount(String token);

    ApiResponseDTO<?> forgetPassword(String email);

    ApiResponseDTO<?> resetPassword(String token, String newPassword);

    ApiResponseDTO<?> changePassword(String email, String oldPassword, String newPassword);
}
