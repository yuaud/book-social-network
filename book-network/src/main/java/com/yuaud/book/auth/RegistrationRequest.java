package com.yuaud.book.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {

    @NotEmpty(message = "Firstname is empty")
    @NotBlank(message = "Firstname is blank")
    private String firstname;
    @NotEmpty(message = "Lastname is empty")
    @NotBlank(message = "Lastname is blank")
    private String lastname;
    @Email(message = "Wrong Email format --> example: example@example.com")
    @NotEmpty(message = "Email is empty")
    @NotBlank(message = "Email is blank")
    private String email;
    @NotEmpty(message = "Password is empty")
    @NotBlank(message = "Password is blank")
    @Size(min = 6, max = 20, message = "Password should be minimum 6, maximum 20 characters long")
    private String password;

}
