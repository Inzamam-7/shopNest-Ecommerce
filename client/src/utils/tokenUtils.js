const TOKEN_KEY = "access_token";

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    console.log("token in set token", token);
    
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}