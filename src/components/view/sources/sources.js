import './sources.css';
class Sources {
    draw(data) {
        var _a;
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = sourceItemTemp.content.cloneNode(true);
                if (sourceClone) {
                    const sourceItemName = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) {
                        sourceItemName.textContent = item.source.name;
                    }
                    const sourceItem = sourceClone.querySelector('.source__item');
                    if (sourceItem) {
                        sourceItem.setAttribute('data-source-id', item.source.id);
                    }
                    fragment.append(sourceClone);
                }
            }
        });
        (_a = document.querySelector('.sources')) === null || _a === void 0 ? void 0 : _a.append(fragment);
    }
}
export default Sources;
