import axios from 'axios'
    
    function createInstance(token = false){
       return axios.create({
           baseURL: '/api',
           timeout: 2000000,
          // headers: { 'Authorization' :"Bearer " + token }
   })}
   
    function get(url){
        const axe = createInstance()
        return new Promise((resolve, reject) => {
            axe.get(url).then( res => {
            resolve(res)
            }
        ).catch( err => reject(err))
    })}

    function post(url, payload){
    const axe = createInstance()
    return new Promise(( resolve, reject) => {
        axe.post(url, payload).then( res => {
            resolve(res)
        })})
        
    }
export { post, get, createInstance} 