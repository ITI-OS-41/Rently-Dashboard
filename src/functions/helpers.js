function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const getToken = () =>{
    return localStorage.getItem('rently-token')
}

const checkTokenValidity = () => {
    const token = localStorage.getItem('rently-token')
    if (token) {
        const info = parseJwt(token)
        const expiration = new Date(info.exp).getTime() * 1000;
        const now = new Date().getTime();

        if (expiration - now < 0) {
            localStorage.removeItem('rently-token')
        }
    }
}

const getUserType = (token) => {
    if (token) {
        const info = parseJwt(token)
        return info.role
    }
}

const isAdmin = (token) => {
    return getUserType(token) === 'admin'
}


export { getUserType, isAdmin, checkTokenValidity ,getToken}