package com.server.netflix.service;

import com.server.netflix.model.TokenModel;
import com.server.netflix.model.UserModel;
import com.server.netflix.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

//    create token and saving
    public void createToken(UserModel userModel, String refreshToken){
        TokenModel tokenModel=new TokenModel();
        tokenModel.setRefreshToken(refreshToken);
        tokenModel.setExpiryDate(LocalDateTime.now());
        tokenModel.setUserModel(userModel);
        tokenRepository.save(tokenModel);
    }
//    delete token
    public void deleteToken(UserModel userModel){
        TokenModel tokenModel=tokenRepository.findByUserModel(userModel).orElseThrow(()->new RuntimeException("Token not found by user"));
        tokenRepository.delete(tokenModel);
    }
//    validate refresh token
    public void validateRefreshToken(String refreshToken){
        if(refreshToken==null || !refreshToken.startsWith("Bearer ")){
            throw new RuntimeException("Token is empty");
        }
    }
    public void findToken(String refreshToken){
        tokenRepository.findByRefreshToken(refreshToken).orElseThrow(()->new RuntimeException("Token not found"));
    }
}
