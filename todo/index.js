class ItemList {

    constructor(root) {
        this.root = root
        this.items = [];
        this.idCursor = 0;
    }

    addItem(text) {
        if (text === '') {
            return;
        }

        // Add to DOM
        let itemNode = document.createElement('div');
        itemNode.className = 'list-item';

        let itemText = document.createTextNode(text);

        let itemRemoveButton = document.createElement('button');
        itemRemoveButton.innerText = 'Remove'

        itemNode.appendChild(itemText);
        itemNode.appendChild(itemRemoveButton);

        this.root.appendChild(itemNode);

        // Add to list
        let addedItem = {
            id: this.idCursor,
            elem: itemNode
        }
        console.log(addedItem);
        console.log(this.items);

        this.items.push(addedItem);

        // Register callbacks
        itemRemoveButton.onclick = event => this.removeItem(addedItem);

        this.idCursor++;
    }

    removeItem(item) {
        console.log(item);
        console.log(this.items);
        let idx = this.items.findIndex(i => item.id === i.id);
        if (idx === -1) {
            return;
        }
        this.items.splice(idx, 1);
        item.elem.remove();
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

