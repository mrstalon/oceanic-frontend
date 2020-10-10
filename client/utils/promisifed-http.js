const httpRequest = (url, method, file) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('speeches', file);

        const request = new XMLHttpRequest();
        request.open(method, url);

        request.onload = () => {
            if (request.status >= 200 && request.status < 300 && request.response) {
                const parsed = JSON.parse(request.response);

                if (parsed) {
                    resolve(parsed);
                }
            } else {
                reject(request.statusText);
            }
        };

        request.onerror = () => reject(request.statusText);

        request.send(file ? formData : '');
    });
};

export default httpRequest;
