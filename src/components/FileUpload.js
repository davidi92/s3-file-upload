import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log('FILE:', file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    await axios({
      method: 'post',
      url: `https://ekm6trjmkc.execute-api.us-east-2.amazonaws.com/v1/dvd-test-bucket/${filename}`,
      data: file,
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })
      .then(() => {
        setMessage(`File "${filename}" Uploaded`);
        setDisabled(true);
      })
      .catch((res) => {
        if (res.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(res.response.data.msg);
        }
        console.log(res);
      });
  };
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
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
