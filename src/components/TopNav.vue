<template>
  <div class="top">
    <div class="nav">
      <div class="list">
        <div class="fl">
          <img class="pic" src="../assets/logo1.jpg" alt="" />
        </div>
        <ul class="fl">
          <li
            :class="{ active: index == current }"
            @click="change(index)"
            v-for="(item, index) in menuList"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <span
        class="fr login-title"
        v-if="token === '' || token === null"
        @click="dialogVisible = true"
        >登录</span
      >
      <el-dropdown class="fr user-pic" @command="quitBtn" v-else>
        <span class="el-dropdown-link">
          <img :src="avatarUrl" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a"
            ><i class="el-icon-user"></i>个人主页</el-dropdown-item
          >
          <el-dropdown-item command="b"
            ><i class="el-icon-star-off"></i>我的等级</el-dropdown-item
          >
          <el-dropdown-item command="c"
            ><i class="el-icon-setting"></i>设置</el-dropdown-item
          >
          <el-dropdown-item command="d"
            ><i class="el-icon-switch-button"></i>退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <div class="login">
        <el-dialog
          :visible.sync="dialogVisible"
          width="350px"
          :show-close="false"
        >
          <div class="icon" @click="resetForm('ruleForm')">
            <i class="el-icon-close"></i>
          </div>
          <img class="pic" src="../assets/logo1.jpg" alt="" />
          <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm">
            <el-form-item prop="name">
              <el-input
                type="text"
                prefix-icon="el-icon-user"
                v-model="ruleForm.name"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="el-icon-lock"
                v-model="ruleForm.password"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button class="loginBtn" @click="loginBtn" type="primary"
              >登 录</el-button
            >
            <div class="login-bottom">
              <img src="../assets/login_bg2.jpg" alt="" />
            </div>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/api";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      menuList: [
        { name: "首页", path: "/" },
        { name: "排行榜", path: "/ranking" },
        { name: "歌单", path: "/index" },
        { name: "MV", path: "/index" },
        { name: "歌手", path: "/index" },
        { name: "我的音乐", path: "/index" },
      ],
      current: "",
      token: window.localStorage.getItem("token"),
      avatarUrl: window.localStorage.getItem("avatarUrl"),
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  created() {
    // console.log(this.token, "111");
  },
  methods: {
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    async login() {
      const resp = await login({
        phone: this.ruleForm.name,
        password: this.ruleForm.password,
      });
      const hint = resp.data.code;
      if (hint != "200") {
        this.$message({
          message: "密码错误",
          type: "error",
          offset: 80,
        });
        this.dialogVisible = true;
      } else {
        this.$message({
          message: "登陆成功",
          type: "success",
          offset: 80,
        });
        this.dialogVisible = false;
        window.localStorage.setItem("token", resp.data.token);
        window.localStorage.setItem("avatarUrl", resp.data.profile.avatarUrl);
        this.token = resp.data.token;
        this.avatarUrl = resp.data.profile.avatarUrl;
      }
      console.log(resp, "resp");
      console.log(resp.data.token, "token");
    },
    loginBtn() {
      this.login();
      console.log(this.ruleForm.name);
    },
    //导航跳转
    change(index) {
      this.current = index;
      console.log(index);
      this.$router.push({
        path:this.menuList[index].path
      })
    },
    quitBtn(command) {
      if (command == "d") {
        window.localStorage.clear();
        location.reload();
        this.$message({
          message: "退出登录",
          type: "success",
          offset: 80,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 1px 5px 5px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  z-index: 9999;
  .nav {
    width: 75%;
    margin: 0 auto;
    .user-pic {
      width: 50px;
      height: 50px;
      margin-top: 10px;
      img {
        width: 100%;
        border-radius: 50px;
      }
    }
  }
  .pic {
    height: 100%;
    margin-top: 5px;
  }
}
.nav {
  .list {
    ul {
      margin-left: 30px;
    }
    li {
      float: left;
      line-height: 68px;
      padding: 0 20px;
      cursor: pointer;
    }
    .active {
      border-bottom: 3px solid #f68247;
    }
  }
}
.login-title {
  line-height: 70px;
  margin-left: 30px;
  cursor: pointer;
}
.search {
  line-height: 70px;
  input {
    height: 25px;
    outline: none;
    background: #fff;
    border: none;
    margin-right: 5px;
    border-bottom: 2px solid #c2c3c5;
  }
  i {
    font-size: 20px;
    color: #c2c3c5;
    vertical-align: middle;
  }
}
//login
.login {
  position: relative;
  .pic {
    margin: 20px 0 40px;
  }
  .dialog-footer {
    margin: 0;
  }
  .icon {
    position: absolute;
    right: 20px;
    top: 20px;
    i {
      font-size: 20px;
    }
  }
  .el-button {
    background: #f68247;
    border: none;
    width: 100%;
    &:active {
      background: #752700;
    }
  }
  .login-bottom {
    img {
      width: 100%;
    }
  }
}
</style>