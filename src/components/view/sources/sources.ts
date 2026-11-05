import { NewsSource } from '../../../types';
import './sources.css';

class Sources {
    draw(data: NewsSource[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: NewsSource) => {
            if (sourceItemTemp) {
                const sourceClone: Element | null = <HTMLElement>sourceItemTemp.content.cloneNode(true);
                if (sourceClone) {
                    const sourceItemName = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) {
                        sourceItemName.textContent = item.source.name;
                    }
                    const sourceItem = sourceClone.querySelector('.source__item');
                    if (sourceItem && item.source.id) {
                        sourceItem.setAttribute('data-source-id', item.source.id);
                    }

                    fragment.append(sourceClone);
                }
            }
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
