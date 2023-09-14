import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Box,Typography,Container} from '@mui/material';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import userActions from '../actions/userActions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        LOGOs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const {queryApi}=userActions();
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate=useNavigate()

    const signUpRequest = async () => {
    try{
        let response=await queryApi("signup",
        {
            "username":email,
            "password":password
        },"POST")
        navigate('/courses')
    }
    catch(err){
        console.error(err+"Failed to send request to Backend!")
    }
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signUpRequest()
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: "2rem 2rem",
            border: "1px solid #C9DDF4",
            boxSizing:"content-box"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={e => setEmail(e.target.value)}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={e => setPassword(e.target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2, alignSelf: "start", display:"block"}}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}