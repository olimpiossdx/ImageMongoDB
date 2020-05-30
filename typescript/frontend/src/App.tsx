import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 200
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

interface IUser {
  name: string,
  extensao: string,
  imgUrl1: string,
  imgUrl2: string,
  imgUrl3: string,
};

function App() {
  const classes = useStyles();
  const [image, setImage] = React.useState('');
  const [user, setUser] = React.useState<IUser>({ name: '', extensao: '', imgUrl1: '', imgUrl2: '', imgUrl3: '' });
  const [userDB, setUserDB] = React.useState<IUser>({ name: '', extensao: '', imgUrl1: '', imgUrl2: '', imgUrl3: '' });

  const fetchImage = () => {
    axios.get('http://localhost:3000/getLatest').then(result => setUserDB(result.data));
  };

  React.useEffect(fetchImage, []);

  const getBase64 = (file: FileList | null | Blob) => {
    const reader = new FileReader();
    if (file != null) {
      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        if (reader.result) {
          setUser({
            ...user,
            imgUrl1: reader.result.toString(),
            imgUrl2: reader.result.toString(),
            imgUrl3: reader.result.toString()
          });
        }
      };

      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      getBase64(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }


  const onSubmit = async () => {
    setUser({ ...user, name: 'teste', extensao: 'png' });
    const response = await axios.post('http://localhost:3000/upload', { user });
    setUserDB(response.data);

  };

  return (<div className={classes.root}>
    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <img src={image} width="400" alt="Imagem buscada pelo usuário" />
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={onChange} />
          <Button onClick={onSubmit} variant="contained" color="primary" component="span" size='small'>Enviar</Button>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          {userDB ?
            (<Typography variant="h4" gutterBottom>
              Imagens carregadas do MongoDB
            </Typography>) :
            (<Typography variant="h4" gutterBottom>
              Envie uma imagem
            </Typography>)}
        </Paper>
      </Grid>

      <Grid item xs={3}>
        <Paper className={classes.paper}>
          {userDB ? (<img src={userDB.imgUrl1} width="250" alt="" />) : 'Imagem 1'}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          {userDB ? (<img src={userDB.imgUrl2} width="250" alt="" />) : 'Imagem 2'}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          {userDB ? (<img src={userDB.imgUrl3} width="250" alt="" />) : 'Imagem 3'}
        </Paper>
      </Grid>
    </Grid>
  </div>);
}

export default App;
