import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SelectFormat.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getMySQLDatabases } from '../../reduxSetup/actions/mysqlLoginAction';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
      background: 'white',
    },
  },

  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function MySQLFormData(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [host, setHost] = useState('');
  const [database, setDatabase] = useState('');

  const mySQLSubmit = (e) => {
    console.log(username, password, host);
    axios
      .post('http://localhost:8000/api/preprocess/mysql', {
        username: username,
        password: password,
        host: host,
        database: database,
      })
      .then(() => {
        console.log('Mysql info sent');
        props.getMySQLDatabases();
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={mySQLSubmit}
      id='mysql-entire-form'
    >
      <div className={classes.root} id='mysql-form-data'>
        <TextField
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
          label='Username'
          variant='outlined'
        />

        <TextField
          variant='outlined'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label='Password'
          type='password'
        />
        <TextField
          onChange={(e) => {
            setHost(e.target.value);
          }}
          required
          label='IP Address'
          variant='outlined'
        />
        <TextField
          onChange={(e) => {
            setDatabase(e.target.value);
          }}
          required
          label='Database'
          variant='outlined'
        />
      </div>
      <div className={classes.button} id='button-submit-mysql'>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </div>
    </form>
  );
}

export default connect(null, { getMySQLDatabases })(MySQLFormData);
