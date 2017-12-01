<template>
  <div>
    <h2 style="text-align: left; margin-left: 20px">Appoint Room Leader</h2>
    <el-form ref="form" :model="form" label-width="80px" style="text-align: left">
      <el-form-item label="Room">
        <el-select v-model="form.roomIndex" placeholder="Room..." style="width: 100%">
          <el-option v-for="(room, index) in rooms" :key="room.id" :value="index" :label="room.roomName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Student" v-if="!addInStudentDisabled">
        <el-select v-model="form.studentId" placeholder="Student..." style="width: 100%" v-if="!addInStudentDisabled" :disabled="addInStudentDisabled">
          <el-option v-for="(student, index) in rooms[form.roomIndex].students" :key="student.id" :value="student.id" :label="student.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="appointRoomLeader()">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'AppointRoomLeader',
    data () {
      return {
        rooms: [],
        form: {
          studentId: '',
          roomIndex: ''
        }
      }
    },
    beforeMount () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$axios.get('/students/room').then(response => {
          window.console.log(response.data.rooms)
          if (response.data.rooms.length > 0) {
            this.rooms = response.data.rooms
          }
        })
      },
      appointRoomLeader () {
        this.$axios.post('/students/leader', this.$qs.stringify({
          studentId: this.form.studentId,
          roomId: this.rooms[this.form.roomIndex].id
        })).then(response => {
          if (response.data.status === 'success') {
            this.$message.success('Operation finished')
            this.loadData()
          } else {
            this.$message.error('Operation failed')
            this.loadData()
          }
        })
      }
    },
    computed: {
      addInStudentDisabled () {
        return this.form.roomIndex === ''
      }
    }
  }
</script>

<style>
  /**/
</style>
