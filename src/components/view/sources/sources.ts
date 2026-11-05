import { SourceResponse } from '../../../types';
import './sources.css';

class Sources {
    public draw(data: SourceResponse[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: SourceResponse) => {
            const sourceClone: HTMLElement | null = this.cloneTemplate(sourceItemTemp);
            if (!sourceClone) {
                return;
            }

            this.fillSource(sourceClone, item);
            fragment.append(sourceClone);
        });

        const sourcesDoc: Element | null = document.querySelector('.sources');
        if (sourcesDoc) {
            sourcesDoc.append(fragment);
        }
    }

    public drawSort(): void {
        const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const sourcesFilter: HTMLElement | null = document.querySelector('.sources_filter');

        for (let i = 0; i < alphabet.length; i += 1) {
            const char: HTMLDivElement = document.createElement('div');
            char.className = 'filter__item';
            char.textContent = alphabet[i];
            sourcesFilter?.appendChild(char);
        }

        if (sourcesFilter) {
            sourcesFilter.onclick = (event: Event): void => {
                this.filterByLetter(event);
            };
        }
    }

    private cloneTemplate(template: HTMLTemplateElement | null): HTMLElement | null {
        if (!template) {
            return null;
        }

        return template.content.cloneNode(true) as HTMLElement;
    }

    private fillSource(sourceClone: HTMLElement, item: SourceResponse): void {
        const sourceItemName: Element | null = sourceClone.querySelector('.source__item-name');
        if (sourceItemName) {
            sourceItemName.textContent = item.name;
        }

        const sourceItem: Element | null = sourceClone.querySelector('.source__item');
        if (sourceItem && item.id) {
            sourceItem.setAttribute('data-source-id', item.id);
        }
    }

    private filterByLetter(event: Event): void {
        const currentMessage: Element | null = document.querySelector('.sources_message');
        if (currentMessage !== null) {
            currentMessage.remove();
        }

        const news: Element | null = document.querySelector('.news');
        while (news?.firstChild) {
            news.removeChild(news.firstChild);
        }

        const target: HTMLElement = event.target as HTMLElement;
        const button: Element | null = target.closest('.filter__item');
        if (button === null || button.textContent === null) {
            return;
        }

        const letter: string = button.textContent.toLowerCase();
        const sourcesItems: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>('.source__item'));
        const matchedSources: HTMLElement[] = sourcesItems.filter((element: HTMLElement) => {
            element.style.display = 'none';
            const id: string | undefined = element.getAttribute('data-source-id')?.toString();
            if (id) {
                return id[0] === letter;
            }
            return false;
        });

        const hasMatches: boolean = matchedSources.length > 0;
        if (!hasMatches) {
            this.showEmptyMessage(letter);
        }

        matchedSources.forEach((element: HTMLElement) => {
            element.style.display = 'block';
        });
    }

    private showEmptyMessage(letter: string): void {
        const sources: Element | null = document.querySelector('.sources');
        const messageNoSources: HTMLDivElement = document.createElement('div');
        messageNoSources.className = 'sources_message';
        sources?.appendChild(messageNoSources);
        messageNoSources.textContent = `There are no news sources starting with the letter ${letter.toUpperCase()}. Select another letter.`;
    }
}

export default Sources;
