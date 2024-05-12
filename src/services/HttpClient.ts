import axios, { AxiosError, AxiosResponse } from 'axios';

class HttpClient {

    public static version = 'api/v1';
    public static host = process.env.REACT_APP_HOST!;

    public get config() {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };
    }

    public static defaultError = {
        data: [],
        status: 'error',
        message: "حدث خطأ. يرجى المحاولة مرة أخرى.",
        title: ''
    }

    public static post = async (apiUrl: string, requestBody: object, config?: object) => {
        const httpClient = new HttpClient();
        let fullUrl = HttpClient.host + HttpClient.version + apiUrl;
        config = config || httpClient.config;
        console.log(config);
        return await axios.post(fullUrl, requestBody, config)
            .then((response: AxiosResponse) => response)
            .catch((error: AxiosError) => {
                if (!error.response)
                    return HttpClient.defaultError;

                switch (error.response?.status) {
                    case 419:
                        return axios.get(HttpClient.host + 'sanctum/csrf-cookie', config).then(() => {
                            return axios.post(fullUrl, requestBody, config).catch((error: any) => {
                                if (error.response?.status === 422)
                                    return error.response;
                                return HttpClient.defaultError;
                            });
                        }).catch(() => HttpClient.defaultError);
                    case 422:
                        return error.response;
                    case 401:
                        return window.location.href = '/login';
                    default: return error.response;
                }
            });
    }

    public static get = async (apiUrl: string): Promise<AxiosResponse<any> | typeof HttpClient.defaultError> => {
        const httpClient = new HttpClient();
        let fullUrl = HttpClient.host + HttpClient.version + apiUrl;

        return await axios.get(fullUrl, httpClient.config)
            .then((response: AxiosResponse) => response)
            .catch((error: AxiosError) => {
                if (!error.response)
                    return HttpClient.defaultError;

                if (error.response?.status === 401 && window.location.pathname !== '/login')
                    window.location.href = '/login';

                return error.response;
            });
    }
}

export default HttpClient;