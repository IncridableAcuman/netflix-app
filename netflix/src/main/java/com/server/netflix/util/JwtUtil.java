package com.server.netflix.util;

import com.server.netflix.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
@Slf4j
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.access-time}")
    private long accessTime;
    @Value("${jwt.refresh-time}")
    private long refreshTime;
    private Key signingKey;
//    generate key
    @PostConstruct
    public void init(){
        this.signingKey=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
//    build token
    public String buildToken(UserModel userModel,long validityMillis){
        Date now=new Date();
        Date expiryDate=new Date(now.getTime()+validityMillis);
        return Jwts
                .builder()
                .subject(userModel.getEmail())
                .claims(Map.of(
                        "id",userModel.getId(),
                        "username",userModel.getUsername(),
                        "role",userModel.getRole()
                        )
                )
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(signingKey)
                .compact();
    }
//    generate access token
    public String generateAccessToken(UserModel userModel){
        return buildToken(userModel,accessTime);
    }
//    generate refresh token
    public String generateRefreshToken(UserModel userModel){
        return buildToken(userModel,refreshTime);
    }

//   extract all claims
private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith((SecretKey) signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
}
// extract email from token
    public String extractSubject(String token){
        return extractAllClaims(token).getSubject();
    }
//    extract expiration
    public Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }
//    validate token
   public boolean isTokenValid(String token){
        try {
           extractAllClaims(token);
           return true;
        } catch (RuntimeException e){
            return false;
        }
    }
//    toke is expired
    public boolean isTokenExpired(String token){
        try {
            return extractExpiration(token).before(new Date());
        } catch (RuntimeException e) {
            return false;
        }
    }
}
