package com.example.backend.service;

import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.dao.FolderDao;
import com.example.backend.dao.RepoDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.domains.User;
import com.example.backend.domains.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    @Autowired
    FolderDao folderDao;

    @Autowired
    RepoDao repoDao;

    @Override
    public boolean checkAccount(UserDTO user){
        String input = user.getPassword();
        String password = userDao.getPasswordByName(user.getName());
        if(password == null) return false;
        System.out.println(input + "\n" + password);
        return Objects.equals(input, password);
    }

    @Override
    public boolean signUp(UserDTO userDTO){
        if(userDao.getByName(userDTO.getName()) != null)
            return false;
        else{
            UserAuth userAuth = new UserAuth(null, userDTO.getPassword());
            userDao.addUserAuth(userAuth);
            User user = new User(null, userDTO.getName(), null, userAuth,
                    new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                    new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
            userDao.addUser(user);
            System.out.println("/" + userDTO.getName());
            folderDao.createByPath("/" + userDTO.getName());
            return true;
        }
    }

    @Override
    public Boolean checkStarByPath(GetRepoDTO getRepoDTO){
        if(checkAccount(getRepoDTO.getUserDTO())){
            if(repoDao.checkByPath(getRepoDTO.getPath())){
                Repo repo = repoDao.findByPath(getRepoDTO.getPath());
                User user = userDao.getByName(getRepoDTO.getUserDTO().getName());
                return user.getStarRepositoryList().contains(repo);
            }
        }
        return false;
    }
}
