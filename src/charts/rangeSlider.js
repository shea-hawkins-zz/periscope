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

    rangeSlider.append("a")
        .attr("xlink:href", "http://en.wikipedia.org/wiki/")
        .append('rect')
            .attr("x", leftSliderPos)
            .attr("y", 10)
            .attr("height", 15)
            .attr("width", 5)
            .style("fill", "green")
            .attr("rx", 1)
            .attr("ry", 1);
    rangeSlider.append('a')
        .attr("xlink:href", "http://en.wikipedia.org/wiki/")
        .append("rect")  
            .attr("x", leftSliderPos + 5) // accounting for width of sliders
            .attr("y", 10)
            .attr("height", 15)
            .attr("width", sliderWidth - 5)
            .style("fill", "lightgreen");
    rangeSlider.append("a")
        .attr("xlink:href", "http://en.wikipedia.org/wiki/")
        .append('rect')
            .attr("x", rightSliderPos)
            .attr("y", 10)
            .attr("height", 15)
            .attr("width", 5)
            .style("fill", "green")
            .attr("rx", 1)
            .attr("ry", 1);

    let axis = createAxis(opts);
    rangeSlider.append('g')
        .call(axis);
    
    


    rangeSlider.update = (newOpts) => {
    
    };
    
    return rangeSlider;
};

