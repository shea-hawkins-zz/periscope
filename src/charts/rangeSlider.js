import * as d3 from 'd3';
// API of function is only id, opts
// Use of the slider should require zero knowledge of d3
const createAxis = (opts) => {
    let scale = d3.scaleLinear()
                    .domain(opts.axisDomain)
                    .range(opts.axisRange);

    let axis = d3.axisBottom(scale);
    axis.ticks(opts.ticks);
    return axis;
};

export default (id, inputOpts) => {
    let el = document.getElementById(id);
    if (el === null) { throw `Input id does not correspond to an element in the document`; }
    // Default options
    inputOpts = inputOpts || {};
    let opts = {
        onRangeChange: inputOpts.onRangeChange || function() {},
        onDrag: inputOpts.onDrag || function() {},
        width: inputOpts.width || el.offsetWidth,
        height: inputOpts.height || el.offsetHeight,
        handleDomain: inputOpts.handleDomain || [45, 55],
        axisDomain: inputOpts.axisDomain || [0, 100],
        axisRange: inputOpts.axisRange || [10, el.offsetWidth - 10],
        ticks: inputOpts.ticks || 10,
        theme: {}
    };


    let rangeSlider = d3.select(`#${id}`).append('svg')
        .attr('class', 'rangeSlider')
        .attr('width', opts.width)
        .attr('height', opts.height);
    
     let scale = d3.scaleLinear()
                    .domain(opts.axisDomain)
                    .range(opts.axisRange);

    let leftSliderPos = scale(opts.handleDomain[0]);
    let rightSliderPos = scale(opts.handleDomain[1]);
    let sliderWidth = rightSliderPos - leftSliderPos;

    let drag = function(d, i) {
        let entity = d3.select(this);
        let handleLeft = d3.select('#handleLeft');
        let handleBody = d3.select('#handleBody');        
        let handleRight = d3.select('#handleRight');
        switch(entity.attr('id')) {
            case 'handleLeft':
                handleLeft
                    .attr('x', Number(handleLeft.attr('x')) + d3.event.dx);
                handleBody
                    .attr('x', Number(handleBody.attr('x')) + d3.event.dx)
                    .attr('width', Number(handleBody.attr('width')) - d3.event.dx);
            break;
            case 'handleRight':
                handleRight
                    .attr('x', Number(handleRight.attr('x')) + d3.event.dx);
                handleBody
                    .attr('width', Number(handleBody.attr('width')) + d3.event.dx);
            break;
            case 'handleBody':
                handleLeft
                    .attr('x', Number(handleLeft.attr('x')) + d3.event.dx);
                handleBody
                    .attr('x', Number(handleBody.attr('x')) + d3.event.dx);
                handleRight
                    .attr('x', Number(handleRight.attr('x')) + d3.event.dx);

            break;
        }
    };

    let sliderDrag = d3.drag()
                        .on('start', drag)
                        .on('drag', drag)
                        .on('end', drag);

    rangeSlider.append('a')
        .attr('xlink:href', '#')
        .append('rect')
            .attr('id', 'handleLeft')            
            .attr('x', leftSliderPos)
            .attr('y', 10)
            .attr('height', 15)
            .attr('width', 5)
            .style('fill', 'green')
            .attr('rx', 1)
            .attr('ry', 1)
            .call(sliderDrag);
    rangeSlider.append('a')
        .attr('xlink:href', '#')
        .append('rect')
            .attr('id', 'handleBody')          
            .attr('x', leftSliderPos + 5) // accounting for width of sliders
            .attr('y', 10)
            .attr('height', 15)
            .attr('width', sliderWidth - 5)
            .style('fill', 'lightgreen')
            .call(sliderDrag);
    rangeSlider.append('a')
        .attr('xlink:href', '#')
        .append('rect')
            .attr('id', 'handleRight')        
            .attr('x', rightSliderPos)
            .attr('y', 10)
            .attr('height', 15)
            .attr('width', 5)
            .style('fill', 'green')
            .attr('rx', 1)
            .attr('ry', 1)
            .call(sliderDrag);

    let axis = createAxis(opts);
    rangeSlider.append('g')
        .call(axis);
    
    


    rangeSlider.update = (newOpts) => {
    
    };
    
    return rangeSlider;
};

