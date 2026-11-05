import AppLoader from './appLoader';
type Callback<T> = (data?: T) => void;

class AppController extends AppLoader {
    public getSources<T>(callback: Callback<T>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: Callback<T>): void {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null) {
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                        document.querySelector('.news_message')?.remove();
                        document.querySelector('.loader')?.remove();
                        const preLoader = document.createElement('div');
                        const news = <HTMLElement>document.querySelector('.news');
                        news.appendChild(preLoader);
                        preLoader.className = 'loader';
                    }
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
