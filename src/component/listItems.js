import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Logout from './Logout';
function Login(){
  
  if(localStorage.getItem('username')==null) //로그인 해야하는상황일때
   {return(
    <ListItem button component="a" href="Login">
    <ListItemText primary="로그인" />

  </ListItem>
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
   
     <ListItem button component="a" href="/mypage" >
     <ListItemText primary="회원정보수정" />
   </ListItem>
     
   );
 }
 else{
   return(<p></p>);//로그아웃상태에선 마이페이지를 볼수없음.
 }

}

function Manage(){
  if(localStorage.getItem('username')!=null) //로그인 되있는 상태일때
  {//localStorage.clear() 
   return(
   
    <ListItemText primary="작성한 글 관리" />
     
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
    <ListItem button component="a" href="live">
      <ListItemText primary="LIVE"/>
    </ListItem>

    <ListItem button component="a" href="vod">
      <ListItemText primary="VOD"/>
    </ListItem>

    <ListItem button component="a" href="noticeboard">
      <ListItemText primary="시청자 게시판" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  
  <div>
    
     <ListItemText >
      <Login/>
    </ListItemText>

    <ListItemText >
      <Mypage/>
    </ListItemText>

    <ListItem button>
      <Manage/>
    </ListItem>
 
  </div>
);