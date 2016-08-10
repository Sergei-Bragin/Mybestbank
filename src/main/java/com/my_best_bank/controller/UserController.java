package com.my_best_bank.controller;

import com.my_best_bank.model.LoginResponse;
import com.my_best_bank.model.User;
import com.my_best_bank.repo.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import java.util.Date;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public LoginResponse login(@RequestBody final User user) throws ServletException {
        String email = user.getEmail();
        User dbUser = userRepository.getByEmail(email);

        if (email == null || dbUser.getEmail() == null) {
            System.out.println("And wizard say AHAHA");
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
//    @PostMapping("/new")
//    public String addUser(@RequestBody User user){
//        userRepository.saveAndFlush(user);
//        return "Done!";
//    }

}
