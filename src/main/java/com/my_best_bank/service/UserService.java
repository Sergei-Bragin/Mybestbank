package com.my_best_bank.service;

import com.my_best_bank.model.LoginResponse;
import com.my_best_bank.model.User;
import com.my_best_bank.repo.UserRepository;
import com.my_best_bank.util.MD5Util;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public LoginResponse userAuth(String email, String pass) throws ServletException {

        String password = new MD5Util().passwordHash(pass);
        User userDB = userRepository.getByEmail(email);
        if (userDB == null || email == null || !password.equals(userDB.getPassword())) {
            /*return new LoginResponse(null);*/
            throw new ServletException("Invalid login");
        } else return new LoginResponse(Jwts.builder().setSubject(email)
                .claim("roles", userRepository.getByEmail(email)).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "secretkey").compact());
    }

    public Boolean registrationUser(User user) {
        if (user != null) {
            user.setPassword(new MD5Util().passwordHash(user.getPassword()));
            userRepository.saveAndFlush(user);
            return true;
        } else
            return false;
    }
}
