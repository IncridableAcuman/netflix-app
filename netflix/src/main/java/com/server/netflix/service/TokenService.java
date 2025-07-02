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
    public TokenModel createToken(UserModel userModel,String refreshToken){
        TokenModel tokenModel=new TokenModel();
        tokenModel.setRefreshToken(refreshToken);
        tokenModel.setExpiryDate(LocalDateTime.now());
        tokenModel.setUserModel(userModel);
        return tokenRepository.save(tokenModel);
    }
}
