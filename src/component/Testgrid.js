import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        textAlign: 'center',
    },
};

class Testgrid extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item1</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item2</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item4</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item5</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item6</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>item7</Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Testgrid);