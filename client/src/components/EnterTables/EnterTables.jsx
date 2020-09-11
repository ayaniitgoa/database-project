import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { getCommonTables } from '../../reduxSetup/actions/getCommonTablesAction';
import { connect } from 'react-redux';
import './EnterTables.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function EnterTables(props) {
  const classes = useStyles();

  const [table1, setTable1] = useState('');
  const [table2, setTable2] = useState('');
  const [disable, setDisable] = useState(true);

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
          label='Enter 1st Table'
          className='enter-table-tf'
          onChange={(e) => {
            setTable1(e.target.value);
            if (table2 && e.target.value && table2 !== e.target.value) {
              setDisable(false);
            } else {
              setDisable(true);
            }
          }}
          variant='outlined'
        />
        <TextField
          required
          label='Enter 2nd Table'
          className='enter-table-tf'
          onChange={(e) => {
            setTable2(e.target.value);
            if (e.target.value && table1 && table1 !== e.target.value) {
              setDisable(false);
            } else {
              setDisable(true);
            }
          }}
          variant='outlined'
        />

        <div className='visualizer-button'>
          <Button
            disabled={disable}
            type='submit'
            variant='contained'
            color='secondary'
          >
            See Common Tables
          </Button>
        </div>
      </form>
    </div>
  );
}

export default connect(null, { getCommonTables })(EnterTables);
