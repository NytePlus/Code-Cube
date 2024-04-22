import React, { useState } from 'react';
import Layout from './component/layout';

const exampleRepos = [
    {
        id: 1,
        name: "repo-one",
        description: "This is a simple repository",
        tags: ["javascript", "react"],
        stars: 42,
        owner: {
            name: "John Doe",
            avatar_url: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        isStarred: false
    },
    {
        id: 2,
        name: "repo-two",
        description: "This is another simple repository",
        tags: ["python", "flask"],
        stars: 36,
        owner: {
            name: "Jane Doe",
            avatar_url: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        isStarred: true
    },
    {
        id: 3,
        name: "project-theta",
        description: "A complex data analysis repository",
        tags: ["data-science", "pandas"],
        stars: 75,
        owner: {
            name: "Alice Johnson",
            avatar_url: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        isStarred: false
    },
    {
        id: 4,
        name: "best-practices",
        description: "Contains best practices for coding in various languages",
        tags: ["coding", "best-practices"],
        stars: 50,
        owner: {
            name: "Mike Bennett",
            avatar_url: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        isStarred: false
    },
    {
        id: 5,
        name: "frontend-magic",
        description: "Frontend tricks and tips",
        tags: ["frontend", "css", "animations"],
        stars: 66,
        owner: {
            name: "Chris Wayne",
            avatar_url: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        isStarred: false
    },
    {
        id: 6,
        name: "backend-integrations",
        description: "Examples of various backend integrations",
        tags: ["backend", "api", "integration"],
        stars: 33,
        owner: {
            name: "Laura Smith",
            avatar_url: "https://randomuser.me/api/portraits/women/47.jpg"
        },
        isStarred: true
    }
];

function App() {
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

    return (
        <div>
            <Layout repos={repos} onDragEnd={onDragEnd} toggleStar={toggleStar}/>
        </div>
    );
}

export default App;
