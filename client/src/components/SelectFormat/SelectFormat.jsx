import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MySQLDataForm from './MySQLDataForm';

import CSVDataForm from './CSVDataForm';
import './SelectFormat.css';

function SelectFormat() {
  const [checkedMySQL, setCheckedMySQL] = React.useState(false);
  const [checkedCSV, setCheckedCSV] = React.useState(false);

  const handleChangeMySQL = (event) => {
    setCheckedMySQL(!checkedMySQL);
    setCheckedCSV(false);
  };
  const handleChangeCSV = (event) => {
    setCheckedCSV(!checkedCSV);
    setCheckedMySQL(false);
  };

  return (
    <div className='mt-5'>
      <h5 className='mt-5 text-center'>1. Select Format</h5>
      <div className='selectform-input'>
        <div className='mysql-form'>
          <Checkbox
            checked={checkedMySQL}
            onChange={handleChangeMySQL}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />{' '}
          MySQL
          {checkedMySQL && <MySQLDataForm />}
        </div>
        <div className='csv-form'>
          <Checkbox
            checked={checkedCSV}
            onChange={handleChangeCSV}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />{' '}
          CSV
          {checkedCSV && <CSVDataForm />}
        </div>
      </div>
    </div>
  );
}

export default SelectFormat;
