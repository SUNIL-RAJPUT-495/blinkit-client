import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"
const uploadImage = async(image)=>{
    try{
        const formData= new FormData()
        formData.append('image',image)
        const res =await Axios({
            ...SummaryApi.uploadImage,
            data:formData
        })
        return res
    }catch(error){
        return error
    }
} 
export default uploadImage