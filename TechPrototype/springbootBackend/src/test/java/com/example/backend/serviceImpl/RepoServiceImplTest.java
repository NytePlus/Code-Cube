package com.example.backend.serviceImpl;

import com.example.backend.DTOs.CreateRepoDTO;
import com.example.backend.DTOs.FileDTO;
import com.example.backend.DTOs.GetRepoDTO;
import com.example.backend.DTOs.NameDateLabelUserDTO;
import com.example.backend.domains.Folder;
import com.example.backend.domains.Repo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.mock.web.MockMultipartHttpServletRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class RepoServiceImplTest {
    @Mock
    private MockHttpServletResponse response;

    @MockBean
    private RepoServiceImpl repoService;

    private GetRepoDTO getRepoDTO;
    private NameDateLabelUserDTO nameDateLabelUserDTO;
    private CreateRepoDTO createRepoDTO;

    @BeforeEach
    void setUp() {
        getRepoDTO = new GetRepoDTO();
        createRepoDTO = new CreateRepoDTO();
        nameDateLabelUserDTO = new NameDateLabelUserDTO();
    }

    @Test
    void fileUpload() {
        MockMultipartHttpServletRequest request = new MockMultipartHttpServletRequest();
        when(repoService.fileUpload(request)).thenReturn("upload successful");
        String result = repoService.fileUpload(request);
        assertEquals("upload successful", result, "File should be uploaded successfully");
    }

    @Test
    void getRepo() {
        Repo expectedRepo = new Repo();
        when(repoService.getRepo(getRepoDTO)).thenReturn(expectedRepo);
        Repo result = repoService.getRepo(getRepoDTO);
        assertEquals(expectedRepo, result, "Returned repo should match the expected one");
    }

    @Test
    void getFolder() {
        Folder expectedFolder = new Folder();
        when(repoService.getFolder(getRepoDTO)).thenReturn(expectedFolder);

        Folder result = repoService.getFolder(getRepoDTO);

        assertEquals(expectedFolder, result, "Returned folder should match the expected one");
    }

    @Test
    void getFile() {
        FileDTO expectedFile = new FileDTO();
        when(repoService.getFile(getRepoDTO)).thenReturn(expectedFile);

        FileDTO result = repoService.getFile(getRepoDTO);

        assertEquals(expectedFile, result, "Returned file should match the expected one");
    }

    @Test
    void downloadFile() {
        doAnswer(invocation -> {
            HttpServletResponse res = invocation.getArgument(1);
            res.setContentType("application/octet-stream");
            res.setHeader("Content-Disposition", "attachment; filename=test.txt");
            return null;
        }).when(repoService).downloadFile(any(GetRepoDTO.class), any(HttpServletResponse.class));

        repoService.downloadFile(getRepoDTO, response);

        verify(response).setContentType("application/octet-stream");
        verify(response).setHeader("Content-Disposition", "attachment; filename=test.txt");
    }

    @Test
    void getAllPublicRepos() {
        List<Repo> expectedRepos = Arrays.asList(new Repo(), new Repo());
        when(repoService.getAllPublicRepos()).thenReturn(expectedRepos);
        List<Repo> actualRepos = repoService.getAllPublicRepos();

        assertNotNull(actualRepos, "The list of repos should not be null");
        assertEquals(expectedRepos.size(), actualRepos.size(), "The size of repos list should be 2");
    }

    @Test
    void getAllByUser() {
        String userName = "testUser";
        List<Repo> expectedRepos = Collections.singletonList(new Repo());
        when(repoService.getAllByUser(userName)).thenReturn(expectedRepos);

        List<Repo> actualRepos = repoService.getAllByUser(userName);

        assertNotNull(actualRepos, "The list of repos should not be null");
        assertFalse(actualRepos.isEmpty(), "The list of repos should not be empty");
    }

    @Test
    void changeStar() {
        when(repoService.changeStar(getRepoDTO)).thenReturn(Boolean.TRUE);
        Boolean result = repoService.changeStar(getRepoDTO);
        assertTrue(result, "Star should be successfully changed");
    }

    @Test
    void getRepoByNameDateLabelUser() {
        List<Repo> expectedRepos = Arrays.asList(new Repo(), new Repo());
        when(repoService.getRepoByNameDateLabelUser(nameDateLabelUserDTO)).thenReturn(expectedRepos);

        List<Repo> actualRepos = repoService.getRepoByNameDateLabelUser(nameDateLabelUserDTO);

        assertNotNull(actualRepos, "The list of repos should not be null");
        assertEquals(expectedRepos.size(), actualRepos.size(), "The size of repos list should be 2");
    }

    @Test
    void createRepo() {
        CreateRepoDTO createRepoDTO = new CreateRepoDTO();
        when(repoService.createRepo(createRepoDTO)).thenReturn(Boolean.TRUE);
        Boolean result = repoService.createRepo(createRepoDTO);
        assertTrue(result, "Repository should be successfully created");
    }
}