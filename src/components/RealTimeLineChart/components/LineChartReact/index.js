import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import realTime from '../LineChart/realTime';

class LinePath extends Component {
  render() {
    return (
      <g>
        <defs>
          <clipPath id="drawable-react">
            <rect
              width={this.props.width}
              height={this.props.height}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#drawable-react)">
          <path
            className="line"
            fill="none"
            stroke="steelblue"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={1.5}
            d={this.props.d}
          />
        </g>
      </g>
    );
  }
}

class LineChartReact extends Component {
  constructor(props) {
    super(props);

    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    this.state = {
      margin,
      width: +this.props.width - margin.left - margin.right,
      height: +this.props.height - margin.top - margin.bottom,
    }
  }

  componentDidMount = () => {
    this.createLineChartReact(this.props.data);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) {
      this.createLineChartReact(nextProps.data);
    }
  }

  x = (width) => d3.scaleTime()
    .rangeRound([0, width])
    .domain([
      this.props.data[this.props.data.length - 1].x - 51000,
      this.props.data[this.props.data.length - 1].x - 1000
    ]);

  y = (height) => d3.scaleLinear()
    .rangeRound([height, 0])
    .domain(d3.extent(this.props.data, (d) => d.y));

  line = d3.line()
      .x((d) => this.x(this.state.width)(d.x))
      .y((d) => this.y(this.state.height)(d.y));

  createLineChartReact = (data) => {
    const svg = d3.select('#line-chart-react');
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = +this.props.width - margin.left - margin.right;
    const height = +this.props.height - margin.top - margin.bottom;

    svg
      .attr('width', this.props.width)
      .attr('height', this.props.height);

    const g = svg.select('.line-graph');

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
  }

  render() {
    return (
      <svg id="line-chart-react">
        <g
          className="line-graph"
          transform={`translate(${this.state.margin.left},${this.state.margin.top})`}
        >
          <LinePath
            width={this.state.width}
            height={this.state.height}
            d={this.line(this.props.data)}
          />
        </g>
      </svg>
    );
  }
}

LineChartReact.propTypes = {
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

LineChartReact.defaultProps = {
  width: 960,
  height: 500,
  timeChart: false,
}

const LineChartReactInRealTime = realTime(LineChartReact);

export {
  LineChartReact,
  LineChartReactInRealTime,
};
