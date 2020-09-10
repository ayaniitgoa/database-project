import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import axios from 'axios';

import { getColumnsActions } from '../../reduxSetup/actions/getColumnsAction';
import './CommonTables.css';

function CommonTables(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [disable, setDisable] = useState(true);

  const options = [];
  props.commonTables.map((table, index) => {
    return options.push({ value: table.table, label: table.table });
  });

  var postTable = [];

  const handleTablesChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (postTable.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    postTable = [];
    if (selectedOption) {
      selectedOption.map((o) => {
        postTable.push(o.value);
        if (postTable.length > 0) {
          setDisable(false);
        } else {
          setDisable(true);
        }
        console.log(postTable);
        return postTable;
      });
    }
  };

  const commonTablesSubmit = (e) => {
    axios
      .post('http://localhost:8000/api/preprocess/jointables', {
        options: selectedOption,
      })
      .then((res) => {
        props.getColumnsActions();
      })
      .catch((err) => console.error(err));

    e.preventDefault();
  };

  return (
    <>
      <div className='common-table-container mt-5 mb-5'>
        <h5 className='text-center'>4. Select Common Column(s)</h5>
        {props.commonTables.length === 0 && (
          <h6 className='text-center'>Please login and enter tables.</h6>
        )}
        {props.commonTables.length >= 1 &&
          (props.commonTables[0].status === 'False' ? (
            <h6>
              Please check if you have logged in or if the table names entered
              are correct!
            </h6>
          ) : (
            <div className='mb-3'>
              <form onSubmit={commonTablesSubmit}>
                <Select
                  closeMenuOnSelect={false}
                  value={selectedOption}
                  onChange={handleTablesChange}
                  options={options}
                  isMulti
                  placeholder='Common Tables..'
                  noOptionsMessage={() => 'No common table found 😞 '}
                />
                <Button
                  disabled={disable}
                  className='mt-3 submit-table-button'
                  variant='contained'
                  color='primary'
                  type='submit'
                >
                  Submit Tables Selected
                </Button>
              </form>
            </div>
          ))}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  commonTables: state.commonTables.commonTables,
});

export default connect(mapStateToProps, { getColumnsActions })(CommonTables);
