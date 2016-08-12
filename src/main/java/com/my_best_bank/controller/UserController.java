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
import java.util.Date;
import java.util.List;

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


        if (email == null || dbUser.getEmail() == null || !pass.equals(dbUser.getPassword())) {
            throw new ServletException("Invalid login");
        }
        return new LoginResponse(Jwts.builder().setSubject(user.getEmail())
                .claim("roles", userRepository.getByEmail(user.getEmail())).setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "secretkey").compact());
    }


//    @GetMapping
//    public List<User> sayHi(){
//        return userRepository.findAll();
//    }
//
//    @PostMapping
//    public User loginUser(@RequestBody User userReq){
//        User user = userRepository.findByEmail(userReq.getEmail());
//        return user;
//    }
//
    @PostMapping("/new")
    public String addUser(@RequestBody User user){
        String pass = user.getPassword();
        user.setPassword(new MD5Util().passwordHash(pass));
        userRepository.saveAndFlush(user);
        return "Done!";
    }

}
