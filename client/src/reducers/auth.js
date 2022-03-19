import { AUTH,LOGOUT} from '../constants/actionTypes'; 

const authReducer = (state ={authData:null,loggedIn:localStorage.getItem('profile') !== null},action) =>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}));

            return {...state,authData:action?.data,loggedIn:true};
        case LOGOUT:
            localStorage.clear()

            return {...state,authData:null,loggedIn:false};
        default:
            return state;
    }    
}
    
export default authReducer