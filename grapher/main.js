'use strict';

function main() {
    let graph = new Graph(400, 225);
    graph.setMount(document.querySelector('#mount'));
    graph.render();
}

class Graph {

    constructor(width, height) {
        this.mount = null;
        this.root = null;

        this.width = width;
        this.height = height;
        
        // TODO: Decide on data format and accept actual data in params
        this.data = Array.from(
            {length: 25}, () => Math.random()
        );
    }

    setMount(node) {
        // TODO: manage unmounting
        this.mount = node;
    }

    render() {
        this.root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.root.setAttribute('width', this.width);
        this.root.setAttribute('height', this.height);

        // TODO: Axes

        // Columns
        // TODO: Data normalisation
        this.data.forEach((value, index) => {
            let col = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            let gap = 5;
            col.setAttribute('x', index * this.width / this.data.length + gap / 2.0);
            col.setAttribute('y', this.height * (1-value));
            col.setAttribute('width', this.width / this.data.length - gap);
            col.setAttribute('height', value * this.height); // Assumes normalised data
            col.setAttribute('style', 'fill:rgb(240,240,240);');
            this.root.appendChild(col);
        });

        this.mount.appendChild(this.root);
    }

}

main();