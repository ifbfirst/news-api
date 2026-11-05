import './sources.css';
class Sources {
    draw(data) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = sourceItemTemp.content.cloneNode(true);
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
        if (sourcesDoc)
            sourcesDoc.append(fragment);
    }
    drawSort() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const sourcesFilter = document.querySelector('.sources_filter');
        for (let i = 0; i < alphabet.length; i = i + 1) {
            const char = document.createElement('div');
            char.className = 'filter__item';
            char.textContent = alphabet[i];
            sourcesFilter === null || sourcesFilter === void 0 ? void 0 : sourcesFilter.appendChild(char);
        }
        const sources = document.querySelector('.sources');
        if (sourcesFilter) {
            sourcesFilter.onclick = function (event) {
                const messageNoSources = document.querySelector('.sources_message');
                if (messageNoSources !== null) {
                    messageNoSources.remove();
                }
                const news = document.querySelector('.news');
                while (news === null || news === void 0 ? void 0 : news.firstChild) {
                    news.removeChild(news.firstChild);
                }
                const target = event.target;
                const button = target.closest('.filter__item');
                if (button !== null && button.textContent !== null) {
                    const letter = button.textContent.toLowerCase();
                    const sourcesItems = Array.from(document.querySelectorAll('.source__item'));
                    const filterSourcesItems = sourcesItems.filter((element) => {
                        var _a;
                        element.style.display = 'none';
                        const id = (_a = element.getAttribute('data-source-id')) === null || _a === void 0 ? void 0 : _a.toString();
                        if (id) {
                            return id[0] === letter;
                        }
                        else {
                            return false;
                        }
                    });
                    if (filterSourcesItems.length === 0) {
                        const messageNoSources = document.createElement('div');
                        messageNoSources.className = 'sources_message';
                        sources === null || sources === void 0 ? void 0 : sources.appendChild(messageNoSources);
                        messageNoSources.textContent = `There are no news sources starting with the letter ${letter.toUpperCase()}. Select another letter.`;
                    }
                    filterSourcesItems.forEach((element) => {
                        element.style.display = 'block';
                    });
                }
            };
        }
    }
}
export default Sources;
