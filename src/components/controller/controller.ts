import AppLoader from './appLoader';
import { ArticlesResponse, Callback, Endpoint, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<ArticlesResponse>): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;
        const preLoader: HTMLDivElement = document.createElement('div');
        const news: HTMLElement | null = document.querySelector('.news');

        if (!news) {
            return;
        }

        preLoader.className = 'loader';

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');

                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                }

                news.innerHTML = '';
                news.prepend(preLoader);
                preLoader.style.display = 'block';
                this.loadNews(sourceId, callback);
                return;
            }

            target = target.parentNode as HTMLElement;
        }
    }

    private loadNews(sourceId: string | null, callback: Callback<ArticlesResponse>): void {
        super.getResp<ArticlesResponse>(
            {
                endpoint: Endpoint.Everything,
                options: {
                    sources: sourceId ?? '',
                },
            },
            callback
        );
    }
}

export default AppController;
