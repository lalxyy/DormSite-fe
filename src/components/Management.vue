<template>
  <div>
    <!--<el-row style="height: 40px">-->
      <!--<el-col :span="24" style="text-align: left">-->
        <!--<h2>&nbsp;&nbsp;DormSite</h2>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <el-row>
      <el-col :span="5" style="text-align: left">
        <el-row>
          <el-col :span="24" style="padding: 5px 20px; background-color: #25A89C; color: white">
            <h3>{{name}}</h3>
            <h4>{{userType}}</h4>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="min-height: 100%">
            <el-menu mode="vertical" :router="true" style="min-height: 100%">
              <el-menu-item index="/manage/sanitary-status">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">Sanitary Status</span>
              </el-menu-item>
              <el-menu-item index="/manage/students">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">Display Students</span>
              </el-menu-item>
              <el-menu-item index="/manage/electrical-appliance">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">Electrical Appliance Usage</span>
              </el-menu-item>
              <el-menu-item index="/manage/change-room">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">Change Room</span>
              </el-menu-item>
              <el-menu-item index="/manage/appoint-room-leader">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">Appoint Room Leader</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="19" style="padding: 8px">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    name: 'Management',
    data () {
      return {
        userType: 'Type',
        name: 'Your Name'
      }
    },
    beforeMount () {
      this.$axios.get('/user/info').then(response => {
        window.console.log(response.data)
        if (response.data.code && response.data.code === '203') {
          this.$router.push({path: '/login'})
        }
        this.userType = response.data.type
        this.name = response.data.username
      })
    }
  }
</script>

<style>
  /**/
</style>
