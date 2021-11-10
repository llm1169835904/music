<template>
  <div class="main">
    <div class="content">
      <div class="leftList fl">
        <ul class="title">
          <li>TOP榜</li>
          <li>特色榜</li>
          <li>场景榜</li>
          <div class="clear"></div>
        </ul>
        <div
          class="nav"
          v-for="(item, index) in leftList"
          :key="index"
          @click="change(item)"
        >
          <div class="pic fl">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div class="fl">
            <p class="name">{{ item.name }}</p>
            <p class="update">{{ item.updateFrequency }}</p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="rightList fr">
        <div class="pic">
          <img :src="menuTitle" alt="" />
        </div>
        <div>
          <h3>歌曲列表</h3>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" prop="date" label="序号" width="100px">
            </el-table-column>
            <el-table-column :fit='true' prop="name" label="歌曲">
            </el-table-column>
            <el-table-column :fit='true' prop="ar[0].name" label="歌手">
            </el-table-column>
            <el-table-column :fit='true' prop="al.name" label="专辑">
            </el-table-column>
            <el-table-column :fit='true' prop="dt" label="时长">
            </el-table-column>
            <div>111</div>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTopList, getDetail } from "../api/api";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      leftList: [],
      //   tightList: [],
      menuTitle: [],
      detailListId:'',
      tableData:[],
      duration:''
    };
  },
  created() {
    this.getTopList();
    // this.getDetail();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    async getTopList() {
      const resp = await getTopList();
      this.leftList = resp.data.list.slice(0, 4);
      this.menuTitle = resp.data.list[0].coverImgUrl;
      this.detailListId=resp.data.list[0].id
      console.log(this.detailList,'22');
        this.getDetail();
    },
    async getDetail(){
        const resp=await getDetail({id:this.detailListId})
        const time=resp.data.playlist.tracks[0].dt
        this.tableData=resp.data.playlist.tracks
        // this.duration=(time/1000/60).toFixed()
        let num=Math.floor(time/1000/60*100)/100
        let m=Math.floor(time/1000/60)
        let s=Math.floor((num-m).toFixed(2)*60)
        this.duration=s

        console.log(resp,'resp');
        console.log(num,'num');
        console.log(m,'m');
        console.log(s,'s');
    },
    change(val) {
    //   console.log(val, "11");
      this.menuTitle = val.coverImgUrl;
      this.detailListId=val.id
      this.getDetail()
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin-top: 100px;
  height: 1500px;
  .content {
    width: 75%;
    margin: 0 auto;
    .leftList {
      width: 20%;
      .title {
        background: #fff;
        height: 50px;
        line-height: 50px;
        display: flex;
        justify-content: space-around;
        li {
          height: 35px;
          font-weight: bold;
          margin: 0 auto;
          cursor: pointer;
          &:hover {
            border-bottom: 3px solid #f68247;
          }
        }
      }
      .nav {
        background: #fff;
        padding-left: 5px;
        &:hover {
          background: #6e6e6e38;
          cursor: pointer;
        }
      }
      .pic {
        height: 70px;
        margin: 5px 0;
        img {
          height: 100%;
        }
      }
      p {
        line-height: 35px;
        margin-left: 10px;
      }
      .name {
        font-weight: bold;
      }
      .update {
        font-size: 13px;
        color: #909399;
      }
    }
    .rightList {
      background: #fff;
      width: 77%;
      padding: 1%;
      .pic {
        width: 180px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>