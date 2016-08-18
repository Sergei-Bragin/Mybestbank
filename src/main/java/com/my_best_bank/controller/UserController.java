package com.my_best_bank.controller;

import com.my_best_bank.model.LoginResponse;
import com.my_best_bank.model.User;
import com.my_best_bank.repo.UserRepository;
import com.my_best_bank.service.UserService;
import com.my_best_bank.util.MD5Util;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public LoginResponse login(@RequestBody final User user) throws ServletException {
        return userService.userAuth(user.getEmail(),user.getPassword());
    }

    @PostMapping("/new")
    public Boolean addUser(@Valid @RequestBody User user) {
        return userService.registrationUser(user);
    }

}
