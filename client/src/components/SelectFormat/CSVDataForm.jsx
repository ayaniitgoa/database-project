import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

function CSVDataForm() {
  const [csvFile, setcsvFile] = useState();
  var formData = new FormData();
  const onFileUpload = (e) => {
    setcsvFile(e.target.files[0]);
    console.log(csvFile);
  };

  const sendCSV = (e) => {
    var csvfile = document.querySelector('#csvfile');
    formData.append('file', csvfile.files[0]);
    console.log(formData);
    axios
      .post('http://localhost:8000/api/preprocess/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        console.log('Sent!');
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  return (
    <div>
      <form
        onSubmit={sendCSV}
        encType='multipart/form-data'
        id='csv-entire-form'
      >
        <input
          className='mt-2 csv-input-file'
          onChange={onFileUpload}
          id='csvfile'
          type='file'
          accept='.csv'
        />
        <div className='my-3'>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CSVDataForm;
