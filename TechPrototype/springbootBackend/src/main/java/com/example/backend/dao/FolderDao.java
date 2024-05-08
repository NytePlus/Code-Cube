package com.example.backend.dao;

import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import com.example.backend.repository.FolderRepo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class FolderDao {
    @Resource
    FolderRepo folderRepo;

    public Folder findOrCreateByPath(String path){
        Folder folder = folderRepo.findByPath(path);
        if(folder == null){
            String[] pathSplit = path.split("/");
            folder = new Folder(path, pathSplit[pathSplit.length - 1],
                    new ArrayList<>(), new ArrayList<>(),
                    findOrCreateByPath(path.split("/")[pathSplit.length - 2]));
            folderRepo.save(folder);
            return folder;
        }
        else{
            return folder;
        }
    }
}
