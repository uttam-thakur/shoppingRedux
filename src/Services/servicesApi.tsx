//previous login api without acess token

import axios from "axios";

interface IsLogin {
    username: String,
    password: Number | String,



}
export async function login(payload: IsLogin) {
    try {
        const response = await axios.post('https://logintesting.p.rapidapi.com/login', payload, {
            
            headers: {
                'content-type': 'application/json',
                Authentication: '5hvsyf2K6xuUfJVxRu5mDaNI0IAODh',
                'X-RapidAPI-Key': '1bdf2179a3mshd1b2efa8a3783b2p14e990jsn56a9af198b87',
                'X-RapidAPI-Host': 'logintesting.p.rapidapi.com',
            },
        });
        const result = response?.data;

        if (response.status !== 202) {
            throw new Error('Request failed');
        }
        localStorage.setItem('user info', JSON.stringify(result?.data?.accessToken));
        return response.data;
    }
    catch (errorMsg: any) {
        throw errorMsg.response.data.message;
    }
}


//new login api with access token

// import axios from "axios";

// interface IsLogin {
//     username: String,
//     password: Number | String,



// }
// export async function login(payload: IsLogin) {
//     try {
//             const response = await axios.post(' https://fakestoreapi.com/auth/login', payload, {
           
//             headers: {
//                 'content-type': 'application/json',
//                 Authentication: '5hvsyf2K6xuUfJVxRu5mDaNI0IAODh',
//                 'X-RapidAPI-Key': '1bdf2179a3mshd1b2efa8a3783b2p14e990jsn56a9af198b87',
//                 'X-RapidAPI-Host': 'logintesting.p.rapidapi.com',
//             },
//         });
//         const result = response?.data;
// console.log("result",result.token);

// // localStorage.setItem('tokenAccess', JSON.stringify(result));
//         if (response.status !== 204) {
//             throw new Error('Request failed');
//         }
//         localStorage.setItem('user info', JSON.stringify(result));
//         return response.data;
//     }
//     catch (errorMsg: any) {
//         throw errorMsg?.response?.data?.message;
//     }
// }