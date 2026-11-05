import AppLoader from './appLoader';
class AppController extends AppLoader {
    getSources(callback) {
        super.getResp({
            endpoint: 'sources',
        }, callback);
    }
    getNews(e, callback) {
        var _a, _b;
        let target = e.target;
        const newsContainer = e.currentTarget;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null) {
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp({
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        }, callback);
                        (_a = document.querySelector('.news_message')) === null || _a === void 0 ? void 0 : _a.remove();
                        (_b = document.querySelector('.loader')) === null || _b === void 0 ? void 0 : _b.remove();
                        const preLoader = document.createElement('div');
                        const news = document.querySelector('.news');
                        news.appendChild(preLoader);
                        preLoader.className = 'loader';
                    }
                }
                return;
            }
            target = target.parentNode;
        }
    }
}
export default AppController;
