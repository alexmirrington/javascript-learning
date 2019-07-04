class ItemList {

    constructor(root, persist=true) {
        this.root = root
        this.items = [];
        this.persist = persist;
        this.idCursor = 0;

        this.load();
    }

    addItem(text) {
        if (text === '') {
            return;
        }

        // Add to DOM
        let itemNode = document.createElement('div');
        itemNode.className = 'list-item';

        let itemText = document.createElement('p');
        itemText.innerText = text;

        let itemRemoveButton = document.createElement('button');
        itemRemoveButton.innerText = 'Remove';

        itemNode.appendChild(itemText);
        itemNode.appendChild(itemRemoveButton);

        this.root.appendChild(itemNode);

        // Add to list
        let addedItem = {
            id: this.idCursor,
            elem: itemNode
        }

        this.items.push(addedItem);

        // Register callbacks
        itemRemoveButton.onclick = event => this.removeItem(addedItem);

        if (this.persist) {
            this.save();
        }

        this.idCursor++;
    }

    removeItem(item) {
        let idx = this.items.findIndex(i => item.id === i.id);
        if (idx === -1) {
            return;
        }
        this.items.splice(idx, 1);
        item.elem.remove();

        if (this.persist) {
            this.save();
        }
    }

    save() {
        if (localStorageAvailable()) {
            let toSave = this.items.map(item => {
                return {
                    value: item.elem.querySelector('p').innerText
                };
            });
            localStorage.setItem('items', JSON.stringify(toSave));
        }
    }

    load() {
        if (localStorageAvailable()) {
            let data = localStorage.getItem('items');
            if (data !== null) {
                let toLoad = JSON.parse(data);
                toLoad.forEach(element => {
                    this.addItem(element.value);
                });
            }
        }
    }
}

function localStorageAvailable() {
    let testStr = '__test__';
    try {
        localStorage.setItem(testStr, testStr);
        localStorage.removeItem(testStr);
        return true;
    } catch(e) {
        return false;
    }
}

let listElem = document.querySelector('#list');
let itemButton = document.querySelector('#form-add-item-submit');

let list = new ItemList(listElem);

itemButton.onclick = event => {
    event.preventDefault();
    let form = event.target.form;
    let ipt = form.querySelector('#input-item');
    let itemText = ipt.value;
    ipt.value = '';
    list.addItem(itemText);
}

