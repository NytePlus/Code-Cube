package com.example.backend.controller;

import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void checkAccountHandler_ShouldReturnTrue_WhenUserServiceReturnsTrue() throws Exception {
        when(userService.checkAccount(any(UserDTO.class))).thenReturn(true);

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\",\"password\":\"pass\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void signUpHandler_ShouldReturnTrue_WhenUserServiceReturnsTrue() throws Exception {
        when(userService.signUp(any(UserDTO.class))).thenReturn(true);

        mockMvc.perform(post("/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"user\",\"password\":\"pass\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void isStarredByUserHandler_ShouldReturnTrue_WhenUserServiceReturnsTrue() throws Exception {
        when(userService.checkStarByPath(any(GetRepoDTO.class))).thenReturn(true);

        mockMvc.perform(post("/repoStarCheck")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"user\":\"user\",\"repo\":\"repo\"}"))
                .andExpect(status().isOk());
    }
}
