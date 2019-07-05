'use strict';

function main() {
    let data = {
        title: 'Weather',
        values: Array.from({length: 12}, () => Math.random()),
        axes: [
            {
                title: 'Month',
                labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            {
                title: 'Average temperature'
            }
        ]
    }
    let graph = new Graph(document.querySelector('#column-graph'), data);
    graph.render();
}

class Graph {

    constructor(root, data) {
        if (root === null || root.tagName !== 'svg') {
            this.root = null;
        } else {
            this.root = root;
        }

        this.data = data;
    }

    set width(val) {
        this.root.width.baseVal.value = val;
        this.render();
    }

    get width() {
        return this.root.width.baseVal.value;
    }

    set height(val) {
        this.root.height.baseVal.value = val;
        this.render();
    }

    get height() {
        return this.root.height.baseVal.value;
    }

    render() {

        // TOOD: Enable colour customisation
        // TODO: Data normalisation
        // TODO: move constants somewhere else
        let axisLabelAreaWidth = 50;
        let gap = 10

        // TODO: Axis titles
        let xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        xAxis.setAttribute('x', axisLabelAreaWidth);
        xAxis.setAttribute('y', this.height - axisLabelAreaWidth);
        xAxis.setAttribute('width', this.width - axisLabelAreaWidth);
        xAxis.setAttribute('height', axisLabelAreaWidth);

        let xAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xAxisLine.setAttribute('x1', '0%');
        xAxisLine.setAttribute('y1', '0%');
        xAxisLine.setAttribute('x2', '100%');
        xAxisLine.setAttribute('y2', '0%');
        xAxisLine.setAttribute('stroke', 'black');
        xAxis.appendChild(xAxisLine);

        this.data.axes[0].labels.forEach((value, index) => {
            let lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            let txt = document.createTextNode(value);
            lbl.appendChild(txt);
            lbl.setAttribute('x', index * xAxis.width.baseVal.value / this.data.values.length + gap / 2.0);
            lbl.setAttribute('y', '50%');
            const txtWidth = xAxis.width.baseVal.value / this.data.values.length - 20;
            const txtHeight = xAxis.height.baseVal.value;
            console.log(txtWidth, txtHeight);
            lbl.setAttribute('font-size', `${Math.min(txtWidth, txtHeight)}px`);
            lbl.setAttribute('dominant-baseline', 'central');

            xAxis.appendChild(lbl);
        });

        let yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        yAxis.setAttribute('x', 0);
        yAxis.setAttribute('y', 0);
        yAxis.setAttribute('width', axisLabelAreaWidth);
        yAxis.setAttribute('height', this.height - axisLabelAreaWidth);

        let yAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxisLine.setAttribute('x1', '100%');
        yAxisLine.setAttribute('y1', '0%');
        yAxisLine.setAttribute('x2', '100%');
        yAxisLine.setAttribute('y2', '100%');
        yAxisLine.setAttribute('stroke', 'black');
        yAxis.appendChild(yAxisLine);
        
        // Columns
        let columns = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        columns.setAttribute('x', axisLabelAreaWidth);
        columns.setAttribute('y', 0);
        columns.setAttribute('width', this.width - axisLabelAreaWidth);
        columns.setAttribute('height', this.height - axisLabelAreaWidth);

        this.data.values.forEach((value, index) => {
            let col = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            col.setAttribute('x', index * columns.width.baseVal.value / this.data.values.length + gap / 2.0);
            col.setAttribute('y', columns.height.baseVal.value * (1 - value));
            col.setAttribute('width', columns.width.baseVal.value / this.data.values.length - gap);
            col.setAttribute('height', value * columns.height.baseVal.value); // Assumes normalised data
            col.setAttribute('style', 'fill:rgb(240,240,240);');
            columns.appendChild(col);
        });

        this.root.appendChild(xAxis);
        this.root.appendChild(yAxis);
        this.root.appendChild(columns);

    }
}

main();