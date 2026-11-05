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

    drawSort() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const sourcesFilter = <HTMLElement>document.querySelector('.sources_filter');
        for (let i = 0; i < alphabet.length; i = i + 1) {
            const char = <HTMLElement>document.createElement('div');
            char.className = 'filter__item';
            char.textContent = alphabet[i];
            sourcesFilter?.appendChild(char);
        }
        if (sourcesFilter) {
            sourcesFilter.onclick = function (event: Event) {
                const target = <HTMLElement>event.target;
                const button = target.closest('.filter__item');
                if (button !== null && button.textContent !== null) {
                    const letter = button.textContent.toLowerCase();

                    const sourcesItems = Array.from(document.querySelectorAll<HTMLElement>('.source__item'));
                    const filterSourcesItems = sourcesItems.filter((element) => {
                        element.style.display = 'none';
                        const id = element.getAttribute('data-source-id')?.toString();
                        if (id) {
                            return id[0] === letter;
                        } else {
                            return false;
                        }
                    });
                    filterSourcesItems.forEach((element) => {
                        element.style.display = 'block';
                    });
                }
            };
        }
    }
}

export default Sources;
