import React, { Component } from 'react';
import {
  LineChartInRealTime
} from './components/LineChart/index';
import {
  LineChartReactInRealTime
} from './components/LineChartReact/index';

class RealTimeLineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: Math.floor(Math.random() * 40) + 20,
    }

    setInterval(() => {
      this.setState({
        data: Math.floor(Math.random() * 40) + 20,
      })
    }, 1000);
  }

  render() {
    return (
      <div>
        <h1>Real Time Line Chart</h1>
        <div className="chart">
          <LineChartInRealTime
            data={this.state.data}
          />
          <LineChartReactInRealTime
            data={this.state.data}
          />
        </div>
      </div>
    );
  }
}

export default RealTimeLineChart;
