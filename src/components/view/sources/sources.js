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
        const sourcesDoc = document.querySelector('.sources');
        if (sourcesDoc)
            sourcesDoc.append(fragment);
    }
}
export default Sources;
