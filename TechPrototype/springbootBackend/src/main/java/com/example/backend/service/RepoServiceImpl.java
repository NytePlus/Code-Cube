package com.example.backend.service;

import com.example.backend.DTOs.CreateRepoDTO;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.UserDTO;
import com.example.backend.dao.FileDao;
import com.example.backend.dao.FolderDao;
import com.example.backend.dao.RepoDao;
import com.example.backend.dao.UserDao;
import com.example.backend.domains.File;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.sql.rowset.serial.SerialBlob;
import java.io.BufferedOutputStream;
import java.util.List;

@Service
public class RepoServiceImpl implements RepoService{
    @Autowired
    RepoDao repoDao;

    @Autowired
    FileDao fileDao;

    @Autowired
    FolderDao folderDao;

    @Autowired
    LoginService loginService;

    @Autowired
    UserDao userDao;

    public String fileUpload(HttpServletRequest request){
        MultipartHttpServletRequest params=((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String[] users = params.getParameterValues("user");
        String[] repos = params.getParameterValues("repo");
        String[] paths = params.getParameterValues("path");
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    String basePath = '/' + users[i] + '/' + repos[i];
                    String parentPath = basePath + "/" + paths[i].substring(0, paths[i].lastIndexOf("/"));
                    System.out.println(basePath + "+" + parentPath);
                    File fileClass = new File(basePath + '/' + paths[i],
                            file.getOriginalFilename(),
                            file.getContentType(),
                            file.getSize(),
                            new SerialBlob(file.getBytes()),
                            folderDao.findOrCreateByPath(parentPath));
                    fileDao.addFile(fileClass);
                } catch (Exception e) {
                    System.out.println("You failed to upload " + i + " => "
                            + e.getMessage());
                    return "You failed to upload " + i + " => "
                            + e.getMessage();
                }
            } else {
                return "You failed to upload " + i
                        + " because the file was empty.";
            }
        }
        return "upload successful";
    }

    public Repo getRepo(GetRepoDTO repoDTO){
        if(loginService.checkAccount(repoDTO.getUserDTO())){
            return repoDao.findByPath(repoDTO.getPath());
        }
        else{
            Repo repo = repoDao.findByPath(repoDTO.getPath());
            if(repo.isPublish() == false)
                return null;
            else{
                return repo;
            }
        }
    }

    public Folder getFolder(GetRepoDTO getRepoDTO){
        if(loginService.checkAccount(getRepoDTO.getUserDTO())){
                return folderDao.findByPath(getRepoDTO.getPath());
        }
        else{
            Repo repo = repoDao.findByPath(getRepoDTO.getPath());
            if(repo.isPublish() == false)
                return null;
            else{
                return folderDao.findByPath(getRepoDTO.getPath());
            }
        }
    }

    public List<Repo> getAllPublicRepos(){
        return repoDao.findAllPublic();
    }

    public List<Repo> getAllByUser(UserDTO userDTO){
        if(loginService.checkAccount(userDTO)){
            return repoDao.findAllByUser(userDao.getByName(userDTO.getName()));
        }
        else return null;
    }

    public Boolean createRepo(CreateRepoDTO repoDTO){
        System.out.println(repoDTO);
        if(loginService.checkAccount(repoDTO.getUser())){
            if(repoDao.checkByPath(repoDTO.getPath()))
                return false;
            else{
                repoDao.createByRepoDTO(repoDTO);
                return true;
            }
        }
        else return false;
    }
}
