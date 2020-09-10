import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from 'axios';
import dblogo from './database-logo.png';

const drawerWidth = '70vw';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [columsCSV, secolumsCSV] = React.useState([]);
  const [csvData, setCsvData] = React.useState([]);

  var colums = [];
  const getColumns = (row) => {
    for (var key in row) {
      colums.push(key);
    }

    secolumsCSV(colums);

    console.log(columsCSV);
  };
  const parseCSVData = (d, row) => {
    let objKeys = Object.keys(row);
    let a = [];
    for (var i = 0; i < d.length; i++) {
      let arr = [];
      let obj = d[i];
      objKeys.forEach((key) => {
        let value = obj[key];

        console.log(value);
        arr.push(value);
      });
      a.push(arr);
      arr = [];
    }
    console.log(a);
    setCsvData(a);
  };

  const handleDrawerOpen = () => {
    axios
      .get('http://localhost:8000/api/preprocess/csv')
      .then((res) => {
        getColumns(res.data[0]);
        // setCsvData(res.data);
        parseCSVData(res.data, res.data[0]);
        console.log(csvData);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ background: '#323232' }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            <img src={dblogo} alt='DB Transformer Logo' /> DB Transformer
          </Typography>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <table className='table table-hover table-active'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              {columsCSV.map((data, index) => {
                return (
                  <th scope='col' key={index}>
                    {data}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {csvData.map((data, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  {data.map((each, i) => {
                    return <td key={i}>{each}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* {csvData.map((data) => {
          return data.map((row, i) => {
            return <p key={i}>{row}</p>;
          });
        })} */}
      </Drawer>
    </div>
  );
}

export default Navbar;
