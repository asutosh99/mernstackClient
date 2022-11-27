import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import memory from "../../images/memory.png";
import { Link } from "react-router-dom";
import { Button, Avatar } from "@mui/material";
import { useHistory,useLocation } from "react-router-dom";
import {LOGOUT} from '../../constants/actionTypes'

const Navbar = () => {
  const theme = useTheme();
const dispatch=useDispatch();
const history=useHistory();
const location=useLocation();
  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user);

  const logout=()=>{
dispatch({type:LOGOUT});
setUser(null);
history.push('/');
  }
  useEffect(() => {
    // console.log(user);
    const token = user?.sub;

    ///jwt
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
console.log(user);
  return (
    <>
      <AppBar
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 50px",
        }}
        position="static"
        color="inherit"
      >
        <div sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h2"
            align="center"
            sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
          >
            Memories
          </Typography>
          {/* <img
            sx={{ marginLeft: "15px" }}
            src={memory}
            alt="icon"
            height="60"
          /> */}
        </div>
        <Toolbar>
          {user ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "400px",
              }}
            >
              <Avatar
                sx={{
                  color: theme.palette.getContrastText(deepPurple[500]),
                  backgroundColor: deepPurple[500],
                }}
                // className={classes.purple}
                alt={user.name}
                src={user.picture}
              >
                {/* {user?.result.name.charAt(0)} */}
              </Avatar>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                variant="h6"
              >
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                // className={classes.logout}
                color="secondary"
                 onClick={logout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
