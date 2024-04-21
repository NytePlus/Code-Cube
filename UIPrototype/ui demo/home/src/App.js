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
        }
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
        }
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
        }
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
        }
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
        }
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
        }
    }
];

function App() {
    const [repos, setRepos] = useState(exampleRepos);  // 使用useState管理数据
    const reorderRepos = (startIndex, endIndex) => {
        const result = Array.from(repos);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        setRepos(result);
    };


    return (
        <div>
            <Layout repos={repos} reorderRepos={reorderRepos} />
        </div>
    );
}

export default App;
