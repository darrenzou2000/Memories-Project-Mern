import axios from "axios";

// const url = "https://memoryprojectmern.herokuapp.com/posts";

const API = axios.create({baseURL:"http://localhost:8080"})

//happen before requests to send the token before the request
API.interceptors.request.use((req)=>{

 if(localStorage.getItem('profile')!=null){
     req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
 }
 return req;
 
})

export const fetchPosts = () => API.get('/posts');

//these does the reuqest then runs the function given
export const createPost = (newPost) => API.post('/posts',newPost)

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = (formData) => API.post('/users/signin',formData);
export const signUp = (formData) => API.post('/users/signup',formData);