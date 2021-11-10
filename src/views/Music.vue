<template>
  <div>
    <el-dropdown>
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<audio src="http://m8.music.126.net/20211109195711/5425788cf92…d6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></audio>
  </div>
</template>

<script>
import axios from "axios";
import {
  hotList,
  getUrl,
  getSongDetail,
  getTopList,
  login,
  userDetail,
} from "../api/api";
export default {
  created() {
    this.getUrl();
    this.login();
    this.userDetail();
    this.get();
  },
  methods: {
    async getUrl() {
      const res = await getUrl({ id: 34908208 });
      console.log(res.data.data, "歌单");
    },
    async login() {
      const res = await login({ phone: 15852321363, password: "123llmhyoy" });
      console.log(res, "登录");
    },
    async userDetail() {
      const res = await userDetail({ uid: 318369422 });
      console.log(res, "登录详情");
    },
    get() {
      axios
        .get("https://netease-music-api.fe-mm.com/user/binding?uid=318369422")
        .then((res) => {
          console.log(res, "333");
        });
    },
  },
};
</script>

<style>
</style>