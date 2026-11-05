import { ArticleResponse, ArticlesResponse, SourceResponse, SourcesResponse, Status } from '../../types';

import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: ArticlesResponse): void {
        const isSuccess: boolean = data?.status === Status.Ok;
        const values: ArticleResponse[] = isSuccess && data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: SourcesResponse): void {
        const isSuccess: boolean = data?.status === Status.Ok;
        const values: SourceResponse[] = isSuccess && data?.sources ? data.sources : [];
        this.sources.draw(values);
    }

    public drawSourcesSort(): void {
        this.sources.drawSort();
    }
}

export default AppView;
