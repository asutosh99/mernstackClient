import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Jwt_decode from 'jwt-decode'
import { useHistory } from "react-router-dom";

import LockIcon from '@mui/icons-material/Lock';
import { GoogleLogin,googleLogout } from "@react-oauth/google";

import Icon from "./icon";
import { signin, signup } from '../../actions/auth';
import { AUTH } from "../../constants/actionTypes";
import Input from "./Input";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const theme = useTheme(); 

theme.spacing(2); 
    const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
    const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    // setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

    const googleSuccess = async (res) => {
      // console.log(res);
      const decode=Jwt_decode(res.credential);
      // console.log(decode);
      try {
        console.log("in the try")
        dispatch({ type: AUTH, data:decode  });
history.push('/')
        // history.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    const googleError = () =>
      alert("Google Sign In was unsuccessful. Try again later");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: "8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
            padding: theme.spacing(2),
        }}
        elevation={3}
      >
        <Avatar
          sx={{
            margin: "1",
            backgroundColor: "blue",
          }}
        >
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        
        <form
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          //  p:'10'
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           sx={{ margin: theme.spacing(3, 0, 2),}} 
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button
                sx={{ margin:theme.spacing(2)}}
                color="primary"
                variant="contained"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                 startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            // cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
