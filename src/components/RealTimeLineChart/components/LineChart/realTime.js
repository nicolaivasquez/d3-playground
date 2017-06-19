import React, { Component } from 'react';

const realTime = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: [{
          x: Date.now(),
          y: this.props.data,
        }]
      }
    }

    componentWillReceiveProps = (nextProps) => {
      const limit = this.props.limit || 50;
      if (nextProps.data) {
        const newData = this.state.data.concat([{
          x: Date.now(),
          y: nextProps.data,
        }]).slice(limit * -1);
        this.setState({
          data: newData,
        })
      }
    }

    render() {
      return (
        <WrappedComponent
          timeChart={true}
          {...this.props}
          data={this.state.data}
        />
      )
    }
  }
};

export default realTime;
