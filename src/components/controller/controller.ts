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
        const preLoader = document.createElement('div');
        const news = <HTMLElement>document.querySelector('.news');
        preLoader.className = 'loader';

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId)
                    newsContainer.setAttribute('data-source', sourceId);
                news.innerHTML = '';
                news.prepend(preLoader);
                preLoader.style.display = 'block';

                super.getResp(
                    {
                        endpoint: 'everything',
                        options: {
                            sources: <string>sourceId,
                        },
                    },
                    callback
                );

                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
