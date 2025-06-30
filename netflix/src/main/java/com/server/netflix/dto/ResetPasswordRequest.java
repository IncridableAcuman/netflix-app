package com.server.netflix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResetPasswordRequest {
    @NotBlank(message = "Token must be required!")
    private String token;

    @NotBlank(message = "Password must be required!")
    @Size(min = 8,max = 1024,message = "Password must between 8 and 1024 characters!")
    private String password;
}
