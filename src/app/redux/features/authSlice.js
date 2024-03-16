import {createSlice,} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        userName:"",
        email:"",
        userId:"",
        authStatus:false,
        authToken:"",
    },
    reducers:{
        startSession:(state,action)=>{
            state.authStatus = true ;
            state.authToken = action.payload ;
            console.log("Started Session :: ",state.authToken)
        },
        endSession :(state) =>{
            state.authStatus = false ;
            state.authToken = "" ;
            state.userId = "" ;
            state.userName = "" ;
            state.email = "" ;
        },
        saveUserInfo: (state, action) => {
            const { id, email, display_name } = action.payload;
            console.log(action.payload)
            return {
              ...state,
              userName: display_name,
              email: email,
              userId: id
            };
          }

    }
});

export const {startSession,endSession,saveUserInfo} = authSlice.actions ;
export default authSlice.reducer ;