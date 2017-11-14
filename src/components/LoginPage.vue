<template>
  <div style="height: 51%">
    <div class="login-area">
      <!-- main area -->
      <h2 style="text-align: center; margin-bottom: 30px">
        Welcome to Dormitory System</h2>
      <!--<p style="text-align: center">For Dormitory Management</p>-->
      <el-form ref="loginForm" :model="loginForm" label-width="80px">
        <el-form-item label="Username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="User Type">
          <el-select placeholder="Type..." v-model="loginForm.type"
                     style="width: 100%">
            <el-option label="System Administrator"
                       value="System Administrator"></el-option>
            <el-option label="Instructor" value="Instructor"></el-option>
            <el-option label="Dormitory Staff"
                       value="Dormitory Staff"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item>-->
        <el-button style="width: 100%; border-radius: 30px" type="success"
                   @click="submitLoginForm()">Sign in
        </el-button>
        <!--</el-form-item>-->
      </el-form>
    </div>
    <div class="footer">
      <el-button type="text" style="font-size: large">Help & Guides</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginPage',
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
          type: '',
        },
      }
    },
    methods: {
      submitLoginForm () {
        if (this.loginForm.username === 'admin' &&
          this.loginForm.password === '111') {
          this.$message.success('Signed in Successfully')
//          this.$router.push({name: 'homepage'})
        } else {
          this.$message.error('Username or password incorrect')
        }
      },
    },
  }
</script>

<style>
  .login-area {
    margin: 10% 35% 0 35%;
    height: 100%;
  }

  .footer {
    margin-top: 30px;
    margin-left: 20px;
    height: 30px;
    text-align: left;
    /*background-color: aquamarine;*/
  }
</style>
