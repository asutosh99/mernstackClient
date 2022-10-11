import React,{useEffect, useState} from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import memory from "./images/memory.png";
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/posts';
const App = () => {
  const [currentId,setCurrentId]=useState(null);
  const dispatch=useDispatch();
useEffect(()=>{
  dispatch(getPosts());
},[dispatch,currentId]);

  return (
    <Container maxWidth="lg">
      <AppBar
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        position="static"
        color="inherit"
      >
        <Typography  variant="h2" align="center">
          Memories
        </Typography>
        <img  src={memory} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
export default App;
