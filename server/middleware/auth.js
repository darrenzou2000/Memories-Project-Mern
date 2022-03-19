import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


//wants to like a post  
//click the like button => authmiddleware(next) =>like controller


const auth = async(req,res,next) =>{

    //everytime the user try to do anythign we need to check if their token is valid
    try {

        const token = req.headers?.authorization.split(" ")[1];

        const isCustomAuth = token.length <500;

        let decodedData;

        //custom account
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,process.env.SECRET_JWT_TOKEN)

            req.userId = decodedData?.id;
        }else{
            //google account
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;