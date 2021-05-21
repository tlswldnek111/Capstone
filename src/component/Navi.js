import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Route, Switch, withRouter } from 'react-router-dom';
import Testgrid from './Testgrid';
import Register from './Register';
import FindID from './FindID';
import FindPW from './FindPW';
import Login from './Login';
import Dashboard from './Dashboard';
import Live from './Live';
import Mypage from './Mypage';
import Noticeboard from './Noticeboard';
import Write from './Write';
import Vod from './Vod';
import Vod_upload from './Vod_upload';

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
                <AppBar  value="true" color="white">  
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/noticeboard" component={Noticeboard} />
                    <Route exact path="/login" component={Login} history={this.props.history} />
                    <Route exact path="/register" component={Register} history={this.props.history}/> 
                    <Route exact path="/findID" component={FindID} history={this.props.history}/> 
                    <Route exact path="/findPW" component={FindPW} history={this.props.history}/> 
                    <Route exact path="/live" component={Live} />
                    <Route exact path="/mypage" component={Mypage} history={this.props.history}/>
                    <Route exact path="/write" component={Write} />
                    <Route exact path="/vod" component={Vod} />
                    <Route exact path="/grid" component={Testgrid} />
                    <Route exact path="/vod_upload" component={Vod_upload} />
                </Switch>
                </AppBar>
               
            </div>
        );
    };
}

export default withRouter(Navi);