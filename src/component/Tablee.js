import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppBar from '@material-ui/core/AppBar';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { SyncDisabled } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const columns = [
  { id: '번호', label: '번호', minWidth: 15 },
  { id: '제목', label: '제목', minWidth: 150 },
  {
    id: '작성자',
    label: '작성자',
    minWidth: 15,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '작성일',
    label: '작성일',
    minWidth: 15,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
];

function createData(번호, 제목, 작성자, 작성일) {
  return { 번호, 제목, 작성자, 작성일};
}

const rows = [
  createData('15', 'IN', 123, 3287263),
  createData('14', 'CN', 456, 9596961),
  createData('13', 'IT', 973, 301340),
  createData('12', 'US',67434, 9833520),
  createData('11', 'CA', 13, 9984670),
  createData('10', 'AU',400, 7692024),
  createData('9', 'DE', 8200, 357578),
  createData('8', 'IE', 40, 70273),
  createData('7', 'MX', 1291, 1972550),
  createData('6', 'JP', 1200, 377973),
  createData('5', 'FR', 10, 640679),
  createData('4', 'GB', 657, 242495),
  createData('3', 'RU', 44, 17098246),
  createData('2', 'NG', 217, 923768),
  createData('1', 'BR', 25, 8515767),
];

const useStyles =makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
  input: {
    marginLeft: 10,
    padding: 5,
    margin: theme.spacing(0),
  },
  iconButton: {
    padding: 5,
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
const combomenu = [
  { title: '제목' },
  { title: '제목+내용' },
  { title: '내용' },
  { title: '작성자' },
];
export default function Tablee() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [program, setprogram] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event) => {
    setprogram(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div >
      
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="center">
           {program} 시청자 게시판
          </Typography>
  
      <FormControl className={classes.formControl}  >
        <InputLabel id="inputlabel" >프로그램 명</InputLabel>
        <Select
          labelId="select"
          id="select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={program}
          onChange={handleChange}
        >
         
          <MenuItem value={"신서유기"}>신서유기</MenuItem>
          <MenuItem value={"런닝맨"}>런닝맨</MenuItem>
          <MenuItem value={"킹덤"}>킹덤</MenuItem>
          <MenuItem value={"코미디빅리그"}>코미디빅리그</MenuItem>
        </Select>
      </FormControl>
     <div style={{float: 'right'}}>
          <Button 
            type="check"
            variant="contained"
            color="white"
          >
           글 작성
          </Button>
          </div>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
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
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
         
      <InputBase 
       className={classes.input}
       placeholder="검색"
       inputProps={{ 'aria-label': 'search' }}
     />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
       <SearchIcon />
     </IconButton>

      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
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