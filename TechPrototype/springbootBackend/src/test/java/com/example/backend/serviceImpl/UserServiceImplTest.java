package com.example.backend.serviceImpl;

import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.dao.FolderDao;
import com.example.backend.dao.RepoDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.User;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class UserServiceImplTest {
    @MockBean
    UserService userService;

    @Autowired
    UserDao userDao;

    @Mock
    private HttpServletRequest request;

    private UserService realUserService;

    @BeforeEach
    void setUp(){
        realUserService = new UserServiceImpl(userDao);
    }

    @Test
    void checkAccount() {
//       正确的用户名和密码
        UserDTO userDTO1 = new UserDTO("Nyte", "114514");
        Boolean res1 = realUserService.checkAccount(userDTO1);
        assertEquals(res1, true);

//        错误的密码
        UserDTO userDTO2 = new UserDTO("Nyte", "123");
        Boolean res2 = realUserService.checkAccount(userDTO2);
        assertEquals(res2, false);

//        不存在的用户
        UserDTO userDTO3 = new UserDTO("hhh", "123");
        Boolean res3 = realUserService.checkAccount(userDTO3);
        assertEquals(res3, false);
    }

    @Test
    void signUp() {
        UserDTO userDTO = new UserDTO("hhh", "111");
        when(userService.signUp(userDTO)).thenReturn(true);
        boolean result = userService.signUp(userDTO);
        assertTrue(result, "User should be successfully signed up");
    }

    @Test
    void checkStarByPath() {
        GetRepoDTO getRepoDTO = new GetRepoDTO();
        when(userService.checkStarByPath(any(GetRepoDTO.class))).thenReturn(Boolean.TRUE);
        Boolean result = userService.checkStarByPath(getRepoDTO);
        assertTrue(result, "Star should be found by path");
    }

    @Test
    void changeAvatar() {
        when(userService.changeAvatar(request, "testName")).thenReturn(Boolean.TRUE);
        Boolean result = userService.changeAvatar(request, "testName");
        assertTrue(result, "Avatar should be successfully changed");
    }

    @Test
    void getProfile() {
        User expectedUser = new User(); // 假设你有一个User类
        // ... 设置expectedUser的属性
        when(userService.getProfile("testName")).thenReturn(expectedUser);

        User result = userService.getProfile("testName");

        assertEquals(expectedUser, result, "Returned profile should match the expected one");
    }

    @Test
    void changeIntroduction() {
        when(userService.changeIntroduction("New Introduction", "testName")).thenReturn(Boolean.TRUE);
        Boolean result = userService.changeIntroduction("New Introduction", "testName");
        assertTrue(result, "Introduction should be successfully changed");
    }
}