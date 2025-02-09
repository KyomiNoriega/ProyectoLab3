import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://laboratorio-afe2.restdb.io/rest/',
    headers: {
        'x-apikey': '650b53356888544ec60c00bf'
    }
})

export default {
    postTransaction(data) {
        apiClient.post('/transactions', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getTransaction(userId) {
        return apiClient.get(`transactions?q={"user_id": "${userId}"}`)
    },
    patchTransaction(id, data) {
        apiClient.patch('transactions/' + id, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    delTransaction(id) {
        apiClient.delete('transactions/' + id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}