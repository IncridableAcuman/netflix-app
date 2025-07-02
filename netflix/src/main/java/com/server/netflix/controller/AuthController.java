package com.server.netflix.controller;

import com.server.netflix.service.TokenService;
import com.server.netflix.service.UserService;
import com.server.netflix.util.CookieUtil;
import com.server.netflix.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final TokenService tokenService;
    private final MailUtil mailUtil;
    private final CookieUtil cookieUtil;
}
