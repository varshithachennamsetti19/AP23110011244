import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let clientID = null;
let clientSecret = null;
let bearerToken = null;

const apiBase = process.env.API_BASE_URL;

const register = async () => {
    try {
        const payload = {
            email: process.env.EMAIL,
            name: process.env.NAME,
            mobileNo: process.env.MOBILE,
            githubUsername: process.env.GITHUB_USERNAME,
            rollNo: process.env.ROLL_NO,
            accessCode: process.env.ACCESS_CODE
        };
        const response = await axios.post(`${apiBase}/register`, payload);
        const data = response.data;
        clientID = data.clientID || data.clientId || data.CLIENT_ID || (typeof data === 'string' ? data : null);
        clientSecret = data.clientSecret || data.CLIENT_SECRET || (typeof data === 'string' ? data : null);
    } catch (err) {
        throw err;
    }
};

const authenticate = async () => {
    if (!clientID || !clientSecret) {
        await register();
    }
    try {
        const payload = {
            email: process.env.EMAIL,
            name: process.env.NAME,
            rollNo: process.env.ROLL_NO,
            accessCode: process.env.ACCESS_CODE,
            clientID,
            clientSecret
        };
        const response = await axios.post(`${apiBase}/auth`, payload);
        const data = response.data;
        bearerToken = data.token || data.access_token || data.bearerToken || data.jwt || (typeof data === 'string' ? data : null);
    } catch (err) {
        throw err;
    }
};

export const getToken = async () => {
    if (!bearerToken) {
        await authenticate();
    }
    return bearerToken;
};

export const refreshToken = async () => {
    await authenticate();
    return bearerToken;
};
