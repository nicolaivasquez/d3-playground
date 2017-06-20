import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import realTime from './realTime';

class LineChart extends Component {
  componentDidMount = () => {
    this.createLineChart(this.props.data);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) {
      this.createLineChart(nextProps.data);
    }
  }

  createLineChart = (data) => {
    const svg = d3.select('#line-chart');
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = +this.props.width - margin.left - margin.right;
    const height = +this.props.height - margin.top - margin.bottom;

    svg
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    let g;

    if (svg.select('.line-graph').empty()) {
      g = svg.append('g')
        .attr('class', 'line-graph')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    } else {
      g = svg.select('.line-graph');
    }

    let defs;
    if (g.select('defs').empty()) {
      defs = g.append('defs');
      defs.append('clipPath')
        .attr('id', 'drawable')
        .append('rect')
        .attr('width', width)
        .attr('height', height);
    }

    let x;
    if (this.props.timeChart) {
      x = d3.scaleTime()
        .rangeRound([0, width]);
    } else {
      x = d3.scaleLinear()
        .rangeRound([0, width]);
    }

    const y = d3.scaleLinear()
      .rangeRound([height, 0]);
    const line = d3.line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    if (this.props.timeChart) {
      x.domain([data[data.length - 1].x - 51000, data[data.length - 1].x - 1000]);
    } else {
      x.domain(d3.extent(data, (d) => d.x));
    }
    y.domain(d3.extent(data, (d) => d.y));

    g.selectAll('.axis').remove();

    let xAxis;
    if (this.props.timeChart) {
      xAxis = d3.axisBottom(x)
        .ticks(10)
        .tickFormat(d3.timeFormat('%H:%M:%S'))
    } else {
      xAxis = d3.axisBottom(x);
    }

    g.append("g")
      .attr('class', 'x axis')
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .select(".domain")
      .remove();

    g.append("g")
      .attr('class', 'y axis')
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    let path;
    if (g.select('.line').empty()) {
      path = g
        .append('g')
        .attr('clip-path', 'url(#drawable)')
        .append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('clip-path', 'url(#drawable)')
        .attr('d', line);
    } else {
      path = g.select('.line');

      const lastTwo = data.slice(-2);
      const diff = x(lastTwo[0].x) - x(lastTwo[1].x);

      path
        .data([data])
        .attr('d', line)
        .attr('transform', null)
        .transition()
        .ease(d3.easeLinear)
        .attr('transform', `translate(${diff})`)

      console.log(line(data));
    }
  }

  render() {
    return (
      <svg id="line-chart"></svg>
    );
  }
}

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.any,
      y: PropTypes.number,
    })
  ).isRequired,
  timeChart: PropTypes.bool,
}

LineChart.defaultProps = {
  width: 960,
  height: 500,
  timeChart: false,
}

const LineChartInRealTime = realTime(LineChart);

export {
  LineChart,
  LineChartInRealTime,
};
