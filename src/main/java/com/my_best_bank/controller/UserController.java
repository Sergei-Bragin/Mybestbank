package com.my_best_bank.controller;

import com.my_best_bank.model.User;
import com.my_best_bank.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/login")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> sayHi(){
        return userRepository.findAll();
    }

    @PostMapping
    public User loginUser(@RequestBody User userReq){
        User user = userRepository.findByEmail(userReq.getEmail());
        return user;
    }

    @PostMapping("/new")
    public String addUser(@RequestBody User user){
        userRepository.saveAndFlush(user);
        return "Done!";
    }

}
