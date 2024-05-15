import { SPRINGBOOTURL, post } from "./common";

export const login = async (username, password) => {
    try {
        const response = await fetch(`${SPRINGBOOTURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, password: password }),
            credentials: 'include'
        });

        if (response.ok) {
            const isLoggedIn = await response.json();
            console.log('Login status:', isLoggedIn);
            alert(isLoggedIn ? 'Login successful!' : 'Login failed: Invalid username or password');
            return isLoggedIn
        } else {
            const errorText = await response.text();
            throw new Error('Server responded with status ' + response.status + ': ' + errorText);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login error: ' + error.message);
    }
};