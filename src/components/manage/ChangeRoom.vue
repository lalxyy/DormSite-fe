<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" style="text-align: left; margin-top: 20px">
      <h2 style="margin-left: 10px">Change Room of Students</h2>
      <h3 style="margin-left: 10px">Note: Only students in same gender can change their rooms.</h3>
      <el-form-item label="Student 1:">
        <el-select v-model="form.student1_id" width="580px">
          <el-option v-for="student in list" :key="student.id" :value="student.id" :label="student.name + ' (' + student.gender + ')'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Student 2:">
        <el-select v-model="form.student2_id" width="580px">
          <el-option v-for="student in list" :key="student.id" :value="student.id" :label="student.name + ' (' + student.gender + ')'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="change()">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ChangeRoom',
    data () {
      return {
        form: {
          student1_id: '',
          student2_id: ''
        },
        list: []
      }
    },
    beforeMount () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$axios.get('/students/display').then(response => {
          if (response.data.students.length > 0) {
            this.list = response.data.students
          }
        })
      },
      change () {
        this.$axios.post('/students/changeDormitory', this.$qs.stringify({
          studentId1: this.form.student1_id,
          studentId2: this.form.student2_id
        })).then(response => {
          window.console.log(response.data)
          if (response.data.result === 'success') {
            this.$message.success('Operation Finished')
          } else {
            this.$message.error('Operation Failed')
          }
          this.loadData()
        })
      }
    }
  }
</script>

<style>
  /**/
</style>
