<template>
  <div>
    <el-row style="margin-top: 20px; margin-bottom: 10px; text-align: left">
      <el-col :span="24">
        <el-button ref="addButton" type="danger" @click="addV = true">
          <i class="el-icon-plus"></i>
          Add
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="records" stripe style="width: 100%; text-align: left">
      <el-table-column label="Room" prop="roomName"></el-table-column>
      <el-table-column label="Situation" prop="situation"></el-table-column>
      <el-table-column label="Student" prop="studentName"></el-table-column>
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button type="primary" @click="openUpdateDialog(scope.row)">Update</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Update" style="text-align: left" :visible.sync="updateV">
      <el-form ref="updateForm" :model="updateForm" label-width="80px">
        <el-form-item label="Student">
          {{record.studentName}}
        </el-form-item>
        <el-form-item label="Room">
          {{record.roomName}}
        </el-form-item>
        <el-form-item label="Situation">
          <el-input v-model="updateForm.newSituation" placeholder="New Situation..."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="el-dialog__footer">
        <el-button type="primary" @click="update()">Submit</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Add" style="text-align: left" :visible.sync="addV">
      <el-form ref="updateForm" :model="updateForm" label-width="80px">
        <el-form-item label="Room">
          <el-select v-model="addForm.roomIndex" placeholder="Room..." style="width: 100%">
            <el-option v-for="(room, index) in roomList" :key="room.id" :value="index" :label="room.roomName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Student" v-if="!addInStudentDisabled">
          <el-select v-model="addForm.studentId" placeholder="Student..." style="width: 100%" :disabled="addInStudentDisabled">
            <el-option v-for="(student, index) in roomList[addForm.roomIndex].students" :key="student.id" :value="student.id" :label="student.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Situation">
          <el-input v-model="addForm.situation" placeholder="Situation..."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="el-dialog__footer">
        <el-button type="primary" @click="add()">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ElectricalApplianceUsage',
    data () {
      return {
        records: [],
        addV: false,
        updateV: false,
        record: {},
        updateForm: {
          newSituation: ''
        },
        roomList: [],
        addForm: {
          roomIndex: '',
          situation: '',
          studentId: ''
        }
      }
    },
    beforeMount () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$axios.get('/electrical-appliance/display').then(response => {
          if (response.data.electricalApplianceUsagesStatuses.length > 0) {
            this.records = response.data.electricalApplianceUsagesStatuses
          }
        })

        this.$axios.get('/students/room').then(response => {
          window.console.log(response.data.rooms)
          this.roomList = response.data.rooms
        })
      },
      openUpdateDialog (record) {
        this.record = record
        this.updateV = true
      },
      update () {
        this.$axios.post('/electrical-appliance/update', this.$qs.stringify({
          id: this.record.id,
          newSituation: this.updateForm.newSituation
        })).then(response => {
          window.console.log(response.data)
          if (response.data.status === 'success') {
            this.$message.success('Added Successfully')
          } else {
            this.$message.error('Operation Failed')
          }
          this.updateV = false
          this.loadData()
        })
      },
      add () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateString = [year, (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('-')

        this.$axios.post('/electrical-appliance/add', this.$qs.stringify({
          studentId: this.addForm.studentId,
          newSituation: this.addForm.situation,
          date: dateString
        })).then(response => {
          window.console.log(response.data)
          if (response.data.status === 'success') {
            this.$message.success('Added Successfully')
          } else {
            this.$message.error('Operation Failed')
          }
          this.addV = false
          this.loadData()
        })
      }
    },
    computed: {
      addInStudentDisabled () {
        return this.addForm.roomIndex === ''
      }
    }
  }
</script>

<style>
  /**/
</style>
