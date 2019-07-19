//import Logger from './Logger.js';
import axios from 'axios';
import Cookies from 'js-cookie';

const URL = `http://http://localhost:31415/Profile`;

async function UpdateProfile(fullName, address1, address2, city, state, zip) {

    try {
        const response = await axios(URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: {fullName, address1, address2, city, state, zip},
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }

}

async function GetProfile(fullName, address1, address2, city, state, zip) {

    try {
        const response = await axios(URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            data: {fullName, address1, address2, city, state, zip},
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }

}

export { UpdateProfile, GetProfile };

