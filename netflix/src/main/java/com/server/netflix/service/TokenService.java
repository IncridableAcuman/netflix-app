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

    public TokenModel createToken(UserModel userModel, String refreshToken) {
        TokenModel tokenModel = new TokenModel();
        tokenModel.setRefreshToken(refreshToken);
        tokenModel.setExpiryDate(LocalDateTime.now().plusDays(7));
        tokenModel.setUserModel(userModel);
        return tokenRepository.save(tokenModel);
    }

    public void removeToken(TokenModel tokenModel) {
        tokenRepository.delete(tokenModel);
    }

    public TokenModel findByUserModel(UserModel userModel) {
        return tokenRepository.findByUserModel(userModel)
                .orElseThrow(() -> new RuntimeException("Token not found by user"));
    }

    public void deleteToken(UserModel userModel) {
        TokenModel tokenModel = findByUserModel(userModel);
        removeToken(tokenModel);
    }

    public void validateRefreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new RuntimeException("Refresh token is missing");
        }
    }
    public TokenModel getUser(UserModel userModel,String refreshToken){
        return tokenRepository.findByUserModel(userModel)
                .orElseGet(()->createToken(userModel,refreshToken));
    }
}