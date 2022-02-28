const cache = {};

export function fetchData(url, callback, errorCallback, isCached = true) {

    if (cache[url] && isCached) {
        callback(true, cache[url]);
        return;
    }

    fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then(
            (result) => {
                if (isCached) {
                    cache[url] = result;
                }
                callback(true, result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                errorCallback(error);
            }
        );
}