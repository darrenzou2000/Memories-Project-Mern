import React, {useState,useEffect} from "react";
import useStyles from './styles'
import FileBase from "react-file-base64"
import { TextField,Button, Typography, Paper} from "@material-ui/core";
import { useDispatch,useSelector } from "react-redux";
import { createPost,updatePost } from "../../actions/posts";

const Form = ({ currentId,setCurrentId }) => {
                                             //these are default values
    const [postData,setPostData]= useState({ title: "", message:'', tags: "", selectedFile:"" })
    const classes = useStyles();
    const dispatch = useDispatch();
    //this finds the post that the user is trying to edit
    const post = useSelector((state) => currentId ? state.posts.find((p)=> p._id === currentId):null)
    const isLoggedIn = useSelector((state)=>state.auth.loggedIn)
    const user = JSON.parse(localStorage.getItem("profile"))
    const state = useSelector((state)=>console.log(state))
    // runs when something changes, in this case post



    useEffect(() => {
        if(post) setPostData(post);
    },[post,isLoggedIn])
    
   

    const handleSubmit =  async (e) =>{
        //prevents form from restarting the website
        e.preventDefault();

        //if the user selects a image to edit, it will edit instead of making new post
        if(currentId){
            await dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
            clear();
        }else{
            await dispatch(createPost({...postData,name:user?.result?.name}))
            console.log(post)
            clear()
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({title: "", message:'', tags: "", selectedFile:"" })

    }

    if (!isLoggedIn) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
      }


    return (
        <Paper className= {classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId? "Editing": "Creating"} a Memory</Typography>
                <TextField name="title" variant="outlined" label = "title" fullWidth value = {postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label = "message" fullWidth value = {postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label = "tags" fullWidth value = {postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className="classes.fileInput">
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone= {({base64}) => setPostData({...postData,selectedFile:base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color= "primary" size="large" type="submit" fullWidth> Submit</Button>
                <Button className={classes.buttonSubmit} variant="contained" color= "secondary" size="small" onClick={clear} fullWidth> Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;