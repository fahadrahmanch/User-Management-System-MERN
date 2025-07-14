import axios from "axios";
const API=axios.create({
    baseURL:'http://localhost:1342',
    withCredentials:true,
})
API.interceptors.response.use(
    res=>res,
    
    async err=>{
        console.log("err in interceptors",err)
        const orginalRequest=err.config
        if(err.response?.status==403&&!orginalRequest._retry){
            orginalRequest._retry=false
            try{
            if(orginalRequest.url.startsWith('/admin')){
              await axios.get("http://localhost:1342/admin/token/refresh",{
                withCredentials:true
              })
            }else{

                await axios.get("http://localhost:1342/user/token/refresh",{
                  withCredentials:true
                })
            }
              
              return axios(orginalRequest);
            }catch(refreshErr){
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(err);
    }
);
export default API