import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TestGrid from './Testgrid'

class TabPanel extends React.Component {
    render() {
        return(
            <Typography component="div" hidden={this.props.value !== this.props.index}>
                <Box p={3}>{this.props.children}</Box>
            </Typography>
        );
    };
}

class TestTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    allyProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        };
    }

    handleChange = (event, newValue) => {
        this.setState( { value: newValue } );
    }

    render() {
        return(
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="item One" {...this.allyProps(0)}/>
                        <Tab label="item Two" {...this.allyProps(1)}/>
                        <Tab label="item Three" {...this.allyProps(2)}/>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <TestGrid></TestGrid>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    Item Three
                </TabPanel>
            </div>
        );
    };
}

export default TestTabs;