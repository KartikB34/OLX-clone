import axios from "axios"


//To Login User
export const LoginUser = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type:"LoginRequest"
        })

        //data will contain: success:true, user and token
        const {data} = await axios.post("/api/v1/login", {email,password}, {
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.user,
        })

        dispatch({
            type:"clearError"
        })
        
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error.response.data.message
        })
    }
}


//Register User
export const registerUser = (name,email,password, avatar) => async (dispatch) => {

    try {

        dispatch({
            type:"RegisterRequest"
        })

        const {data} = await axios.post("/api/v1/register",{
            name,
            email,
            password,
            avatar
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"RegisterSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:"RegisterFailure",
            payload:error.response.data.message
        })
    }
}

//User Logout
export const LogoutUser = () => async (dispatch) => {

    try {

        dispatch({
            type:"LogoutRequest",
        })

        const {data} = await axios.get("/api/v1/logout")

        dispatch({
            type:"LogoutSuccess",
            payload: data.message
        })

        dispatch({
            type:"clearError"
        })
        
    } catch (error) {
        dispatch({
            type:"LogoutFailure",
            payload:error.response.data.message
        })
    }
}


//If user is already loggedIn
export const loadUser = () => async (dispatch) => {

    try {
        
        dispatch({
            type:"LoadUserRequest"
        })

        const {data} = await axios.get("/api/v1/me");

        dispatch({
            type:"LoadUserSuccess",
            payload:data.user,
        })
    } catch (error) {

        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.message,
        })
        
    }
}


//get all my posts
export const getAllMyPosts = () => async (dispatch) => {

    try {

        dispatch({
            type:"allMyPostRequest"
        })

        const {data} = await axios.get("/api/v1/my/allposts")

        dispatch({
            type:"allMyPostSuccess",
            payload:data.posts
        })
        
    } catch (error) {
        dispatch({
            type:"allMyPostFailure",
            payload: error.response.data.message
        })
    }
}


//Purchase request send
export const purchaseRequest = (id) => async (dispatch)=>{

    try {

        dispatch({
            type:"purchaseRequestRequest",
        })

        const {data} = await axios.put(`/api/v1/purchase/request/${id}`)

        dispatch({
            type:"purchaseRequestSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type:"purchaseRequestFailure",
            payload:error.response.data.message
        })
    }
}


//Purchase request Accept
export const purchaseRequestAccept = (id, buyer) => async (dispatch)=>{

    try {

        dispatch({
            type:"requestAcceptRequest",
        })

        const {data} = await axios.put(`/api/v1/accept/request/${id}`, {
            buyer,
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"requestAcceptSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type:"requestAcceptFailure",
            payload:error.response.data.message
        })
    }
}


//Purchase request Decline
export const purchaseRequestDecline = (id, buyer) => async (dispatch)=>{

    try {

        dispatch({
            type:"requestDeclineRequest",
        })

        const {data} = await axios.put(`/api/v1/decline/request/${id}`, {
            buyer,
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"requestDeclineSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type:"requestDeclineFailure",
            payload:error.response.data.message
        })
    }
}

//Get all my purchases
export const allMyPurchases = () => async(dispatch) => {

    try {

        dispatch({
            type:"myPurchasesRequest"
        })

        const {data} = await axios.get("/api/v1/my/purchases")

        dispatch({
            type:"myPurchasesSuccess",
            payload: data.posts
        })
        
    } catch (error) {
        dispatch({
            type:"myPurchasesFailure",
            payload: error.response.data.message
        })
    }
}


//get user Profile
export const getUserProfile = (id) => async (dispatch) => {

    try {

        dispatch({
            type:"userProfileRequest"
        })

        const {data} = await axios.get(`/api/v1/user/${id}`)

        dispatch({
            type:"userProfileSuccess",
            payload:data.user
        })
        
    } catch (error) {
        dispatch({
            type:"userProfileFailure",
            payload: error.response.data.message
        })
    }
}