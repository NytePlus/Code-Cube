import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "../page/HomePage";
import AuthProvider from "./AuthProvider";
import InstructionProvider from './InstructionProvider';
import LoginPage from "../page/LoginPage"
import React, {useState} from "react";
import {exampleRepos} from "../source/exampleRepo";
import RepoPage from "../page/RepoPage";

export default function AppRouter() {
    const [repos, setRepos] = useState(exampleRepos);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(repos);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setRepos(items);
    };

    const toggleStar = (id) => {
        const newRepos = repos.map(repo => {
            if (repo.id === id) {
                const newStarCount = repo.isStarred ? repo.stars - 1 : repo.stars + 1;
                return {...repo, isStarred: !repo.isStarred, stars: newStarCount};
            }
            return repo;
        });
        setRepos(newRepos);
    };

    return <BrowserRouter>
        <AuthProvider>
            <InstructionProvider>
                <Routes>
                    <Route index element={<HomePage repos={repos} onDragEnd={onDragEnd} toggleStar={toggleStar}/>} />
                    <Route path="/home" element={<LoginPage/>} />
                    <Route path="/repo" element={<RepoPage/>}/>
                </Routes>
            </InstructionProvider>
        </AuthProvider>
    </BrowserRouter>
}