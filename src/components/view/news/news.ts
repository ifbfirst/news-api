import { ArticleResponse } from '../../../types';
import './news.css';

class News {
    public draw(data: ArticleResponse[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: ArticleResponse, idx) => {
            if (newsItemTemp) {
                const newsClone: HTMLElement | null = <HTMLElement>newsItemTemp.content.cloneNode(true);

                if (newsClone && idx % 2) {
                    const newsItem = newsClone.querySelector('.news__item');
                    if (newsItem) newsItem.classList.add('alt');
                }

                const newsMetaPhoto = <HTMLElement>newsClone.querySelector('.news__meta-photo');
                if (newsMetaPhoto)
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || './src/img/news_placeholder.svg'})`;

                const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
                if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;

                const newsMetaDate = newsClone.querySelector('.news__meta-date');
                if (newsMetaDate)
                    newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
                if (newsDescriptionTitle) newsDescriptionTitle.textContent = item.title;

                const newsDescriptionSource = newsClone.querySelector('.news__description-source');
                if (newsDescriptionSource) newsDescriptionSource.textContent = item.source.name;

                const newsDescriptionContent = newsClone.querySelector('.news__description-content');
                if (newsDescriptionContent) newsDescriptionContent.textContent = item.description;

                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsReadMore) newsReadMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });
        const newsDoc = document.querySelector('.news');
        if (newsDoc) {
            newsDoc.innerHTML = '';
            newsDoc.appendChild(fragment);
        }

        if (news.length === 0) {
            const messageNoNews = document.createElement('div');
            messageNoNews.className = 'news_message';

            newsDoc?.appendChild(messageNoNews);
            messageNoNews.textContent = 'There are no news. Select another source.';
        }
    }
}

export default News;
