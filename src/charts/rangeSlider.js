import * as d3 from 'd3';
// API of function is only id, opts
// Use of the slider should require zero knowledge of d3
const createAxis = (opts) => {
    let scale = d3.scaleLinear()
                    .domain(opts.axisDomain)
                    .range(opts.axisRange);

    let axis = d3.axisBottom(scale);
    axis.ticks(opts.ticks)
        .tickFormat(d3.timeFormat("%I:%M:%S"));
    return axis;
};

export default (id, inputOpts) => {
    let el = document.getElementById(id);
    if (el === null) { throw `Input id does not correspond to an element in the document`; }
    // Default options
    inputOpts = inputOpts || {};
    let opts = {
        onRangeChange: inputOpts.onRangeChange || function() {},
        width: inputOpts.width || el.offsetWidth,
        height: inputOpts.height || el.offsetHeight,
        handleDomain: inputOpts.handleDomain || [45, 55],
        axisDomain: inputOpts.axisDomain || [0, 100],
        axisRange: inputOpts.axisRange || [30, el.offsetWidth - 30],
        ticks: inputOpts.ticks || 10,
        theme: inputOpts.theme || {
            handles: '#539DDB',
            body: '#C6E5F3'
        }
    };


    let rangeSlider = d3.select(`#${id}`).append('svg')
        .attr('class', 'rangeSlider')
        .attr('width', opts.width)
        .attr('height', opts.height);
    
     let scale = d3.scaleLinear()
                    .domain(opts.axisDomain)
                    .range(opts.axisRange);

    let drag = function(d, i) {
        let entity = d3.select(this),
            handleLeft = d3.select('#handleLeft'),
            handleBody = d3.select('#handleBody'),        
            handleRight = d3.select('#handleRight'),
            leftX = Number(handleLeft.attr('x')),
            leftXPrime = leftX + d3.event.dx,
            rightX = Number(handleRight.attr('x')),
            rightXPrime = rightX + d3.event.dx;
        switch(entity.attr('id')) {
            case 'handleLeft':
                if (leftXPrime >= opts.axisRange[0] && leftXPrime < rightX - 6) {
                    handleLeft
                        .attr('x', leftXPrime);
                    handleBody
                        .attr('x', Number(handleBody.attr('x')) + d3.event.dx)
                        .attr('width', Number(handleBody.attr('width')) - d3.event.dx);
                    opts.onRangeChange([scale.invert(leftXPrime), scale.invert(rightX)]);
                }                
            break;
            case 'handleRight':
                if (rightXPrime <= opts.axisRange[1] && rightXPrime > leftX + 6) {
                    handleRight
                        .attr('x', rightXPrime);
                    handleBody
                        .attr('width', Number(handleBody.attr('width')) + d3.event.dx);
                    opts.onRangeChange([scale.invert(leftX), scale.invert(rightXPrime)]);
                }
            break;
            case 'handleBody':
                if (leftXPrime >= opts.axisRange[0] && rightXPrime <= opts.axisRange[1]) {
                    handleLeft
                        .attr('x', leftXPrime);
                    handleBody
                        .attr('x', Number(handleBody.attr('x')) + d3.event.dx);
                    handleRight
                        .attr('x', rightXPrime);
                    opts.onRangeChange([scale.invert(leftXPrime), scale.invert(rightXPrime)]);
                }
            break;
        }  
    };

    let sliderDrag = d3.drag()
                    .on('start', drag)
                    .on('drag', drag)
                    .on('end', drag);

    let leftSliderPos = scale(opts.handleDomain[0]);
    let rightSliderPos = scale(opts.handleDomain[1]);
    let sliderWidth = rightSliderPos - leftSliderPos;

    rangeSlider.append('a')
        .attr('xlink:href', '#')
        .append('rect')
            .attr('id', 'handleLeft')            
            .attr('x', leftSliderPos)
            .attr('height', 15)
            .attr('width', 5)
            .style('fill', opts.theme.handle)
            .attr('rx', 1)
            .attr('ry', 1)
            .call(sliderDrag);
    rangeSlider.append('a')
        .attr('xlink:href', '#')
        .append('rect')
            .attr('id', 'handleBody')          
            .attr('x', leftSliderPos + 5) // accounting for width of sliders
            .attr('height', 15)
            .attr('width', sliderWidth - 5)
            .style('fill', opts.theme.body)
            .call(sliderDrag);
    rangeSlider.append('a')
        .attr('xlink:href', '#')
        .append('rect')
            .attr('id', 'handleRight')        
            .attr('x', rightSliderPos)
            .attr('height', 15)
            .attr('width', 5)
            .style('fill', opts.theme.handle)
            .attr('rx', 1)
            .attr('ry', 1)
            .call(sliderDrag);

    let axis = createAxis(opts);
    rangeSlider.append('g')
        .attr('id', 'sliderAxis')
        .call(axis)
        .attr('transform', 'translate(0,15)');
    
    rangeSlider.destroy = () => {
        rangeSlider.remove();
    };

    rangeSlider.update = (newOpts) => {
        
    };
    
    return rangeSlider;
};

