'use strict';

function main() {
    let data = {
        title: 'Weather',
        values: Array.from({length: 12}, () => Math.random()*0.001),
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

        console.log(this.data.values);
        /*
        +-----------------------------------+
        |               Title               |
        +-----------------------------------+
        |       |                           |
        |       |                           |
        |       |                           |
        | yAxis |           Graph           |
        |       |                           |
        |       |                           |
        |       |                           |
        |       +---------------------------+
        |       |           xAxis           |
        +-------+---------------------------+
        */

        // TOOD: Enable colour customisation
        // TODO: Data normalisation
        // TODO: move constants somewhere else
        let axisLabelAreaWidth = 50;
        let gap = 10

        // Determine scale
        let minVal = this.data.values.reduce((prev, curr) => {
            return curr < prev ? curr : prev;
        })
        let maxVal = this.data.values.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        })

        let pow = Math.floor(Math.log10(Math.abs(maxVal))) + 1;
        let increment = 10**(pow-1);

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
            lbl.setAttribute('x', (index+0.5) * xAxis.width.baseVal.value / this.data.values.length);
            lbl.setAttribute('y', '50%');
            const txtWidth = xAxis.width.baseVal.value / this.data.values.length - 20;
            const txtHeight = xAxis.height.baseVal.value;
            lbl.setAttribute('font-size', `${Math.min(txtWidth, txtHeight)}px`);
            lbl.setAttribute('dominant-baseline', 'central');
            lbl.setAttribute('text-anchor', 'middle');

            xAxis.appendChild(lbl);
        });

        let yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        yAxis.setAttribute('x', 0);
        yAxis.setAttribute('y', 0);
        yAxis.setAttribute('width', axisLabelAreaWidth);
        yAxis.setAttribute('height', this.height);


        let yAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yAxisLine.setAttribute('x1', '100%');
        yAxisLine.setAttribute('y1', '0%');
        yAxisLine.setAttribute('x2', '100%');
        yAxisLine.setAttribute('y2', yAxis.height.baseVal.value - axisLabelAreaWidth);
        yAxisLine.setAttribute('stroke', 'black');
        yAxis.appendChild(yAxisLine);

        console.log(maxVal)
        let ticks = [];
        for (let i = 0; i < maxVal; i = i + increment) {
            ticks.push(i);
        }
        console.log(ticks);

        ticks.forEach((value, index) => {
            let tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            tick.setAttribute('x1', '95%');
            tick.setAttribute('y1', (ticks.length - index) * (yAxis.height.baseVal.value - axisLabelAreaWidth) / ticks.length);
            tick.setAttribute('x2', '100%');
            tick.setAttribute('y2', (ticks.length - index) * (yAxis.height.baseVal.value - axisLabelAreaWidth) / ticks.length);
            tick.setAttribute('stroke', 'black');

            let lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            let txt = document.createTextNode(value.toFixed(Math.max(0, -(pow-1))));
            lbl.appendChild(txt);
            lbl.setAttribute('x', '90%');
            lbl.setAttribute('y', (ticks.length - index) * (yAxis.height.baseVal.value - axisLabelAreaWidth) / ticks.length);
            const txtWidth = 0.2*yAxis.width.baseVal.value;
            const txtHeight = yAxis.height.baseVal.value / (2.5 * ticks.length);
            lbl.setAttribute('font-size', `${Math.min(txtWidth, txtHeight)}px`);
            lbl.setAttribute('dominant-baseline', 'central');
            lbl.setAttribute('text-anchor', 'end');

            yAxis.appendChild(tick);
            yAxis.appendChild(lbl);
        });

        // Columns
        let columns = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        columns.setAttribute('x', axisLabelAreaWidth);
        columns.setAttribute('y', 0);
        columns.setAttribute('width', this.width - axisLabelAreaWidth);
        columns.setAttribute('height', this.height - axisLabelAreaWidth);

        this.data.values.forEach((value, index) => {
            let col = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            col.setAttribute('x', index * columns.width.baseVal.value / this.data.values.length + gap / 2.0);
            col.setAttribute('y', columns.height.baseVal.value * (1 - value/maxVal));
            col.setAttribute('width', columns.width.baseVal.value / this.data.values.length - gap);
            col.setAttribute('height', (value/maxVal) * columns.height.baseVal.value); // Assumes normalised data
            col.setAttribute('style', 'fill:rgb(240,240,240);');
            columns.appendChild(col);
        });

        this.root.appendChild(xAxis);
        this.root.appendChild(yAxis);
        this.root.appendChild(columns);

    }
}

main();