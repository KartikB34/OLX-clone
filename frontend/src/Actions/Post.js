import axios from "axios"

  //Create new post
  export const createNewPost = (title, image, description, category, brand, condition, price ) => async (dispatch) => {

    try {

        dispatch({
            type:"newPostRequest",
        })

        const {data} = await axios.post("/api/v1/post/upload",{
            title,
            image,
            description,
            category,
            brand,
            condition,
            price
        },{
            headers:"Content-Type:application/json"
        })

        dispatch({
            type:"newPostSuccess",
            payload:data.message
        })

        
    } catch (error) {
        dispatch({
            type:"newPostFailure",
            payload:error.response.data.message
        })
    }
  }


  //All posts
  export const getAllPosts = () => async (dispatch) =>{

    try {

        dispatch({
            type:"allPostRequest"
        })

        const {data} = await axios.get("/api/v1/allposts")

        dispatch({
            type:"allPostSuccess",
            payload: data.posts                                    //Refer backend whenever necessary
        })
        
    } catch (error) {

        dispatch({
            type:"allPostError",
            payload:error.response.data.message
        })
        
    }
}

  //Delete post
  export const deletePost = (id) => async (dispatch) => {

    try {

        dispatch({
            type:"deletePostRequest",
        })

        const {data} = await axios.delete(`/api/v1/post/${id}`)

        dispatch({
            type:"deletePostSuccess",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({
            type:"deletePostFailure",
            payload:error.response.data.message
        })
    }
  }