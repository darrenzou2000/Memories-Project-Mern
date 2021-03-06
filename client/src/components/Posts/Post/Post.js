import React from "react";
import useStyles from './styles';
import {Card, CardActions, CardContent,CardMedia,Button,Typography} from "@material-ui/core"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { mergeClasses } from "@material-ui/styles";
import { useDispatch,useSelector } from "react-redux";
//moment is a timing library where you can pass in a time, lets say dec 12 and it can show how long it was from today
import moment from "moment"

import { deletePost, likePost } from "../../../actions/posts";
//get post from here because it is a prop, aka a
const Post = ({ post,setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state)=>state.auth?.authData?.result)

    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
      console.log(user)
    return (
        <Card className = {classes.card}>
            <CardMedia className={classes.media} image = {post.selectedFile} title={post.title}/> 
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.googleId === post?.creator || user?._id===post.creator) &&(
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
                    <MoreHorizIcon fontSize="medium"/>
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color = "textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
            </div>
            <Typography className ={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography  variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className = {classes.cardActions}>
                <Button size="small" color = "primary" disabled={!user} onClick = {() => {dispatch(likePost(post._id))}}>
                    <Likes/>
                </Button>
                {(user?.googleId === post?.creator || user?._id===post.creator) &&
                (<Button size="small" color = "primary" onClick = {() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
                )}
                
            </CardActions>
        </Card>
    )
}

export default Post;