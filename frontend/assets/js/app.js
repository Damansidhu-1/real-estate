// app.js
document.addEventListener("DOMContentLoaded", () => {
    const jwt = localStorage.getItem("jwt_token");
    const navRight = document.getElementById("nav-right");

    // Check if JWT exists
    if (jwt) {
        const user = parseJwt(jwt);
        if (user) {
            // User is logged in, show their name and the logout button
            document.getElementById("user-name").textContent = `Welcome, ${user.name}`;
            document.getElementById("login-link").style.display = "none";
            document.getElementById("signup-link").style.display = "none";
            document.getElementById("logout-btn").style.display = "inline-block";
        }
    } else {
        // User is not logged in, show login and signup links
        document.getElementById("login-link").style.display = "inline-block";
        document.getElementById("signup-link").style.display = "inline-block";
        document.getElementById("logout-btn").style.display = "none";
    }

    fetchProperties();
});

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

async function fetchProperties() {
    const propertyList = document.getElementById("property-list");
    try {
        const response = await fetch("http://localhost:4000/api/properties");
        const properties = await response.json();

        properties.forEach(property => {
            const card = `
                <div class="property-card">
                    <img src="${property.imageUrl}" alt="${property.title}">
                    <div class="details">
                        <h3>${property.title}</h3>
                        <p>${property.location}</p>
                        <p>₹${property.price}</p>
                        <p>${property.description}</p>
                    </div>
                </div>
            `;
            propertyList.innerHTML += card;
        });
    } catch (error) {
        console.error("Error fetching properties:", error);
    }
}