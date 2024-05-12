package com.example.backend.dao;

import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import com.example.backend.repository.FolderRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class FolderDao {
    @Resource
    FolderRepo folderRepo;

    public Folder findOrCreateByPath(String path){
        Folder folder = folderRepo.findByPath(path);
        if(folder == null){
            return createByPath(path);
        }
        else{
            return folder;
        }
    }

    public Boolean checkByPath(String path){
        return folderRepo.findByPath(path) != null;
    }

    public Folder findByPath(String path){
        return folderRepo.findByPath(path);
    }

    public Folder createByPath(String path){
        String[] pathSplit = path.split("/");
        String parentPath = path.substring(0, path.lastIndexOf("/"));
        Folder folder = new Folder(path, pathSplit[pathSplit.length - 1],
                new ArrayList<>(), new ArrayList<>(),
                findOrCreateByPath(parentPath));
        folderRepo.save(folder);
        return folder;
    }
}
