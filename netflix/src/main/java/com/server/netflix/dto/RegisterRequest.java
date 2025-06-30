package com.server.netflix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Username must be required!")
    @Size(min = 3,max = 50,message = "Username must between 3 and 50 characters!")
    private String username;

    @NotBlank(message = "Email must be required!")
    @Email
    private String email;

    @NotBlank(message = "Password must be required!")
    @Size(min = 8,max = 1024,message = "Password must between 8 and 1024 characters!")
    private String password;
}
