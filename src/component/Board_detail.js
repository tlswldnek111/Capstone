import React from 'react'
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import Comment from './Comment';
import Header2 from './Header2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ipconfig from '../config/ipConfig';

class Board_detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IDX: '',
            REPLY: [],
            Writer: ''
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillUnmount() {
        window.location.reload();
    }

    componentDidMount() {
        document.getElementById('CONTENT').setAttribute('style', 'color: black;');
        this.setState({IDX: String(this.props.location.search).replace('?idx=', '')});
        fetch(`http://${ipconfig.ExternalIp}:3001/board/update_views`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IDX: String(this.props.location.search).replace('?idx=', '')
            })
        })
        fetch(`http://${ipconfig.ExternalIp}:3001/board/select`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IDX: String(this.props.location.search).replace('?idx=', '')
            })
        })
        .then(res=>res.json())
        .then(res=>{
            document.getElementById('TITLE').value = res[0].TITLE;
            document.getElementById('ID').value = res[0].ID;
            document.getElementById('CONTENT').value = res[0].CONTENT;
            this.setState({Writer: res[0].ID});
        })
        .then(()=>{
            fetch(`http://${ipconfig.ExternalIp}:3001/board/select_reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    B_IDX: String(this.props.location.search).replace('?idx=', '')
                })
            })
            .then(res=>res.json())
            .then(res=>{
                const temp = []
                for (let i = 0; i < res.length; i++) {
                    temp.push(
                    <div style={{marginTop: "30px"}}>
                        <span style={{float: "left"}}>{res[i].ID}</span>
                        <span style={{float: "right"}}>{res[i].REP_DATE}</span>
                        <br></br>
                        <div>
                            <Input
                            id={'content' + i}
                            style={{float: "left", color: "black"}}
                            disabled={true}
                            disableUnderline 
                            defaultValue={res[i].CONTENT}/>
                            <span style={{float: "right"}}>
                                <button
                                hidden={!((localStorage.getItem('id') === res[i].ID) ||
                                (localStorage.getItem('id') === 'admin'))}
                                onClick={(e)=>{
                                    const input = document.getElementById('content' + i);
                                    if (input.disabled === true) {
                                        input.disabled = false;
                                        input.setAttribute('style', 'color: blue;')
                                        input.focus();
                                        e.target.textContent = '수정완료';
                                    } else {
                                        input.disabled = true;
                                        input.setAttribute('style', 'color: black;')
                                        e.target.textContent = '수정';
                                        fetch(`http://${ipconfig.ExternalIp}:3001/board/update_reply`, {
                                            method: 'POST',
                                            headers: {
                                            'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                            IDX: res[i].IDX,
                                            CONTENT: input.value
                                            })
                                        })
                                        .then(res=>res.json())
                                        .then(res=>{
                                            if (res.success == 1) {
                                                alert('정상적으로 수정되었습니다.');
                                            } else {
                                                alert('수정에 실패했습니다.');
                                            }
                                        })
                                    }
                                }}>
                                    수정
                                </button>
                                <button
                                hidden={!((localStorage.getItem('id') === res[i].ID) ||
                                (localStorage.getItem('id') === 'admin'))}
                                onClick={(e)=>{
                                    if(window.confirm('삭제하시겠습니까?')) {
                                        fetch(`http://${ipconfig.ExternalIp}:3001/board/delete_reply`, {
                                            method: 'POST',
                                            headers: {
                                            'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                            IDX: res[i].IDX
                                            })
                                        })
                                        .then(res=>res.json())
                                        .then(res=>{
                                            if (res.success == 1) {
                                                alert('정상적으로 삭제되었습니다.');
                                                window.location.reload();
                                            } else {
                                                alert('삭제에 실패했습니다.');
                                            }
                                        })
                                    }
                                }}>
                                    삭제
                                </button>
                            </span>
                        </div>
                        <br></br>
                        <br></br>
                        <hr></hr>
                    </div>);
                }
                this.setState({REPLY: temp});
            })
        })
    }

    handleUpdate(e) {
        const input_TITLE = document.getElementById('TITLE');
        const input_CONTENT = document.getElementById('CONTENT');
        if (input_TITLE.disabled === true) {
            input_TITLE.disabled = false;
            input_TITLE.setAttribute('style', 'color: blue;')
            input_CONTENT.disabled = false;
            input_CONTENT.setAttribute('style', 'color: blue;')
            input_CONTENT.focus();
            e.target.textContent = '수정완료';
        } else {
            const TITLE = input_TITLE.value;
            const CONTENT = input_CONTENT.value;
            fetch(`http://${ipconfig.ExternalIp}:3001/board/update`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                IDX: this.state.IDX,
                TITLE: TITLE,
                CONTENT: CONTENT
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if (res.success === 1) {
                    e.target.textContent = '수정';
                    input_TITLE.disabled = true;
                    input_TITLE.setAttribute('style', 'color: black;')
                    input_CONTENT.disabled = true;
                    input_CONTENT.setAttribute('style', 'color: black;')
                    alert('수정되었습니다.');
                } else {
                    alert('수정에 실패했습니다.');
                    window.location.reload();
                }
            })
        }
    }

    handleDelete(e) {
        if (window.confirm('삭제하시겠습니까?')) {
            fetch(`http://${ipconfig.ExternalIp}:3001/board/delete`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                IDX: this.state.IDX,
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.success === 1) {
                    alert('삭제되었습니다.')
                    this.props.history.push('noticeboard');
                } else {
                    alert('삭제에 실패했습니다.')
                }
            })
        }
    }

    render() {
        return (
            <div style={{height: "100vh", overflowY: "scroll"}}>
                <Header2></Header2>
                <center>
                    <Card style={{width: "800px", marginTop: "90px"}} variant="outlined">
                        <CardContent>
                            <p>
                                <Input
                                id="TITLE"
                                style={{width: "700px", color: "black"}}
                                defaultValue="제목 들어갈 곳"
                                disabled
                                disableUnderline/>
                            </p>
                            <hr style={{width: "700px"}}></hr>
                            <Input
                            id="ID"
                            style={{width: "700px", color: "black"}}
                            disabled
                            disableUnderline/>
                            <hr style={{width: "700px"}}></hr>
                            <TextField
                            id="CONTENT"
                            style={{width: "700px"}}
                            multiline rows={25}
                            rowsMax={25}
                            variant="outlined"
                            disabled
                            />
                        </CardContent>
                    </Card>
                    <div style={{width: "800px", textAlign: "right"}}>
                        <button
                        hidden={!((localStorage.getItem('id') === 
                        this.state.Writer) ||
                        (localStorage.getItem('id') === 'admin'))}
                        onClick={this.handleUpdate}>
                            수정
                        </button>
                        <button
                        hidden={!((localStorage.getItem('id') === 
                        this.state.Writer) ||
                        (localStorage.getItem('id') === 'admin'))}
                        onClick={this.handleDelete}>
                            삭제
                        </button>
                        <button
                        onClick={()=>{
                            this.props.history.push('noticeboard');
                        }}>
                            목록
                        </button>
                    </div>
                    <Card style={{width: "800px", marginTop: 13}} variant="outlined">
                        <CardContent>
                            <p> </p>
                            <Typography variant="h7" style={{float: 'left'}}>
                                댓글
                            </Typography>
                            <Comment B_IDX={this.state.IDX} history={this.props.history}></Comment>
                            {this.state.REPLY.map((val)=>{
                                return val;
                            })}
                        </CardContent>
                    </Card>
                </center>
            </div>
        )
    }
}

export default Board_detail