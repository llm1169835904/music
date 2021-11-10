import instance from "./instance";
//登录
const login = ({ phone = '', password = '' }) => {
    return instance.get(`/login/cellphone?phone=${phone}&password=${password}`)
}
//获取用户详情
const userDetail = ({ uid = ''}) => {
    return instance.get(`/user/detail?uid=${uid}`)
}
//banner轮播图
const getBanner = () => {
    return instance.get(`/banner?type=0`)
}
//所有榜单
const getTopList = () => {
    return instance.get('/toplist')
}
//热门歌单分类
const hotList = () => {
    return instance.get(`/playlist/hot`)
}
//歌单列表
const playList = ({ order = 'hot', cat = '', limit = 50, offset = 0 }) => {
    return instance.get(`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`)
}
//全部新碟
const albumNew = ({ area = '', limit = 9 }) => {
    return instance.get(`/album/new?area=${area}&limit=${limit}`)
}
//新碟上架
const topAlbum = ({ offset = 0, limit = 20, area = 'all', type = 'new', year = '', mouth = '' }) => {
    return instance.get(`/top/album?limit=${limit}&offset=${offset}&area=${area}&type=${type}&year=${year}&mouth=${mouth}`)
}
//歌单详情
const getDetail = ({ id = '', s = 8  }) => {
    return instance.get(`/playlist/detail?id=${id}&s=${s}`)
}
//音乐url
const getUrl = ({ id = '' }) => {
    return instance.get(`/song/url?id=${id}`)
}
//获取歌曲详情
const getSongDetail = ({ id = '' }) => {
    return instance.get(`/song/detail?ids=${id}`)
}
export { getTopList,userDetail, getDetail, hotList, getUrl, playList, login, getBanner, albumNew, getSongDetail, topAlbum, }