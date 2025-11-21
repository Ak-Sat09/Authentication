package com.example.UserService.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtUtils {

    public static final String SECRET = "SuperLongHardcodedSecretKeySuperLongHardcodedSecretKeySuperLongHardcodedSecretKey1234567890";
    public static final long EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

    private final Key key;

    public JwtUtils() {
        this.key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    // ✅ Generate token with email + userId + role
    public String generateToken(String email, String userId, String role) {
        return Jwts.builder()
                .setSubject(email) // email in subject
                .addClaims(Map.of(
                        "userId", userId,
                        "role", role // 👈 add role in claim
                ))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ Extract userId
    public String getUserIdFromToken(String token) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("userId");
    }

    // ✅ Extract role
    public String getRoleFromToken(String token) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role");
    }
}
