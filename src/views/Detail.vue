<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >

    <el-dialog
      :visible.sync="dialogVisible"
      width="25%"
    >
    <img class="pic" src="../assets/logo1.jpg" alt="">
      <el-form
        :model="ruleForm"
         :rules="rules"
          status-icon
           ref="ruleForm">
        <el-form-item prop='name'>
          <el-input type="text" prefix-icon="el-icon-user" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn" @click="ntm" type="primary"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {login} from '../api/api'
export default {
  data() {
     var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else{
           callback();
        }
      };
     var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
           callback();
        }
      };
    return {
      dialogVisible: true,
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
        },
    };
  },
  methods: {
    async login(){
      const resp=await login({phone:this.ruleForm.name,password:this.ruleForm.password})
      const hint=resp.data.code
      if(hint=='502'){
        this.$message({
          message: '密码错误',
          type: 'error',
        });
      }if(hint=='200'){
        this.$message({
          message: '登陆成功',
          type: 'success',
        });
      }
      console.log(resp);
    },
    ntm(){
      this.login()
      console.log(this.ruleForm.name);
    }
  },
};
</script>

<style lang="less">
.el-dialog__footer{
  text-align: center;
  padding-top: 0;
}
.el-dialog__body{
  padding: 0 15px;
}
.el-form-a{
  margin-bottom: 15px;
}
.btn{
  background: #F68247;
  border: none;
  width: 100%;
  margin-bottom: 20px;
  &:hover{
    background:#752700 ;
  }
}
.el-form-item__content{
  margin-left: 0 !important;
}
.pic{
  margin: 30px 0;
}
.el-message{
  min-width: 210px;
}
</style>