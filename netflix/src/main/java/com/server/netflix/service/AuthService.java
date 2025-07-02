package com.server.netflix.service;

import com.server.netflix.dto.AuthResponse;
import com.server.netflix.dto.RegisterRequest;
import com.server.netflix.model.UserModel;
import com.server.netflix.util.CookieUtil;
import com.server.netflix.util.JwtUtil;
import com.server.netflix.util.MailUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final MailUtil mailUtil;
    private final TokenService tokenService;
//    register user
    @Transactional
    public AuthResponse register(RegisterRequest request, HttpServletResponse response){
//        saving base
        UserModel userModel=userService.createUser(request);
//        generate tokens
        String accessToken= jwtUtil.generateAccessToken(userModel);
        String refreshToken= jwtUtil.generateRefreshToken(userModel);
        tokenService.createToken(userModel,refreshToken);
//        add refresh token to cookie
        cookieUtil.addCookie(refreshToken,response);
//        return new user data
        return new AuthResponse(
                userModel.getId(),
                userModel.getUsername(),
                userModel.getEmail(),
                userModel.getRole(),
                accessToken,
                refreshToken
        );
    }
}
