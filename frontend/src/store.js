import {configureStore} from "@reduxjs/toolkit"
import { allUserReducer, useReducer, userProfileReducer } from "./Reducers/User";
import { postReducer, myPostReducer, userPostReducer, allPostReducer, allMyPostReducer, myPurchases } from "./Reducers/Post";

// const initialState={}

const store = configureStore({
    reducer:{
        user:useReducer,
        allUsers: allUserReducer,
        allpost: allPostReducer,
        post: postReducer,
        myPosts: myPostReducer,
        allMyPosts: allMyPostReducer,
        purchases: myPurchases,
        userProfile: userProfileReducer,
        userPosts: userPostReducer,
    }
});

export default store;