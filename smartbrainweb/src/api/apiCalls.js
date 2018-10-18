const signIn = ({ token, email, password }) => {
    return new Promise((resolve, reject) => {
        if (token) {
            return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/signin`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        } else {
            return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/signin`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        }
    });
};

const signOut = (token) => {
    return new Promise((resolve, reject) => {
        return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/signout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
};

const registerUser = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/register`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}

const getProfile = ({ userId, token }) => {
    return new Promise((resolve, reject) => {
        return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/profile/${userId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
};

const updateProfile = ({ userId, data, token }) => {
    return new Promise((resolve, reject) => {
        return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/profile/${userId}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ formInput: data })
        })
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
};

const uploadImage = ({ input, token }) => {
    return new Promise((resolve, reject) => {
        return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/imageurl`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                input: input
            })
        })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
}

const updateEntriesCount = ({ userId, token }) => {
    return new Promise((resolve, reject) => {
        return fetch(`http://${process.env.REACT_APP_API_HOST}:3002/image`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: userId
            })
        })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
}

module.exports = {
    signIn,
    signOut,
    registerUser,
    getProfile,
    updateProfile,
    uploadImage,
    updateEntriesCount
}
