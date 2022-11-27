// import react from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  // console.log(post);
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div
        sx={{
          position: "absolute",
          top: "20px",
          left: "40px",
          color: "white",
          m: "10px",
        }}
      >
        
        <Typography variant="h6">{post.creator}</Typography>
        <Typography sx={{ padding: "0 16px 8px 17px" }} variant="body2">
          {moment(post.createdAt).format('L')}
        </Typography>
      </div>
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <Button
          style={{ color: "white" }}
          size="medium"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </Box>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <Typography
          sx={{ padding: "0 16px 8px 17px" }}
          variant="body2"
          color="textSecondary"
          component="h2"
        >
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        // sx={{ padding: "5 16px" }}
        sx={{ padding: "0 16px 8px 17px" }}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpIcon fontSize="small" /> Like {post.likeCount}{" "}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
