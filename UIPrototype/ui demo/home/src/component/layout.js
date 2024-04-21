import React from 'react';
import { useState } from "react";
import Header from './header';
import RepoList from './RepoList';
import { Grid, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const Layout = ({ repos, reorderRepos }) => {
    const [viewMode, setViewMode] = useState('list'); // 默认视图模式为列表

    const handleViewChange = (event, nextView) => {
        if (nextView !== null) {
            setViewMode(nextView);
        }
    };

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{ height: '100vh', mt: 8 }} style={{ marginTop: '24px' }}>
                <Grid item xs={1} md={0.5} sx={{ position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 0, left: 20, height: '100%' }}>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={viewMode}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="View mode"
                            sx={{ height: '100%' }}
                        >
                            <ToggleButton value="list" aria-label="list view">
                                <ViewListIcon />
                            </ToggleButton>
                            <ToggleButton value="grid" aria-label="grid view">
                                <ViewModuleIcon />
                            </ToggleButton>
                            <ToggleButton value="splay" aria-label="splay tree view">
                                <AccountTreeIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={11} md={5.5} sx={{ position: 'relative', marginTop: '-32px', left: -20 }}>
                    <RepoList repos={repos} viewMode={viewMode} reorderRepos={reorderRepos} />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* 右半部分暂留空 */}
                </Grid>
            </Grid>
        </>
    );
};
export default Layout;