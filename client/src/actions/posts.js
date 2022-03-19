//basically makes all the functions from the api file a member of api
import * as api from '../api';

import { FETCH_ALL, CREATE, UPDATE,DELETE} from '../constants/actionTypes'; 

//action creators : fucntiosn taht return an action
export const getPosts = () => async (dispatch) => {
    console.log("getting")
    try {
      const  data  = await api.fetchPosts();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  

export const createPost = (post) => async(dispatch) =>{
    console.log("creating post")
    try {
        const {data} = await api.createPost(post);
        console.log(data)
        dispatch({type: CREATE,payload:data});
    } catch (error) {
        console.log("error creating post:", error.message);
    }
}

export const updatePost = (id,post) =>async(dispatch) => {
    try {
        const {data}= await api.updatePost(id,post);
        dispatch({type: UPDATE,payload:data})
    } catch (error) {
        console.log("error.message")
    }
}

export const deletePost = (id) => async(dispatch) =>{
    try {
        console.log("deleting",id)
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) =>  async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        console.log("updated like",data)
        dispatch({type: UPDATE,payload:data});
    } catch (error) {
        console.log(error)
    }
}