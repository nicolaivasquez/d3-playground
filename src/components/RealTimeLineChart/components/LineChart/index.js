import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

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
    const x = d3.scaleLinear()
      .rangeRound([0, width]);
    const y = d3.scaleLinear()
      .rangeRound([height, 0]);
    const line = d3.line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    x.domain(d3.extent(data, (d) => d.x));
    y.domain(d3.extent(data, (d) => d.y));

    g.selectAll('.axis').remove();

    g.append("g")
      .attr('class', 'x axis')
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
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
      .attr("text-anchor", "end")
      .text("Price ($)");

    g.select('.line').remove();

    g.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
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
}

LineChart.defaultProps = {
  width: 960,
  height: 500,
}

export default LineChart;
