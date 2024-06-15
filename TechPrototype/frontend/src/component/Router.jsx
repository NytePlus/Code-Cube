import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../page/HomePage';
import AuthProvider from './AuthProvider';
import InstructionProvider from './InstructionProvider';
import LoginPagePlus from '../page/LoginPagePlus';
import BrowsingHistoryPage from '../page/BrowsingHistoryPage';
import RepoPage from '../page/RepoPage';
import DiscussionDetail from '../page/DiscussionDetail';
import React from 'react';
import FilterProvider from "./FilterProvider";
import UserPage from "../page/UserPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <InstructionProvider>
                    <FilterProvider>
                        <Routes>
                            <Route index element={<LoginPagePlus />} />
                            <Route path="/:user" element={<HomePage />} />
                            <Route path="/:user/profile" element={<UserPage />} />
                            <Route path="/:user/:repo" element={<RepoPage />} />
                            <Route path="/history" element={<BrowsingHistoryPage />} />
                            <Route path="/:user/brows" element={<BrowsingHistoryPage />} />
                            <Route path="/discussions/:discussionId" element={<DiscussionDetail />} />
                        </Routes>
                    </FilterProvider>
                </InstructionProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
