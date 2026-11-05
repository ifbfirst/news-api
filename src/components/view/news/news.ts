import { ArticleResponse, DateParts } from '../../../types';
import './news.css';

const NEWS_LIMIT: number = 10;

class News {
    public draw(data: ArticleResponse[]): void {
        const isOverLimit: boolean = data.length >= NEWS_LIMIT;
        const news: ArticleResponse[] = isOverLimit
            ? data.filter((_item: ArticleResponse, idx: number) => idx < NEWS_LIMIT)
            : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: ArticleResponse, idx: number) => {
            const newsClone: HTMLElement | null = this.cloneTemplate(newsItemTemp);
            if (!newsClone) {
                return;
            }

            this.markAlternate(newsClone, idx);
            this.fillCard(newsClone, item);
            fragment.append(newsClone);
        });

        this.render(fragment, news.length);
    }

    private cloneTemplate(template: HTMLTemplateElement | null): HTMLElement | null {
        if (!template) {
            return null;
        }

        return template.content.cloneNode(true) as HTMLElement;
    }

    private markAlternate(newsClone: HTMLElement, idx: number): void {
        const isAlternate: boolean = idx % 2 !== 0;
        if (!isAlternate) {
            return;
        }

        const newsItem: Element | null = newsClone.querySelector('.news__item');
        if (newsItem) {
            newsItem.classList.add('alt');
        }
    }

    private fillCard(newsClone: HTMLElement, item: ArticleResponse): void {
        const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
        if (newsMetaPhoto) {
            const imageUrl: string = item.urlToImage || './src/img/news_placeholder.svg';
            newsMetaPhoto.style.backgroundImage = `url(${imageUrl})`;
        }

        const newsMetaAuthor: Element | null = newsClone.querySelector('.news__meta-author');
        if (newsMetaAuthor) {
            const author: string = item.author || item.source.name;
            newsMetaAuthor.textContent = author;
        }

        const newsMetaDate: Element | null = newsClone.querySelector('.news__meta-date');
        if (newsMetaDate) {
            newsMetaDate.textContent = this.formatDate(item.publishedAt);
        }

        const newsDescriptionTitle: Element | null = newsClone.querySelector('.news__description-title');
        if (newsDescriptionTitle) {
            newsDescriptionTitle.textContent = item.title;
        }

        const newsDescriptionSource: Element | null = newsClone.querySelector('.news__description-source');
        if (newsDescriptionSource) {
            newsDescriptionSource.textContent = item.source.name;
        }

        const newsDescriptionContent: Element | null = newsClone.querySelector('.news__description-content');
        if (newsDescriptionContent) {
            newsDescriptionContent.textContent = item.description;
        }

        const newsReadMore: Element | null = newsClone.querySelector('.news__read-more a');
        if (newsReadMore) {
            newsReadMore.setAttribute('href', item.url);
        }
    }

    private formatDate(publishedAt: string): string {
        const isoDate: string = publishedAt.slice(0, 10);
        const [year, month, day]: DateParts = isoDate.split('-') as DateParts;
        return `${day}-${month}-${year}`;
    }

    private render(fragment: DocumentFragment, count: number): void {
        const newsDoc: Element | null = document.querySelector('.news');
        if (newsDoc) {
            newsDoc.innerHTML = '';
            newsDoc.appendChild(fragment);
        }

        const isEmpty: boolean = count === 0;
        if (isEmpty) {
            const messageNoNews: HTMLDivElement = document.createElement('div');
            messageNoNews.className = 'news_message';
            newsDoc?.appendChild(messageNoNews);
            messageNoNews.textContent = 'There are no news. Select another source.';
        }
    }
}

export default News;
