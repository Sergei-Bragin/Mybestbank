package com.my_best_bank.util.validation;

import com.my_best_bank.model.User;
import com.my_best_bank.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueImpl implements ConstraintValidator<Unique,String> {

    @Autowired
    UserRepository userRepository;

    private String message;

    @Override
    public void initialize(Unique unique) {
        this.message = unique.message();
    }

    @Override
    public boolean isValid(String target, ConstraintValidatorContext context) {
        try {
            User user = userRepository.getByEmail(target);
            if(user != null) return false;
        }catch (Exception e){
            e.printStackTrace();
        }
        return true;
    }
}
