import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import './ChooseColumns.css';

function ChooseColumns(props) {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [csvData, setCsvData] = useState([]);

  var optionsTable1 = [];
  var optionsTable2 = [];

  if (props.tables.length !== 0) {
    optionsTable1 = props.tables[0].columns;
    optionsTable2 = props.tables[1].columns;
  }

  const handleChange1 = (selectedOption1) => {
    setSelectedOption1(selectedOption1);
    console.log(`Option selected Customers:`, selectedOption1);
  };
  const handleChange2 = (selectedOption2) => {
    setSelectedOption2(selectedOption2);
    console.log(`Option selected Orders:`, selectedOption2);
  };

  const submitColumns = (e) => {
    axios
      .post('http://localhost:8000/api/preprocess/choosecolumns', {
        selectedOption1,
        selectedOption2,
      })
      .then((res) => {
        console.log(res);
        setCsvData(res.data);
      })
      .catch((err) => console.error(err));

    e.preventDefault();
  };

  return (
    <div>
      <div className='mb-5'>
        <h5 className='text-center'>5. Choose Column(s) You Want To Show </h5>
        <form onSubmit={submitColumns}>
          {props.tables.length === 0 && (
            <h6 className='text-center'>Please enter tables above.</h6>
          )}
          {props.tables.map((each, index) => {
            return (
              <div className='' key={index}>
                <h6 className='mb-2 pt-2'>
                  {' '}
                  Choose from <strong>{each.table}</strong> tables:{' '}
                </h6>

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
              className='submit-columns-button mt-3'
              type='submit'
            >
              Submit Columns
            </Button>
          )}
        </form>
        <div className='mt-5'>
          <h5 className='text-center'>6. Download Your File</h5>
        </div>
        {csvData.length !== 0 ? (
          <div className='download-button-container mb-4'>
            <CSVLink
              filename={'data-analyzer.csv'}
              data={csvData}
              className='mt-2 csv-link'
            >
              <Button variant='contained' color='secondary' className=''>
                <span className='download-file-text'> Download Your File </span>
              </Button>
            </CSVLink>
          </div>
        ) : (
          <h6 className='text-center'> Please enter valid details. </h6>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tables: state.tables.tables,
});

export default connect(mapStateToProps, null)(ChooseColumns);
