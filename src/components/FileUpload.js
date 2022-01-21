import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState(
    '1. Waiting for file to be selected...'
  );
  const [disabled, setDisabled] = useState(true);
  const [typeAlert, setTypeAlert] = useState('secondary');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setDisabled(false);
    setMessage('2. Click on "Upload"...');
    setTypeAlert('warning');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    setTypeAlert('primary');
    setMessage(`3. Uploading file "${filename}"...`);
    setDisabled(true);

    await axios({
      method: 'post',
      url: `https://ekm6trjmkc.execute-api.us-east-2.amazonaws.com/v1/dvd-test-bucket/${filename}`,
      data: file,
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })
      .then(() => {
        setTypeAlert('success');
        setMessage(`File "${filename}" Uploaded`);
      })
      .catch((res) => {
        setTypeAlert('danger');
        setMessage('There was a problem uploading file.');
        setDisabled(false);
      });
  };
  return (
    <Fragment>
      {message ? <Message msg={message} type={typeAlert} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-1 mt-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-3"
          disabled={disabled}
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
