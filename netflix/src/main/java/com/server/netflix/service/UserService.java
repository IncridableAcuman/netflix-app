package com.server.netflix.service;

import com.server.netflix.dto.RegisterRequest;
import com.server.netflix.enums.Role;
import com.server.netflix.model.UserModel;
import com.server.netflix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserModel createUser(RegisterRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("User already exist");
        }
        UserModel userModel=new UserModel();
        userModel.setUsername(request.getUsername());
        userModel.setEmail(request.getEmail());
        userModel.setPassword(passwordEncoder.encode(request.getPassword()));
        userModel.setRole(Role.USER);
        return userRepository.save(userModel);
    }
//    find user
    public UserModel findUser(String email){
        return userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
    }
//    isMatchPassword
    public void isMatchPassword(String rawPassword,String encodePassword){
        if(!passwordEncoder.matches(rawPassword,encodePassword)){
            throw new RuntimeException("Password does not equal");
        }
    }
//    update password
    public void updatePassword(String password, UserModel userModel){
        userModel.setPassword(passwordEncoder.encode(password));
        userRepository.save(userModel);
    }
}
