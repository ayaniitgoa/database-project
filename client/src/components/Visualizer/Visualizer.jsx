import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Visualizer.css';
import { getCommonTables } from '../../reduxSetup/actions/getCommonTablesAction';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Visualizer(props) {
  const classes = useStyles();

  const [table1, setTable1] = useState('');
  const [table2, setTable2] = useState('');

  const submitVisualizerForm = (e) => {
    axios
      .post('http://localhost:8000/api/preprocess/selecttables', {
        table1,
        table2,
      })
      .then((res) => {
        console.log(res);
        props.getCommonTables();
      })
      .catch((err) => {
        console.error(err);
      });
    e.preventDefault();
  };

  return (
    <div className='mt-5'>
      <h5 className='text-center'>3. Enter Tables</h5>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        id='visualizer-form'
        onSubmit={submitVisualizerForm}
      >
        <TextField
          required
          label='Enter Table 1'
          onChange={(e) => {
            setTable1(e.target.value);
          }}
          variant='outlined'
        />
        <TextField
          required
          label='Enter Table 2'
          onChange={(e) => {
            setTable2(e.target.value);
          }}
          variant='outlined'
        />

        <div className='visualizer-button'>
          <Button type='submit' variant='contained' color='secondary'>
            See Common Tables
          </Button>
        </div>
      </form>
    </div>
  );
}

export default connect(null, { getCommonTables })(Visualizer);