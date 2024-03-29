const { REACT_APP_BITLY_URL } = process.env;

async function apiRequest({ endpoint = '', method = 'GET', payload = null }) {
    if (!REACT_APP_BITLY_URL) throw new Error('No API URL provided');

    const validatedEndpoint = endpoint.startsWith('/')
        ? endpoint.substring(1)
        : endpoint;
    const url = `${REACT_APP_BITLY_URL}${validatedEndpoint}`;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_BITLY_GENERIC_TOKEN}`,
                'content-type': 'application/json'
            },
            ...(payload != null ? { body: JSON.stringify(payload) } : {})
        });

        let json;
        if (response.status === 204) {
            json = {};
        } else {
            json = await response.json();
        }

        return response.ok ? json : Promise.reject(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default apiRequest;
