import React from 'react'
import Input from '@material-ui/core/Input';
  import TextField from '@material-ui/core/TextField';
  import { Typography } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Comment from './Comment';
import Header2 from './Header2';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'


class board_detail extends React.Component {

    render() {
        return (
            <div>
                <center>
                    <Card style={{width: 800, marginTop: 25}} variant="outlined">
                        <CardContent>
                            <p><Input style = {{width: 700}} defaultValue="제목 들어갈 곳" inputProps={{ 'aria-label': 'description' }} /></p>
                            <Grid>
                                <Grid item>
                                    <AccountCircle /> <Input defaultValue="작성자" inputProps={{ 'aria-label': 'description' }} />
                                </Grid>
                                <Grid item>
                                </Grid>
                            </Grid>
                            
                            <TextField style = {{width: 700}}
                                id="outlined-multiline-flexible"
                                label="내용"
                                multiline rows={25}
                                rowsMax={25}
                                variant="outlined"
                            />
                        </CardContent>
                    </Card>
                    <Card style={{width: 800, marginTop: 25}} variant="outlined">
                        <CardContent>
                            <p> </p>
                            <Typography variant="h7" style={{marginRight: "650px", maxWidth: '100px'}}>
                                댓글
                            </Typography>
                            <Comment></Comment>
                        </CardContent>
                    </Card>
                </center>
                
            </div>
        )
    }
}

export default board_detail