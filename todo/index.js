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

        this.items.push(new Item(this.idCursor, text));

        let itemNode = document.createElement('li');
        itemNode.innerText = text;
        itemNode.id = `list-item-${this.idCursor}`

        let itemRemoveButton = document.createElement('button');
        itemRemoveButton.innerText = 'Remove'
        itemRemoveButton.onclick = event => this.removeByID(this.idCursor);

        itemNode.appendChild(itemRemoveButton);
        this.root.appendChild(itemNode);

        this.idCursor++;

    }

    removeByID(id) {
        console.log('removed');
        let idx = this.items.findIndex(item => item.id === id);
        console.log(idx);
        if (idx === -1) {
            return;
        }
        this.items.splice(idx);        
        let elem = this.root.querySelector(`#list-item-${id}`);
        this.root.remove(elem);
    }

}

class Item {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

let listElem = document.querySelector('#list');
let itemButton = document.querySelector('#form-add-item-submit');

let list = new ItemList(listElem);

itemButton.onclick = event => {
    event.preventDefault();
    let form = event.target.form;
    let itemText = form.querySelector('#input-item').value;
    list.addItem(itemText);
}

