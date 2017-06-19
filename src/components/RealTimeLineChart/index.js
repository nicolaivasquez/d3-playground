import React, { Component } from 'react';
import LineChart from './components/LineChart/index';

const data = [{"x":3,"y":39},{"x":5,"y":39},{"x":12,"y":40},{"x":23,"y":21},{"x":40,"y":29},{"x":47,"y":25},{"x":48,"y":26},{"x":49,"y":37},{"x":49,"y":29},{"x":50,"y":21}];

class RealTimeLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
    }

    setInterval(() => {
      const newData = [...Array(10)]
        .map((_, i) => ({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 40) + 20,
        }));
      this.setState({
        data: newData.sort((a, b) => a.x - b.x),
      });
    }, 5000);
  }

  render() {
    return (
      <div>
        <h1>Real Time Line Chart</h1>
        <div className="chart">
          <LineChart
            data={this.state.data}
          />
        </div>
      </div>
    );
  }
}

export default RealTimeLineChart;
