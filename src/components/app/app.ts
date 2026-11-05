import { SourcesResponse } from '../../types';
import { ArticlesResponse } from '../../types';

import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources');
        if (sources) {
            sources.addEventListener('click', (e) =>
                this.controller.getNews(e, (data?: ArticlesResponse) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data?: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
