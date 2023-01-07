import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const useReducer = createReducer(initialState, {

    //Manipulating Login
    LoginRequest: (state) => {
        state.loading= true;                                               //This is an arrow function not an object
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated= true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },


    //Manipulating Logout
    LogoutRequest: (state) => {
        state.loading= true;
    },
    LogoutSuccess: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated= false;
    },
    LogoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },



    //manipulating Register User

    RegisterRequest: (state) => {
        state.loading = true;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },



    //Manipulating Load User
    LoadUserRequest: (state, action) => {
        state.loading = true
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    clearErrors: (state) =>{
        state.error = null
    }
})


// posts of followings
export const postOfFollowingReducer = createReducer(initialState,{

    postOfFollowingRequest: (state) => {
        state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading= false;
        state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
        state.loading= false
        state.error = action.payload
    },

    clearErrors: (state) => {
        state.error = null
    }
})



// posts of followings
export const allUserReducer = createReducer(initialState,{

    allUserRequest: (state) => {
        state.loading = true;
    },
    allUserSuccess: (state, action) => {
        state.loading= false;
        state.users = action.payload;
    },
    allUserFailure: (state, action) => {
        state.loading= false
        state.error = action.payload
    },

    clearErrors: (state) => {
        state.error = null
    }
})


// user Profile Reducer
export const userProfileReducer = createReducer(initialState,{

    userProfileRequest: (state) => {
        state.loading = true;
    },
    userProfileSuccess: (state, action) => {
        state.loading= false;
        state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
        state.loading= false
        state.error = action.payload
    },

    clearErrors: (state) => {
        state.error = null
    }
})