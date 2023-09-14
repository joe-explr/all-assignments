import * as React from 'react';
import { useRecoilState, useRecoilValue} from 'recoil';
import userActions from "../actions/userActions";
import {Link, useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Box,Typography,Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import usernameVal from '../recoil/username/usernameAtom';

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

export default function Login() {

    const {login}=userActions();
    const [username, setUsername] = useRecoilState(usernameVal)
    const [validEm, setValidEm]= React.useState(true)
    const [valid, setValid]= React.useState(true)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate=useNavigate()

    React.useEffect(()=>{ 
        if(username) {
          console.log(username)
          navigate('/courses')
        }
    },[username])

    const loginRequest=async () => {
      let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
      if(!regex.test(email)){
        setValidEm(false)
        return;
      }
      try{
        login({
          "username":email,
          "password":password
      })
        setValid(true)
      }catch(err){
        console.error(err)
      }
    }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginRequest()
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={!validEm}
              helperText={validEm?'':"Invalid Email"}
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
              error={!valid}
              helperText={valid?'':"Incorrect Password"}
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
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? SignUp"}
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