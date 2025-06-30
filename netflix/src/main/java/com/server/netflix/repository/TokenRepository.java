package com.server.netflix.repository;

import com.server.netflix.model.TokenModel;
import com.server.netflix.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenModel,Long> {
    Optional<TokenModel> findByRefreshToken(String refreshToken);
    Optional<TokenModel> findByUserModel(UserModel userModel);
}
