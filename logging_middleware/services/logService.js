import axios from 'axios';
import { getToken, refreshToken } from './authService.js';
import { LEVELS, VALID_STACK } from '../utils/constants.js';

export const Log = async (stack, level, packageName, message) => {
    let finalStack = stack === VALID_STACK ? stack : VALID_STACK;
    let finalLevel = Object.values(LEVELS).includes(level) ? level : LEVELS.INFO;

    const sendLog = async (retry = true) => {
        try {
            const token = await getToken();
            const payload = {
                stack: finalStack,
                level: finalLevel,
                packageName,
                message
            };
            await axios.post(`${process.env.API_BASE_URL}/logs`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403) && retry) {
                await refreshToken();
                await sendLog(false);
            }
        }
    };

    await sendLog();
};
