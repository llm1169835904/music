<template>
  <div class="main">
    <!-- <topnav></topnav> -->
    <div class="content">
      <template>
        <el-carousel :interval="4000" type="card" height="13.7vw">
          <el-carousel-item v-for="(item, index) in bannerData" :key="index">
            <h3 class="medium">
              <img class="pic" :src="item.imageUrl" alt="" />
            </h3>
          </el-carousel-item>
        </el-carousel>
      </template>
      <h2>热门歌单</h2>
      <div class="title">
        <ul v-for="(item, index) in hotListData" :key="index">
          <li @click="btn(item.name)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="hotList">
        <div v-for="(item, index) in playListsData" :key="index">
          <!-- <img :src="item.coverImgUrl" alt="" /> -->
          <img v-lazy="item.coverImgUrl"/>
          <p class="name">{{ item.name }}</p>
          <p class="tags" v-for="(i, index) in item.tags" :key="index">
            #{{ i }}
          </p>
        </div>
      </div>
      <h2>新碟上架</h2>
      <div class="title">
        <ul>
          <li
            v-for="(item, index) in album_area"
            :key="index"
            @click="chooseAlbumType(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <el-row class="newDish" :gutter="20">
        <el-col :span="8" v-for="(item, index) in topAlbumData" :key="index">
          <div class="grid-content bg-purple">
            <!-- {{ item.name }} -->
            <!-- <img :src="item.picUrl" alt="" /> -->
            <img v-lazy="item.picUrl" alt="" />
            <div class="name">
              <p>{{ item.name }}</p>
              <p>{{ item.artists[0].name }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <h2>排行榜</h2>
      <div class="rankList">
        <div class="list" v-for="(item, index) in topList" :key="index">
          <h3>{{ item.name }}</h3>
          <span class="line"></span>
          <div
            class="name"
            v-for="(i, index) in topListId[item.id]"
            :key="index"
          >
            <p>{{ index + 1 }}.{{ i.name }}</p>
            <p>{{ i.ar[0].name }}</p>
          </div>
        </div>
      </div>
    </div>
    <playbar></playbar>
  </div>
</template>

<script>
import axios from "axios";
import topnav from "../components/TopNav.vue";
import playbar from "../components/PlayBar.vue";
import {
  getBanner,
  playList,
  hotList,
  albumNew,
  getSongDetail,
  topAlbum,
  getTopList,
  getDetail,
} from "../api/api";
export default {
  data() {
    return {
      listData: [],
      bannerData: [],
      playListsData: [],
      hotListData: [],
      btnTitle: "",
      albumNewData: [],
      topAlbumData: [],
      album_area: [
        {
          name: "全部",
          code: "all",
        },
        {
          name: "华语",
          code: "zh",
        },
        {
          name: "欧美",
          code: "ea",
        },
        {
          name: "韩国",
          code: "kr",
        },
        {
          name: "日本",
          code: "jp",
        },
      ],
      album_areaCode: "all",
      topList: [],
      topListId: [],
    };
  },
  components: {
    // topnav,
    playbar,
  },
  created() {
    this.getBanner();
    this.playList();
    this.hotList();
    this.albumNew();
    this.topAlbum();
    this.getTopList();
  },
  mounted() {},
  methods: {
    toDetail(val) {
      this.$router.push({ path: "/list", query: { id: val } });
    },
    //banner
    async getBanner() {
      const resp = await getBanner();
      this.bannerData = resp.data.banners;
    },
    //热门歌单pic
    async playList() {
      const resp = await playList({ cat: this.btnTitle });
      this.playListsData = resp.data.playlists.slice(0, 5);
    },
    //热门歌单txt
    async hotList() {
      const resp = await hotList();
      this.hotListData = resp.data.tags.slice(0, 5);
    },
    async albumNew() {
      const resp = await albumNew({ area: "all" });
      // console.log(resp, "ZH");
      this.albumNewData = resp.data.albums;
    },
    //新碟上架
    async topAlbum() {
      const resp = await topAlbum({ area: this.album_areaCode });
      if (this.album_areaCode == "all") {
        this.topAlbumData = resp.data.weekData.slice(0, 9);
      } else {
        this.topAlbumData = resp.data.monthData.slice(0, 9);
      }
    },
    //排行榜
    async getTopList() {
      const res = await getTopList();
      this.topList = res.data.list.slice(0, 4);
      this.topList.forEach(async (item) => {
        const resp = await getDetail({ id: item.id });
        this.$set(
          this.topListId,
          item.id,
          resp.data.playlist.tracks.splice(0, 6)
        );
        // console.log(this.topList, "1");
        // console.log(this.topListId, "2");
      });
    },
    //排行榜详情

    btn(val) {
      this.btnTitle = val;
      this.playList();
    },
    chooseAlbumType(val) {
      // console.log(this.album_area[val].code);
      this.album_areaCode = this.album_area[val].code;
      this.topAlbum();
    },
    btnt(val) {
      // console.log(val, "id");
      // console.log(this.getDetail(), "ididid");
      this.topList.forEach(async (item) => {
        const resp = await getDetail({ id: item.id });
        // console.log(resp, "ididid");
        this.topListId = resp;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  // height: 1500px;
  margin-top: 80px;
  // background: red;
}
.content {
  width: 75%;
  margin: 0 auto;
  padding: 15px;
}
.medium .pic {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.content > h2 {
  text-align: center;
  margin-top: 4vw;
}
.title {
  display: flex;
  justify-content: center;
}
.title li {
  margin: 25px 35px;
  font-weight: bold;
  float: left;
  cursor: pointer;
  &:active {
    color: blueviolet;
  }
}
.hotList {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  div {
    width: 17%;
    .name {
      font-size: 0.9vw;
    }
    .tags {
      color: #e6a23c;
      font-size: 0.8vw;
      float: left;
      font-weight: bold;
      margin-right: 5px;
    }
    p:nth-child(2) {
      height: 3.5vw;
      margin-top: 1vw;
    }
  }
  .pic{
    width: 100%;
    box-shadow: 7px -4px 11px -2px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
    box-shadow: 7px -4px 11px -2px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.newDish {
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #e3e6e7;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
}
.newDish .grid-content {
  border-radius: 4px;
  height: 7vw;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  img {
    height: 100%;
    float: left;
  }
  p {
    margin-left: 2vw;
    font-size: 1vw;
  }
  .name {
    float: left;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.rankList {
  height: 600px;
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  h3 {
    color: #fff;
    margin: 0 auto;
    text-align: center;
    line-height: 80px;
  }
  p {
    color: #fff;
    line-height: 25px;
    font-size: 15px;
  }
  .list {
    height: 100%;
    width: 21%;
    position: relative;
    .name {
      margin-top: 30px;
      text-align: center;
    }
    .line {
      position: absolute;
      width: 30px;
      height: 3px;
      left: 50%;
      top: 70px;
      margin-left: -15px;
      border-radius: 10px;
      background: #fff;
    }
  }
  & {
    .list:nth-child(1) {
      background: linear-gradient(#74a4de, #74a4de63, #74a4de);
    }
    .list:nth-child(2) {
      background: linear-gradient(#6ac7c9, #6ac7c95b, #6ac7c9);
    }
    .list:nth-child(3) {
      background: linear-gradient(#d16685, #d1668459, #d16685);
    }
    .list:nth-child(4) {
      background: linear-gradient(#bd7167, #bd716757, #bd7167);
    }
  }
}
</style>