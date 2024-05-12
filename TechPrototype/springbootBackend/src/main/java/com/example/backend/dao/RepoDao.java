package com.example.backend.dao;

import com.example.backend.DTOs.RepoDTO;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import com.example.backend.domains.Tag;
import com.example.backend.domains.User;
import com.example.backend.repository.RepoRepo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class RepoDao {
    @Resource
    RepoRepo repoRepo;

    @Autowired
    FolderDao folderDao;

    @Autowired
    UserDao userDao;

    @Autowired
    TagDao tagDao;

    public Repo findByPath(String path){
        return repoRepo.findByPath(path);
    }

    public Boolean checkByPath(String path){
        return repoRepo.findByPath(path) != null;
    }

    public Repo createByRepoDTO(RepoDTO repoDTO){
        Folder folder = folderDao.createByPath(repoDTO.getPath());
        String[] pathSplit = repoDTO.getPath().split("/");
        List<Tag> tagList = new ArrayList<>();
        for(String tagName : repoDTO.getTagNameList()){
            tagList.add(tagDao.findOrCreateByName(tagName));
        }
        Repo repo = new Repo(repoDTO.getPath(), pathSplit[pathSplit.length - 1],
                repoDTO.getIntroduction(), 0,
                repoDTO.getPublish(), folder, userDao.getByName(repoDTO.getUser().getName()),
                new ArrayList<>(), tagList);
        repoRepo.save(repo);
        return repo;
    }

    public List<Repo> findAllPublic(){
        return repoRepo.findAllByPublish(true);
    }

    public List<Repo> findAllByUser(User user){
        return repoRepo.findAllByInitUser(user);
    }
}
