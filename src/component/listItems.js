import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Logout from './Logout';
import { Link } from "react-router-dom";
function Login(){
  
  if(localStorage.getItem('username')==null) //로그인 해야하는상황일때
   {return(
      <Link to='/Login' style={{textDecoration:"none", color:"black"}}>
        <ListItem button component="a">
          <ListItemText primary="로그인" />
        </ListItem>
      </Link>
        );
}
  else{//localStorage.clear() 
  
    return(//로그인
      <div>
      <ListSubheader align="center">{localStorage.getItem('username')} 회원님의 마이페이지</ListSubheader>
      <ListItem button component="a"  >
        <Logout/>
    </ListItem>
    </div>
    );
  }
}

function Mypage(){
  if(localStorage.getItem('username')!=null) //로그인 되있는 상태일때
  {//localStorage.clear() 
   return(
    <Link to='/mypage' style={{textDecoration:"none", color:"black"}}>
     <ListItem button component="a">
     <ListItemText primary="회원정보수정" />
     </ListItem>
     </Link>
   );
 }
 else{
   return(<p></p>);//로그아웃상태에선 마이페이지를 볼수없음.
 }
}

function Manage(){
  if(localStorage.getItem('username')!=null) //로그인 되있는 상태일때
  {
   return(
      <ListItem button component="a" href="/my_posts">
        <ListItemText primary="작성한 글 관리" />
      </ListItem>
   );
 }
 else{
   return(<p></p>);//로그아웃상태에선 마이페이지를 볼수없음.
 }
}

export const mainListItems = (
  <div>
    <ListSubheader> </ListSubheader>
    <p></p>
    <Link to='/live' style={{textDecoration:"none", color:"black"}}>
      <ListItem button component="a">
        <ListItemText primary="LIVE"/>
      </ListItem>
    </Link>

    <Link to='/vod' style={{textDecoration:"none", color:"black"}}>
      <ListItem button component="a">
        <ListItemText primary="VOD"/>
      </ListItem>
    </Link>

    <ListItem button component="a" href="/noticeboard">
      <ListItemText primary="시청자 게시판" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <Login/>
    <ListItemText >
      <Mypage/>
    </ListItemText>
    <Manage/>
  </div>
);