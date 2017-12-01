<template>
  <div>
    <el-row style="margin-top: 20px; margin-bottom: 10px; text-align: left">
      <el-col :span="24">
        <el-button type="primary" @click="addDialogVisible = true"><i class="el-icon-plus"></i> Add</el-button>
      </el-col>
    </el-row>
    <el-table :data="sanitaryData" stripe style="width: 100%">
      <el-table-column prop="roomName" label="Room"
                       width="180"></el-table-column>
      <el-table-column prop="roomLeader" label="Room Leader" width="180"></el-table-column>
      <el-table-column label="Sanitary Records">
        <template slot-scope="scope">
          <div v-for="status in scope.row.statuses" :key="status.date"
               style="text-align: left">
            <p>{{ status.date }} / Score: {{ status.score }}</p>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Add New Sanitary Record" :visible.sync="addDialogVisible" style="text-align: left">
      <h3>Note: The date of inspection would be set to current date by default.</h3>
      <el-form ref="addingForm" :model="addingForm" label-width="80px">
        <el-form-item label="Room">
          <el-select v-model="addingForm.selectedRoomId" placeholder="Room..." style="width: 100%">
            <el-option v-for="room in roomList.rooms" :key="room.id" :value="room.id" :label="room.roomName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Score">
          <el-input v-model="addingForm.score" placeholder="0 to 100"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="el-dialog__footer">
        <el-button type="primary" @click="addSanitaryStatus(addingForm.selectedRoomId, addingForm.score)">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'SanitaryStatus',
    beforeMount () {
      this.loadData()
    },
    data () {
      return {
        sanitaryData: [],
        checkingTimes: [],
        addDialogVisible: false,
        roomList: [],
        addingForm: {
          selectedRoomId: '',
          score: ''
        }
      }
    },
    methods: {
      loadData () {
        this.$axios.get('/sanitary/display').then(response => {
          window.console.log(response.data)
          if (response.data.sanitaryStatuses.length > 0) {
            for (let i = 0; i <
            response.data.sanitaryStatuses[0].statuses.length; ++i) {
              this.checkingTimes.push(
                response.data.sanitaryStatuses[0].statuses[i].date)
            }
          }
          window.console.log(this.checkingTimes)

          // for all receiving data
          this.sanitaryData = response.data.sanitaryStatuses
        })

        this.$axios.get('/students/room').then(response => {
          window.console.log(response.data)
          this.roomList = response.data
        })
      },
      addSanitaryStatus (roomId, score) {
        if (roomId < 0) {
          this.$message.error('Invalid room')
          return
        }
        if (score < 0) {
          this.$message.error('Invalid score')
          return
        }
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateString = [year, (month > 9 ? '' : '0') + month, (day > 9 ? '' : '0') + day].join('-')
        window.console.log(dateString)

        this.$axios.post('/sanitary/add', this.$qs.stringify({
          'roomId': roomId,
          'date': dateString,
          'score': score
        })).then(response => {
          window.console.log(response.data)
          if (response.data.status === 'success') {
            this.$message.success('Added Successfully')
          } else {
            this.$message.error('Operation Failed')
          }
        })
        this.addDialogVisible = false
        this.loadData()
      }
    },
  }
</script>

<style>
  /**/
</style>
