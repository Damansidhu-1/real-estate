window.onload = () => {
    console.log('DOM Loaded: ', document.readyState); // This logs the document loading state

    console.log('login-link:', document.getElementById('login-link'));  // Debugging the login link

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutBtn = document.getElementById('logout-btn');

    const token = localStorage.getItem('jwt_token');

    console.log('Token:', token);

    if (token) {
        const decodedToken = parseJwt(token);  // Use the parseJwt function here
        if (decodedToken) {
            const userDisplayName = decodedToken.name || 'User';
            document.getElementById('user-name').textContent = `Welcome, ${userDisplayName}`;
            document.getElementById('login-link').style.display = 'none';
            document.getElementById('signup-link').style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        }
    } else {
        document.getElementById('login-link').style.display = 'inline-block';
        document.getElementById('signup-link').style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('jwt_token', data.token);
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Login Failed');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('jwt_token', data.token);
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Signup Failed');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('jwt_token');
            window.location.href = 'index.html';
        });
    }
};

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch (e) {
        console.error('Invalid token', e);
        return null;
    }
}