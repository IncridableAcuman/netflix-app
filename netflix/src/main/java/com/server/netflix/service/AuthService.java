package com.server.netflix.service;

import com.server.netflix.dto.*;
import com.server.netflix.model.UserModel;
import com.server.netflix.util.CookieUtil;
import com.server.netflix.util.JwtUtil;
import com.server.netflix.util.MailUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final MailUtil mailUtil;
    private final TokenService tokenService;
    @Value("${client.url}")
    private String clientUrl;
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
//    login
    public AuthResponse login(AuthRequest request,HttpServletResponse response){
        UserModel userModel=userService.findUser(request.getEmail());
//       equals password
        userService.isMatchPassword(userModel.getPassword(), request.getPassword());
//        remove token
        tokenService.deleteToken(userModel);
//        generate tokens
        String accessToken= jwtUtil.generateAccessToken(userModel);
        String refreshToken= jwtUtil.generateRefreshToken(userModel);
//        saving token
        tokenService.createToken(userModel,refreshToken);
//        add token to cookie
        cookieUtil.addCookie(refreshToken,response);
        return new AuthResponse(
                userModel.getId(),
                userModel.getUsername(),
                userModel.getEmail(),
                userModel.getRole(),
                accessToken,
                refreshToken
        );
    }
//    refresh
    public AuthResponse refresh(String refreshToken,HttpServletResponse response){
        tokenService.validateRefreshToken(refreshToken);
//        is token
        if(!jwtUtil.isTokenValid(refreshToken)){
            throw new RuntimeException("Token is invalid");
        }
//        is token expired
        if(!jwtUtil.isTokenExpired(refreshToken)){
            throw new RuntimeException("Token is expired");
        }
        tokenService.findToken(refreshToken);
        String email=jwtUtil.extractSubject(refreshToken);
        UserModel userModel=userService.findUser(email);
//        remove token
        tokenService.deleteToken(userModel);
//        generate tokens
        String accessToken= jwtUtil.generateAccessToken(userModel);
        String newRefreshToken= jwtUtil.generateRefreshToken(userModel);
//        saving token
        tokenService.createToken(userModel,newRefreshToken);
//        add token to cookie
        cookieUtil.addCookie(newRefreshToken,response);
        return new AuthResponse(
                userModel.getId(),
                userModel.getUsername(),
                userModel.getEmail(),
                userModel.getRole(),
                accessToken,
                newRefreshToken
        );
    }
//    logout
    public void  logout(String refreshToken){
        tokenService.validateRefreshToken(refreshToken);
//        is token
        if(!jwtUtil.isTokenValid(refreshToken)){
            throw new RuntimeException("Token is invalid");
        }
//        is token expired
        if(!jwtUtil.isTokenExpired(refreshToken)){
            throw new RuntimeException("Token is expired");
        }
        String email=jwtUtil.extractSubject(refreshToken);
        UserModel userModel=userService.findUser(email);
//        remove token
        tokenService.deleteToken(userModel);
    }
//    forgot password
    public String forgotPassword(ForgotPasswordRequest request){
        UserModel userModel=userService.findUser(request.getEmail());
        String token= jwtUtil.generateAccessToken(userModel);
        mailUtil.sendMail(userModel.getEmail(),"Reset Password!",clientUrl+"/reset-password?token="+token);
        return "Reset password link sent to your email";
    }
//    reset password
    public String resetPassword(ResetPasswordRequest request){
        tokenService.validateRefreshToken(request.getToken());
//        is token
        if(!jwtUtil.isTokenValid(request.getToken())){
            throw new RuntimeException("Token is invalid");
        }
//        is token expired
        if(!jwtUtil.isTokenExpired(request.getToken())){
            throw new RuntimeException("Token is expired");
        }
        String email= jwtUtil.extractSubject(request.getToken());
        UserModel userModel=userService.findUser(email);
        userService.updatePassword(request.getPassword(),userModel);
        return "Password updated successfully.";
    }
//    get user data
    public UserData getUserData(){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        UserModel userModel=(UserModel) authentication.getPrincipal();
        return new UserData(userModel.getId(),userModel.getUsername(),userModel.getRole());
    }

}
