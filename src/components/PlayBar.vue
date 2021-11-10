<template>
  <div class="top">
    <div class="content">
      <audio id="aud" controls preload>
        <source
          src="http://m8.music.126.net/20211109195711/5425788cf92…d6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
          type="audio/wav"
        />
      </audio>
    </div>
  </div>
</template>

<script>
import {getUrl} from '../api/api'
export default {
    created(){
        this.getUrl()
    },
    methods:{
        async getUrl(){
            const resp=await getUrl({id:33894312})
            console.log(resp,'URL');
        }
    }
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 0px;
  background: #fff;
  position: fixed;
  bottom: 0;
  box-shadow: 1px -2px 5px 0px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  .content {
    width: 75%;
    margin: 0 auto;
  }
}
.top:hover{
    height: 50px;
}
</style>