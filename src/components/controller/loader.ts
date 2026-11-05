import { Callback, Endpoint, GetRespParams, HttpMethod, HttpStatus, LoaderOptions, RequestOptions } from '../../types';

class Loader {
    private baseLink: string | undefined;
    private options: LoaderOptions;

    public constructor(baseLink: string | undefined, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        params: GetRespParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.Get, params.endpoint, callback, params.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            const status: number = res.status;
            const isClientError: boolean = status === HttpStatus.Unauthorized || status === HttpStatus.NotFound;

            if (isClientError) {
                console.log(`Sorry, but there is ${status} error: ${res.statusText}`);
            }

            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: LoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: HttpMethod, endpoint: Endpoint, callback: Callback<T>, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
