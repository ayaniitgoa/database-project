import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import './ChooseColumns.css';
const optionsTable1 = [];

const optionsTable2 = [];

function ChooseColumns(props) {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  if (props.tables.length !== 0) {
    for (var i = 0; i < props.tables[0].columns.length; i++) {
      optionsTable1.push({
        value: props.tables[0].columns[i],
        label: props.tables[0].columns[i],
      });
    }
    for (var j = 0; j < props.tables[1].columns.length; j++) {
      optionsTable2.push({
        value: props.tables[1].columns[j],
        label: props.tables[1].columns[j],
      });
    }
  }

  const handleChange1 = (selectedOption1) => {
    setSelectedOption1(selectedOption1);
    console.log(`Option selected:`, selectedOption1);
  };
  const handleChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption1);
    console.log(`Option selected:`, selectedOption2);
  };

  return (
    <div>
      <div className='mb-5'>
        <h5 className='text-center'>5. Choose Column(s) You Want To Show </h5>
        <form>
          {props.tables.length === 0 && (
            <h6 className='text-center'>Please enter tables above.</h6>
          )}
          {props.tables.map((each, index) => {
            return (
              <div className=''>
                {each.table}

                {index === 0 ? (
                  <Select
                    closeMenuOnSelect={false}
                    value={selectedOption1}
                    onChange={handleChange1}
                    options={optionsTable1}
                    isMulti
                    placeholder={'Columns in ' + each.table}
                    noOptionsMessage={() => 'No columns found 😞 '}
                  />
                ) : (
                  <Select
                    closeMenuOnSelect={false}
                    value={selectedOption2}
                    onChange={handleChange2}
                    options={optionsTable2}
                    isMulti
                    placeholder={'Columns in' + each.table}
                    noOptionsMessage={() => 'No columns found 😞 '}
                  />
                )}
              </div>
            );
          })}

          {props.tables.length !== 0 && (
            <Button
              variant='contained'
              color='primary'
              className='submit-columns-button mt-2'
            >
              Submit Columns
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tables: state.tables.tables,
});

export default connect(mapStateToProps, null)(ChooseColumns);
