package com.my_best_bank.controller;

import com.my_best_bank.model.LoginResponse;
import com.my_best_bank.model.User;
import com.my_best_bank.repo.UserRepository;
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
    private UserRepository userRepository;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public LoginResponse login(@RequestBody final User user) throws ServletException {

        String email = user.getEmail();
        String pass = new MD5Util().passwordHash(user.getPassword());
        User dbUser = userRepository.getByEmail(email);

        if (dbUser == null || email == null || !pass.equals(dbUser.getPassword())) {
            return new LoginResponse(null);
            /*throw new ServletException("Invalid login");*/
        }
        return new LoginResponse(Jwts.builder().setSubject(user.getEmail())
                .claim("roles", userRepository.getByEmail(user.getEmail())).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "secretkey").compact());
    }

    @PostMapping("/new")
    public Boolean addUser(@Valid @RequestBody User user) {
        if (user != null) {
            String pass = user.getPassword();
            user.setPassword(new MD5Util().passwordHash(pass));
            userRepository.saveAndFlush(user);
            return true;
        } else return false;
    }

}
