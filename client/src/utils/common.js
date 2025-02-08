const getCurrentUser = () => {
    const user = localStorage.getItem("e-commerce-user-details");

    if(!user){
        return null;
    }
    else{
        return JSON.parse(user);
    }
}

const jwtToken = () => {
    const token = localStorage.getItem("e-commerce-user-token");

    if(!token){
        return null;
    }
    else{
        return token;
    }
}

const logout = () => {
    localStorage.clear();

    setTimeout(() => {
        window.location.href = "/login";
    }, 3000);
}

export { getCurrentUser, jwtToken, logout }
