import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Route, Switch } from 'react-router-dom';
import Test from './Test';
import Testgrid from './Testgrid';
import Register from './Register';
import Login from './Login';
import Home from './Home';
class Page404 extends React.Component {
    render() {
        return(
            <div>404</div>
        );
    }
}

class Navi extends React.Component {
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
                        <Tab label="home" component={Link} to="/" />
                        <Tab label="login" component={Link} to="/login"/>
                        <Tab label="grid" component={Link} to="/grid"/>
                        <Tab label="test" component={Link} to="/test"/>
                    </Tabs>
                </AppBar>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/grid" component={Testgrid} />
                    <Route exact path="/test" component={Test} />
                    <Route component={Page404}/>
                </Switch>

                <AppBar  value="true" color="white">  
                <Switch>
                    <Route exact path="/register" component={Register} /> 
                   
                </Switch>
                </AppBar>
               
            </div>
        );
    };
}

export default Navi;