import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";

const columns = [
  { id: '제목', label: '제목', minWidth: 150 },
  {
    id: '작성자',
    label: '작성자',
    minWidth: 15,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '조회수',
    label: '조회수',
    minWidth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '작성일',
    label: '작성일',
    minWidth: 10,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(번호, 제목, 작성자, 조회수, 작성일,프로그램) {
  return { 번호, 제목, 작성자, 조회수, 작성일, 프로그램 };
}

const rows_origin = [
  createData('16', '※공지사항입니다.', 'admin', 0,3287263,'신서유기'),
  createData('15', '건의할게요!', '123', 0,3287263,'신서유기'),
  createData('14', '게스트요청합니다.', '123', 0,9596961,'신서유기'),
  createData('13', 'IT', '973', 0,301340,'런닝맨'),
  createData('12', 'US','67434', 0,9833520,'킹덤'),
  createData('11', 'CA', '13', 0,9984670,'런닝맨'),
  createData('10', 'AU','400', 0,7692024,'런닝맨'),
  createData('9', 'DE', '8200',0, 357578,'런닝맨'),
  createData('8', 'IE', '40', 0,70273,'런닝맨'),
  createData('7', 'MX', '1291', 0,1972550,'런닝맨'),
  createData('6', '※JP', 'admin', 0,377973,'킹덤'),
  createData('5', 'FR', '10', 0,640679,'신서유기'),
  createData('4', 'GB', '657', 0,242495,'신서유기'),
  createData('3', 'RU', '44', 0,17098246,'신서유기'),
  createData('2', 'NG', '217', 0,923768,'신서유기'),
  createData('1', '※글 쓰시기 전에 확인부탁드립니다.', 'admin', 0,8515767,'신서유기'),
];

const useStyles =makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
  divider: {
    height: 28,
    margin: 4,
  }, 
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  
}));

export default function Tablee(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  

  useEffect(() => {
    const temp = [];
    
    
    if (props.programs !== ''|| props.searchs !== '') {
      for (let i = 0; i < rows_origin.length; i++) {//관리자 글을 맨 위로
        if (rows_origin[i].프로그램 === props.programs && rows_origin[i].작성자==='admin' && (rows_origin[i].제목.includes(props.searchs) || rows_origin[i].작성자.includes(props.searchs)) ) 
        {
          temp.push(rows_origin[i]);
        }
      }
      for (let i = 0; i < rows_origin.length; i++) {
        if (rows_origin[i].프로그램 === props.programs && rows_origin[i].작성자!=='admin' && (rows_origin[i].제목.includes(props.searchs) || rows_origin[i].작성자.includes(props.searchs)) ) 
        {
          temp.push(rows_origin[i]);
        }
      }
      setRows(temp);
    } else {
      //setRows(rows_origin);
    }
  }, [props.programs, props.searchs])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div >
      

    <Paper className={classes.root}>
     
    <TableContainer className={classes.container} >
        <Table stickyHeader aria-label="sticky table"  >
          <TableHead >
            <TableRow  >
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                 >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} component={Link} to={`/${ row.번호}-${ row.프로그램}`} style={{textDecoration:"none", color:"black"}}>
        
                      {(column.format && typeof value === 'number') ? column.format(value) : value}
                   
                    </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> 

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

 
    </div>


  );
}