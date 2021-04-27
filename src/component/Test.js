import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        boderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '10px'
    },
};

class Test extends React.Component {
    render() {
        const {classes} = this.props;
        return(
            <div>
                <Box p={2} m={1}>
                    <Button variant='contained' color="primary">Button 1</Button>
                </Box>
                <Box color="primary.main" p={2} m={1}>
                    <Button variant='contained'>Button 2</Button>
                </Box>
                <Box clone className={classes.root} p={2} m={1}>
                    <Button variant='contained'>Button 3</Button>
                </Box>
                <Box component="span" p={2} m={1}>
                    <Button variant='contained'>Button 4</Button>
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(Test);