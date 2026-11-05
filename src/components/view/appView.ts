import { SourcesResponse } from '../../types';
import { ArticlesResponse } from '../../types';

import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: ArticlesResponse) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: SourcesResponse) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
    public drawSourcesSort() {
        this.sources.drawSort();
    }
}

export default AppView;
