import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../Config/Firebase';
import UserContext from '../Context/UserContext';
import AlertModal from '../components/AlertModal';
import Loader from '../components/Loader';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState({});
  const context = useContext(UserContext);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm({...form, [name]:value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    if (Object.keys(form).length === 4) {
            try {
                const response = await firebase.auth.createUserWithEmailAndPassword(form.email, form.password)
                await firebase.db.collection("users")
                .add({
                    userId:response.user.uid,
                    firstName:form.firstName,
                    lastName:form.lastName,
                    email:form.email,
                })
                setLoading(false);
                setMessage({title:`Usuario ${form.firstName} creado con éxito`, text:""})
                setShowReport(true);
                try {
                  const response = await firebase.auth.signInWithEmailAndPassword(form.email, form.password);
                  const userInfo = await firebase.db.collection('users')
                  .where("userId", "==", response.user.uid)
                  .get()
                  context.signInUser(userInfo.docs[0]?.data())
                  setLoading(false);
                  history.push('/')
                } catch(e) {
                    setLoading(false);
                    setMessage({title:"Ocurrió un error", text:"No se ha podido inciar sesión correctamente"})
                    setShowReport(true);
                }

            } catch (e) {
                console.log(e)
                setLoading(false)
                setMessage({title:"Ocurrió un error", text:"No se ha podido registrar correctamente"})
                setShowReport(true);
            }
    } else {
        setLoading(false)
        setMessage({title:"Error", text:"Debe completar todos los campos del formulario"})
        setShowReport(true);

    }
  }

  if (loading) {
    return <Loader/>
  } else {

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        <AlertModal
          show={showReport}
          setShow={setShowReport}
          title={message.title}
          message={message.text}
        />
      </Container>
    );
  }
}