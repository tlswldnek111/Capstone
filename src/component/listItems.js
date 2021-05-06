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
      <ListItem button component="a" href="/" >
      <ListItemText primary="로그아웃" onClick={Logout}/>
    </ListItem>
       
    );
  }
}
function Logout(){
  localStorage.clear();
  alert('로그아웃되었습니다.');
}
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemText primary="" />
    </ListItem>

    <ListItem button component="a" href="live">
      <ListItemText primary="LIVE"/>
    </ListItem>

    <ListItem button>
      <ListItemText primary="카테고리" />
    </ListItem>

    <ListItem button>
      <ListItemText primary="시청자 게시판" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  
  <div>
    <ListSubheader inset>마이페이지</ListSubheader>
    <ListItem button>
      <ListItemText primary="TEST" />
    </ListItem>

    <ListItem button>
      <ListItemText primary="TEST" />
    </ListItem>

    <ListItem button>
      <Login/>
    </ListItem>

  </div>
);