
//for hashing passwords
import bcrypt from 'bcryptjs'

//store the user in te browser for a period of time
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

import dotenv from 'dotenv'
dotenv.config()
export const signin = async (req,res)=>{

    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:"User doesnt exist"})

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({message:"invalid password"})

        const token = jwt.sign({email:existingUser.email,id: existingUser._id},process.env.SECRET_JWT_TOKEN,{expiresIn:"1h"})

        res.status(200).json({result:existingUser,token})
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error)
    }

}

export const signup = async (req,res)=>{
    const {email,password,firstName,lastName,confirmPassword} = req.body
    console.log(email,password)
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            console.log("user alreadyExist")
            return res.status(400).json({message:"User already exist"})
        }
            
        if(password !== confirmPassword) {
            console.log("password dont match") 
            return res.status(400).json({message:"Passwords dont match"})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const result = await User.create({email,password:hashedPassword, name:`${firstName} ${lastName}`})

        const token = jwt.sign({email:result.email ,id: result._id},process.env.SECRET_JWT_TOKEN,{expiresIn:"1h"})

        res.status(200).json({result:result , token})
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
        console.log(error)
    }
}
