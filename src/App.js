import React, {Component} from 'react';
import './App.css';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import RealTimeLineChart from './components/RealTimeLineChart';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawer: false,
    }
  }
  handleToggleDrawer = () => this.setState({
    openDrawer: !this.state.openDrawer
  });

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router>
          <div className="App">
            <AppBar
              title={
                <Link to="/">D3 Playground</Link>
              }
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={this.handleToggleDrawer}
            />
            <Drawer
              open={this.state.openDrawer}
              docked={false}
              onRequestChange={(openDrawer) => this.setState({openDrawer})}
            >
              <MenuItem
                containerElement={<Link to="/real-time-line-chart" />}
              >Real Time Line Chart</MenuItem>
            </Drawer>

            <Route exact path="/" component={Home} />
            <Route path="/real-time-line-chart" component={RealTimeLineChart} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
