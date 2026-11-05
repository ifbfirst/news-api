import { ArticlesResponse, Callback, SourcesResponse } from '../../types';

import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import './preloader.css';

class App {
    private controller: AppController;
    private view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources: Element | null = document.querySelector('.sources');

        if (sources) {
            sources.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, (data?: ArticlesResponse) => this.view.drawNews(data));
            });
        }

        const onSources: Callback<SourcesResponse> = (data?: SourcesResponse) => this.view.drawSources(data);
        this.controller.getSources(onSources);
        this.view.drawSourcesSort();
    }
}

export default App;
