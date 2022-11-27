import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@mui/material";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}

export default Home;
