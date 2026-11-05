import { SourcesResponse } from '../../types';
import { ArticlesResponse } from '../../types';

import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import './preloader.css';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e) => {
                this.controller.getNews(e, (data?: ArticlesResponse) => this.view.drawNews(data));
                const preLoader = document.createElement('div');
                const news = <HTMLElement>document.querySelector('.news');
                news.appendChild(preLoader);
                preLoader.className = 'loader';
            });
        }
        this.controller.getSources((data?: SourcesResponse) => this.view.drawSources(data));
        this.view.drawSourcesSort();
    }
}

export default App;
