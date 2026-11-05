export interface SourceResponse {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: SourceResponse[];
}

export interface ArticleResponse {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ArticlesResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: ArticleResponse[];
}
