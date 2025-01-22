import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
};

export const checkTokenValidity = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    }
};
