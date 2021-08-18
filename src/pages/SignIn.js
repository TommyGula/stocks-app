import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserContext from '../Context/UserContext';
import AlertModal from '../components/AlertModal';
import firebase from '../Config/Firebase';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [showReport, setShowReport] = useState(false);
  const [message, setMessage] = useState({});
  const context = useContext(UserContext);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptPath, setAcceptPath] = useState(undefined);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm({...form, [name]:value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (Object.keys(form).length === 2) {
        try {
            const response = await firebase.auth.signInWithEmailAndPassword(form.email, form.password);
            const userInfo = await firebase.db.collection('users')
            .where("userId", "==", response.user.uid)
            .get()
            context.signInUser(userInfo.docs[0]?.data())
            setMessage({title:"Succesfully signed in", text:"You will be automatically redirected to the home page"})
            setShowReport(true);
            setLoading(false);
            setAcceptPath('/');
        } catch(e) {
            console.log(e)
            setLoading(false);
            setMessage({title:"Error", text:"Failed to Sign In"})
            setShowReport(true);
        }
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <AlertModal
            show={showReport}
            setShow={setShowReport}
            title={message.title}
            message={message.text}
            acceptPath={acceptPath}
          />
      </Container>
    );
  }
}