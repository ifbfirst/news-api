import { SourceResponse } from '../../../types';
import './sources.css';

class Sources {
    draw(data: SourceResponse[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: SourceResponse) => {
            if (sourceItemTemp) {
                const sourceClone: Element | null = <HTMLElement>sourceItemTemp.content.cloneNode(true);
                if (sourceClone) {
                    const sourceItemName = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) {
                        sourceItemName.textContent = item.name;
                    }
                    const sourceItem = sourceClone.querySelector('.source__item');
                    if (sourceItem && item.id) {
                        sourceItem.setAttribute('data-source-id', item.id);
                    }

                    fragment.append(sourceClone);
                }
            }
        });

        const sourcesDoc = document.querySelector('.sources');
        if (sourcesDoc) sourcesDoc.append(fragment);
    }

    // drawSort() {
    //     const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //     const sourcesFilter = document.querySelector('.sources_filter');
    //     for (let i = 0; i < alphabet.length; i = i + 1) {
    //         const char = <HTMLElement>document.createElement('div');
    //         char.className = 'filter__item';
    //         char.textContent = alphabet[i];
    //         sourcesFilter?.appendChild(char);
    //     }
    // }
}

export default Sources;
