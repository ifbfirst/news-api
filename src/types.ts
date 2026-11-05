export enum Status {
    Ok = 'ok',
    Error = 'error',
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    Get = 'GET',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type SourceId = string | null;

export type ArticleSource = {
    id: SourceId;
    name: string;
};

export type SourceResponse = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type SourcesResponse = {
    status: Status;
    sources: SourceResponse[];
};

export type ArticleResponse = {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
};

export type ArticlesResponse = {
    status: Status;
    totalResults: number;
    articles: ArticleResponse[];
};

export type LoaderOptions = {
    [key: string]: string | undefined;
};

export type RequestOptions = {
    sources?: string;
};

export type GetRespParams = {
    endpoint: Endpoint;
    options?: RequestOptions;
};

export type Callback<T> = (data?: T) => void;

export type DateParts = [string, string, string];
