package com.example.UserService.mapper;

import com.example.UserService.dtos.UserRequestDto;
import com.example.UserService.models.UsersEntity;

public class UserMapper {

    // Convert DTO -> Entity
    public static UsersEntity toEntity(UserRequestDto dto) {
        if (dto == null)
            return null;

        return UsersEntity.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword()) // hashed later in service
                .role(dto.getRole())
                .build();
    }

    // Convert Entity -> DTO
    public static UserRequestDto toDto(UsersEntity entity) {
        if (entity == null)
            return null;

        return UserRequestDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .role(entity.getRole())
                .password(null) // never expose password
                .build();
    }
}
