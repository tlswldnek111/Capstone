import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import {
    fade,
    ThemeProvider,
    withStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
  import InputBase from '@material-ui/core/InputBase';
  import InputLabel from '@material-ui/core/InputLabel';
  import TextField from '@material-ui/core/TextField';
  import FormControl from '@material-ui/core/FormControl';
  import { green } from '@material-ui/core/colors';
  import { Typography } from "@material-ui/core";

import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Comment from './Comment';
import Header2 from './Header2';



class board_detail extends React.Component {

    render() {
        return (
            <div>
                <center>
                    <p><Input style = {{width: 700}} defaultValue="제목 들어갈 곳" inputProps={{ 'aria-label': 'description' }} /></p>
                    <Grid>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                        <Input defaultValue="작성자" inputProps={{ 'aria-label': 'description' }} />
                        </Grid>
                    </Grid>
                    
                    <TextField style = {{width: 700}}
                        id="outlined-multiline-flexible"
                        label="내용"
                        multiline rows={25}
                        rowsMax={25}
                        variant="outlined"
                    />
                    <div>
                        <p> </p>
                        <Typography variant="h7" style={{marginRight: "650px", maxWidth: '100px'}}>
                            댓글
                        </Typography>

                    <Comment></Comment>

                </div>
                </center>
                
            </div>
        )
    }
}

export default board_detail