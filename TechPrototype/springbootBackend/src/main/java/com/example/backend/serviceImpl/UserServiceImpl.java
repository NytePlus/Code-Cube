package com.example.backend.serviceImpl;

import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.dao.FolderDao;
import com.example.backend.dao.RepoDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.domains.User;
import com.example.backend.domains.UserAuth;
import com.example.backend.service.UserService;
import com.example.backend.utils.ImageUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {
    private final UserDao userDao;

    @Autowired
    FolderDao folderDao;

    @Autowired
    RepoDao repoDao;

    @Autowired
    public UserServiceImpl(UserDao userDao){
        this.userDao = userDao;
    }

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
            User user = new User(null, userDTO.getName(), "", "", userAuth,
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

    @Override
    public Boolean changeAvatar(HttpServletRequest request, String name){
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        User user = userDao.getByName(name);
        user.setAvatar("/SystemData/imgs/" + files.get(0).getOriginalFilename());
        userDao.addUser(user);
        for (int i = 0; i < files.size(); ++i) {
            MultipartFile file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    String userDirectory = FileSystems.getDefault()
                            .getPath("")
                            .toAbsolutePath()
                            .toString();
                    String path = userDirectory + "/SystemData/imgs/" + file.getOriginalFilename();
                    System.out.println(path);
                    ImageUtils.saveFileToImage(file, path);
                } catch (Exception e) {
                    System.out.println("You failed to upload " + i + " => "
                            + e.getMessage());
                    return false;
                }
            } else return false;
        }
        return true;
    }

    @Override
    public User getProfile(String name){
        return userDao.getByName(name);
    }

    @Override
    public Boolean changeIntroduction(String introduction, String name){
        User user = userDao.getByName(name);
        user.setIntroduction(introduction);
        userDao.addUser(user);
        return true;
    }

    @Override
    public User getUserByName(String name) {
        return userDao.findByName(name);
    }
}
