import axios from 'axios'
const instance=axios.create({
    time:5000,
    baseURL:'https://netease-music-api.fe-mm.com'
})
export default instance