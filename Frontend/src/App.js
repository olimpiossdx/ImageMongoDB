import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: { '& > *': { margin: theme.spacing(1), } },
  input: { display: 'none' },
}));

function App() {

  const [image, setImage] = React.useState('');
  const [user, setUser] = React.useState('');
  const [userFind, setUserFind] = React.useState('');

  const fetchImage = async () => await axios.get('http://localhost:3000/getLatest').then(result => setUserFind(result.data));

  React.useEffect(fetchImage, []);

  const getBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log('reader', reader);
      setUser({
        ...user,
        imgUrl1: reader.result.toString(),
        imgUrl2: reader.result.toString(),
        imgUrl3: reader.result.toString()
      });
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const onChange = async (e) => {
    
    console.log('OnchageImage', e.target.files);

    getBase64(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));
  }


  const onSubmit = async () => {
    setUser({ ...user, name: 'teste', extensao: 'png' });
    const response = await axios.post('http://localhost:3000/upload', { user });
  };

  const classes = useStyles();
  return (<>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <div className={classes.root}>
          <br />
          <input
            accept="image/*"
            id="contained-button-file"
            // multiple
            type="file"
            onChange={onChange}
          />
          <Button onClick={onSubmit} variant="contained" color="primary" component="span"> Upload</Button>

          <br />
          <img src={image} width="250" alt="" />

          {userFind ? (<>
            <img src={userFind.imgUrl1} width="250" alt="" />
            <img src={userFind.imgUrl2} width="250" alt="" />
            <img src={userFind.imgUrl3} width="250" alt="" /></>) : null}
        </div>
      </header>
    </div>
  </>);
}

export default App;
