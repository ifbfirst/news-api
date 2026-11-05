import './news.css';
class News {
    draw(data) {
        var _a;
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone = newsItemTemp.content.cloneNode(true);
                if (newsClone) {
                    if (idx % 2) {
                        const newsItem = newsClone.querySelector('.news__item');
                        if (newsItem)
                            newsItem.classList.add('alt');
                    }
                    const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhoto)
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAuthor)
                        newsMetaAuthor.textContent = item.author || item.source.name;
                    const newsMetaDate = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDate)
                        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                    const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                    if (newsDescriptionTitle)
                        newsDescriptionTitle.textContent = item.title;
                    newsClone.querySelector('.news__description-source').textContent = item.source.name;
                    newsClone.querySelector('.news__description-content').textContent = item.description;
                    newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);
                    fragment.append(newsClone);
                }
            }
        });
        newsItemTemp('.news').innerHTML = '';
        (_a = document.querySelector('.news')) === null || _a === void 0 ? void 0 : _a.appendChild(fragment);
    }
}
export default News;
