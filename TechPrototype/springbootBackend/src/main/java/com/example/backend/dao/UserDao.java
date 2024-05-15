package com.example.backend.dao;

import com.example.backend.domains.Repo;
import com.example.backend.domains.User;
import com.example.backend.domains.UserAuth;
import com.example.backend.repository.UserAuthRepo;
import com.example.backend.repository.UserRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDao {
    @Resource
    UserRepo userRepo;
    @Resource
    UserAuthRepo userAuthRepo;

    public String getPasswordByName(String name) {
        User user = userRepo.findByName(name);
        if(user == null) return null;
        UserAuth userAuth = user.getUserAuth();
        assert userAuth != null;
        return userAuth.getPassword();
    }

    public User getByName(String name){
        return userRepo.findByName(name);
    }

    public Optional<User> findById(Integer id) { return userRepo.findById(id); }

    public void addUser(User user){
        userRepo.save(user);
    }

    public void addUserAuth(UserAuth userAuth){
        userAuthRepo.save(userAuth);
    }

    public void addStar(Repo repo, User user){
        List<Repo> repoList = user.getStarRepositoryList();
        repoList.add(repo);
        user.setStarRepositoryList(repoList);
        userRepo.save(user);
    }

    public void removeStar(Repo repo, User user){
        List<Repo> repoList = user.getStarRepositoryList();
        repoList.remove(repo);
        user.setStarRepositoryList(repoList);
        userRepo.save(user);
    }
}
