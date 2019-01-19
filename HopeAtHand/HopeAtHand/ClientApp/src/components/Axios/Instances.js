import axios from 'axios'
class instance{
    
    createInstance = (token) => {
       return axios.create({
           baseURL: 'https://localhost:44365/api',
           timeout: 2000000,
          // headers: { 'Authorization' :"Bearer " + token }
   })}
   

}
export default instance