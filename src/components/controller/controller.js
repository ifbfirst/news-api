import AppLoader from './appLoader';
class AppController extends AppLoader {
    getSources(callback) {
        super.getResp({
            endpoint: 'sources',
        }, callback);
    }
    getNews(e, callback) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        const preLoader = document.createElement('div');
        const news = document.querySelector('.news');
        preLoader.className = 'loader';
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null && newsContainer.getAttribute('data-source') !== sourceId)
                    newsContainer.setAttribute('data-source', sourceId);
                news.innerHTML = '';
                news.prepend(preLoader);
                preLoader.style.display = 'block';
                super.getResp({
                    endpoint: 'everything',
                    options: {
                        sources: sourceId,
                    },
                }, callback);
                return;
            }
            target = target.parentNode;
        }
    }
}
export default AppController;
