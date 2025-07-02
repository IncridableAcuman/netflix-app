package com.server.netflix.util;

import com.server.netflix.model.UserModel;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access-time}")
    private long accessTime;
    @Value("${jwt.refresh-time}")
    private long refreshTime;
//    generate key
    public Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
//    generate access token
    public String generateAccessToken(UserModel userModel){
        return Jwts
                .builder()
                .subject(userModel.getEmail())
                .claim("id",userModel.getId())
                .claim("username",userModel.getUsername())
                .claim("role",userModel.getRole())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+accessTime))
                .signWith(getSigningKey())
                .compact();
    }
//    generate refresh token
public String generateRefreshToken(UserModel userModel){
    return Jwts
            .builder()
            .subject(userModel.getEmail())
            .claim("id",userModel.getId())
            .claim("username",userModel.getUsername())
            .claim("role",userModel.getRole())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis()+refreshTime))
            .signWith(getSigningKey())
            .compact();
}
// validate token
    @Deprecated
    public boolean validateToken(String refreshToken){
        try {
            Jwts
                    .parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseSignedClaims(refreshToken)
                    .getPayload();
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }
//    is token expired
    @Deprecated
    public boolean isTokenExpired(String refreshToken){
        try {
            Jwts
                    .parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseSignedClaims(refreshToken)
                    .getPayload()
                    .getExpiration()
                    .after(new Date());
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }
//    extract payload
    @Deprecated
    public String extractEmail(String refreshToken){
        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseSignedClaims(refreshToken)
                .getPayload()
                .getSubject();
    }
}
