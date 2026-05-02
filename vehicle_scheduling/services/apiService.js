import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiBase = process.env.API_BASE_URL || 'http://20.207.122.201/evaluation-service';

export const fetchDepots = async () => {
    try {
        const token = process.env.TOKEN;
        if (!token) {
            throw { status: 400, data: { error: 'Token missing' } };
        }
        const response = await axios.get(`${apiBase}/depots`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.depots || response.data || [];
    } catch (err) {
        if (err.status && err.data) throw err;
        if (err.response) {
            if (err.response.status === 401 || err.response.status === 403) {
                throw { status: err.response.status, data: { error: 'Token invalid' } };
            }
            throw { status: err.response.status, data: err.response.data };
        }
        throw { status: 500, data: { error: err.message } };
    }
};

export const fetchVehicles = async () => {
    try {
        const token = process.env.TOKEN;
        if (!token) {
            throw { status: 400, data: { error: 'Token missing' } };
        }
        const response = await axios.get(`${apiBase}/vehicles`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.vehicles || response.data || [];
    } catch (err) {
        if (err.status && err.data) throw err;
        if (err.response) {
            if (err.response.status === 401 || err.response.status === 403) {
                throw { status: err.response.status, data: { error: 'Token invalid' } };
            }
            throw { status: err.response.status, data: err.response.data };
        }
        throw { status: 500, data: { error: err.message } };
    }
};
