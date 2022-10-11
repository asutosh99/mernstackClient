import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
const Form = ({currentId, setCurrentId}) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
    const  post=useSelector((state) => currentId ? state.Posts.find(p => p._id === currentId):null);

  useEffect(() => {
    // console.log(post);
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  
  const clear = () => {
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  return (
     <Paper >
      <form
        autoComplete="off"
        noValidate
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 1,
        }}
        onSubmit={handleSubmit}
      >
        <Typography sx={{textAlign:'center',font:'bold'}} variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          sx={{ m: 1,width:'95%' }}
          name="creator"
          variant="outlined"
          label="Creator"
          // fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1,width:'95%' }}
          name="title"
          variant="outlined"
          label="Title"
          // fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ m: 1,width:'95%' }}
          name="message"
          variant="outlined"
          label="Message"
          // fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1,width:'95%' }}
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          // fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div sx={{ width: "100%", margin: "10px 10px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{ marginBottom: 1 }}
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
           onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
