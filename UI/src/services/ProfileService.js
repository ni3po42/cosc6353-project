import axios from 'axios';

async function UpdateProfile(profile) {

    try {
        const response = await axios({
            method: 'POST',
            url: '/api/Profile',
            data: profile,
        });
        return response.data;
    }
    catch (e) {
        throw e.response.data;
    }

}

async function GetProfile() {

    try {
        const response = await axios({
            method: 'GET',
            url: '/api/Profile'
        });
        return response.data;
    }
    catch (e) {
        throw e.response.data;
    }

}

export { UpdateProfile, GetProfile };