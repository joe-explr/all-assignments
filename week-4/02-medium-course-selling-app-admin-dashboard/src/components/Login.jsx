import * as React from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import useStorage from "./useStorage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Grid,Box,Typography,Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

    const [token, setToken]= useStorage("token")
    const [validEm, setValidEm]= React.useState(true)
    const [valid, setValid]= React.useState(true)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate=useNavigate()
    const setter = (token)=>{
          return setToken(token)
        }
    React.useEffect(()=>{
        if(token!='0'){
            navigate('/courses')
        }
    },[token])
    const loginRequest=async () => {
      let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
      if(!regex.test(email)){
        setValidEm(false)
        return;
      }
      try{
        let response=await axios.post("http://localhost:3000/admin/login",
        {
            "username":email,
            "password":password
        })  
            setter(response.data.token) 
    }
    catch(err){
        if(err.response.status==403) {
            setValid(false)
        }
        console.error(err)
        return
    }
    setValid(true)
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
                <Link to="/register" variant="body2">
                  {"Don't have an account? Register"}
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