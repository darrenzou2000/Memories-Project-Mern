import express from "express";
import {getPosts,createPost,updatePost,deletePost,likePost} from "../controllers/posts.js"
const router = express.Router();

import auth from '../middleware/auth.js'
// This links the route to a function defined in ../controllers to make the routes really clean 
//and the hanlding somewhere else
router.get('/', getPosts)
router.post('/',auth,createPost)
//patch is used for updaing existing documents
router.patch("/:id",auth, updatePost)
router.delete("/:id",auth, deletePost)
router.patch("/:id/likePost", auth,likePost)
export default router;
