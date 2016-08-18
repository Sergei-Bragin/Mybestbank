package com.my_best_bank.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.my_best_bank.util.validation.Unique;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull(message = "Cant be empty")
    private String name;

    @Unique(message = "This email is not available")
    @NotNull(message = "Cant be empty")
    private String email;

    @NotNull(message = "Cant be empty")
    @Size(min = 4, max = 64, message ="Myst be betvin 4 - 16 symbol")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
