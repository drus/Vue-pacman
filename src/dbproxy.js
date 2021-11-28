let _data;
let _endpoint;

const loadGameScreens = (force) => {
    if (!_endpoint) {
        throw (new Error('DBProxy not inited or undefined endpoint'));
    }

    if (!force && _data) return _data;

    _data = fetch(_endpoint)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error", error);
        });

    return _data;
}

const getGameById = (games, id) => {
    let result = games.filter(game => game.id == id);
    return result.length ? result[0] : null;
};

export default {

    init(endpoint) {
        _endpoint = endpoint;
    },


    getGameScreens(force) {
        return loadGameScreens(force)
            .then(data => {
                return data;
            });
    },

    getNextScreen(gameId) {
        return loadGameScreens()
            .then(data => {
                let index = data.findIndex((item) => (item.id == gameId));
                return data[index + 1] ? data[index + 1] : data[0];
            });
    },

    getGameScreenById(id) {
        return loadGameScreens()
            .then(data => {
                return getGameById(data, id);
            });
    },
    getGameScreen(index) {
        return loadGameScreens()
            .then(data => {
                //console.log("data", index, data[index]);
                return data[index];
            });
    },

    saveGameScreen(gameData) {
        //console.log("gameData", gameData);
        fetch(_endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameData)
            })
            .then(response => {
                //console.log('response =', response);
                return response.json();
            })
            .then(data => {
                console.log('data = ', data);
            })
            .catch(error => {
                console.error(error);
            });
    },

    deleteGameScreen(id) {
        let confirm = window.confirm(`Game screen ${id} will be deleted. Are you sure?`);
        if (!confirm) return false;

        return fetch(_endpoint + '/' + id, {
                method: 'DELETE',
            })
            .then(response => {
                //console.log('response =', response);
                return response.json();
            })
            .then(data => {
                //console.log('data = ', data);
                return data;
            })
            .catch(error => {
                console.error(error);
            });
    }
};