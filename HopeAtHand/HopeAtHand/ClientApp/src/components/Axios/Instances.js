import axios from 'axios'
    
    function createInstance(token = false){
       return axios.create({
           baseURL: 'https://localhost:44365/api',
           timeout: 2000000,
          // headers: { 'Authorization' :"Bearer " + token }
   })}
   
    function get(url){
        const axe = this.createInstance
        axe.get(url).then( res => {
            return(res)
            }
        )
    }

    function post(url, payload){
    const axe = createInstance()
    return new Promise(( resolve, reject) => {
        axe.post(url, payload).then( res => {
            //console.log('This is rest in axios', res)
            resolve(res)
        })})
        
    }
export { post, get, createInstance} 