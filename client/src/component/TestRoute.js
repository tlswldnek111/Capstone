import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import Test from './Test';
import Testgrid from './Testgrid';
import TestLogin from './TestLogin';
import App from '../App';

class Page404 extends React.Component {
    render() {
        return(
            <div>404</div>
        );
    }
}

class TestRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event, newValue) => {
        this.setState( { value: newValue } );
    }

    render() {
        return(
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        <Tab label="item One" component={Link} to="/" />
                        <Tab label="login" component={Link} to="/login"/>
                        <Tab label="grid" component={Link} to="/grid"/>
                        <Tab label="test" component={Link} to="/test"/>
                    </Tabs>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={TestLogin} />
                    <Route exact path="/grid" component={Testgrid} />
                    <Route exact path="/test" component={Test} />
                    <Route component={Page404}/>
                </Switch>
            </div>
        );
    };
}

export default TestRoute;