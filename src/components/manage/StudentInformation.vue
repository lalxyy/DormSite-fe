<template>
  <div>
    <el-row style="margin-top: 20px; margin-bottom: 10px; text-align: left">
      <el-col :span="24">
        <el-button ref="removeButton" type="danger"
                   @click="openRemoveFromDormDialog()" :disabled="getDisabled"><i
          class="el-icon-delete"></i> Remove from Room
        </el-button>
        &nbsp;&nbsp;
        <el-button ref="addButton" type="primary" @click="openAddToDormDialog()"
                   :disabled="getDisabled"><i class="el-icon-circle-plus-outline"></i>
          Add to Room
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="records" stripe style="width: 100%"
              @selection-change="selectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="Name" prop="name" width="100"></el-table-column>
      <el-table-column label="Major" prop="major" width="100"></el-table-column>
      <el-table-column label="Photo" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.photoURL"/>
        </template>
      </el-table-column>
      <el-table-column label="Grade" prop="grade" width="100"></el-table-column>
      <el-table-column label="Phone Number" prop="phoneNumber"
                       width="200"></el-table-column>
      <el-table-column label="College" prop="college"
                       width="100"></el-table-column>
      <el-table-column label="Gender" prop="gender"
                       width="100"></el-table-column>
      <el-table-column label="Room" prop="roomName" width="100"></el-table-column>
      <el-table-column label="Bed Number" prop="bed"
                       width="200"></el-table-column>
      <el-table-column label="Class Number" prop="classNumber"
                       width="200"></el-table-column>
      <el-table-column label="Is Room Leader" prop="isRoomLeader"
                       width="200"></el-table-column>
      <!--<el-table-column label="Legal Electrical Appliance" prop="legalElectricalAppliance"></el-table-column>-->
      <el-table-column label="On Campus" prop="onCampus"
                       width="200"></el-table-column>
    </el-table>
    <el-dialog title="Add Student to Room"
               :visible.sync="addToDormDialogVisible"
               style="text-align: left">
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="Room">
          <el-select v-model="addForm.selectedRoomId" placeholder="Room..."
                     style="width: 100%">
            <el-option v-for="room in roomList.rooms" :key="room.id"
                       :value="room.id" :label="room.roomName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-for="(s, index) in selections" :key="s.id"
                      :label="'Bed of ' + s.name">
          <el-input v-model="addForm.bedIds[index]"
                    placeholder="0 to ..."></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="el-dialog__footer">
        <el-button type="primary" @click="addToDorm()">Submit</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Remove Students from Room"
               :visible.sync="removeFromDormDialogVisible" style="text-align: left">
      <h3>Are you sure to remove the students?</h3>
      <span slot="footer" class="el-dialog__footer">
        <el-button @click="removeFromDormDialogVisible = false">No</el-button>
        &nbsp;
        <el-button type="primary" @click="removeFromDorm()">Yes</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'StudentInformation',
    data () {
      return {
        records: [],
        selections: [],
        roomList: [],
        removeFromDormDialogVisible: false,
        addToDormDialogVisible: false,
        addForm: {
          selectedRoomId: '',
          bedIds: [],
        },
      }
    },
    beforeMount () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$axios.get('/students/display').then(response => {
          window.console.log(response.data)
          if (response.data.students.length > 0) {
            this.records = response.data.students
          }
        }).then(() => this.$axios.get('/students/room')).then(response => {
          window.console.log(response.data)
          this.roomList = response.data
        })
      },
      selectionChange (value) {
        window.console.log('selection changed: ' + value)
        this.selections = value
        window.console.log(this.selections.length)
//        if (this.selections.length === 0) {
//          this.$refs.removeButton.disabled = true
//          this.$refs.addButton.disabled = true
//        } else {
//          window.console.log('not disabled')
//          this.$refs.removeButton.disabled = false
//          this.$refs.addButton.disabled = false
//        }
      },
      openRemoveFromDormDialog () {
        this.removeFromDormDialogVisible = true
      },
      openAddToDormDialog () {
        for (let i = 0; i < this.selections.length; ++i) {
          if (this.selections[i].roomId) {
            this.$message.error(
              'Some students already belong to rooms. Remove them from rooms first to add them to another room.')
            return
          }
          this.addForm.bedIds.push('')
        }
        window.console.log('open add to dorm')
        this.addToDormDialogVisible = true
      },
      addToDorm () {
        let studentIds = []
        for (let i = 0; i < this.selections.length; ++i) {
          studentIds.push(this.selections[i].id)
        }
        let studentString = studentIds.join(',')
        let bedString = this.addForm.bedIds.join(',')

        this.$axios.post('/students/add', this.$qs.stringify({
          studentIds: studentString,
          bedIds: bedString,
          roomId: this.addForm.selectedRoomId,
        })).then(response => {
          window.console.log(response.data)
          if (response.data.status === 'success') {
            this.$message.success('Operation finished')
            this.addToDormDialogVisible = false
            this.loadData()
          } else {
            this.$message.error('Operation failed. Maybe the bed is occupied.')
            this.addToDormDialogVisible = false
            this.loadData()
          }
        })
      },
      removeFromDorm () {
        let studentIds = []
        for (let i = 0; i < this.selections.length; ++i) {
          studentIds.push(this.selections[i].id)
        }
        let roomIds = []
        for (let i = 0; i < this.selections.length; ++i) {
          if (!this.selections[i].roomId) {
            this.$message.error('You can only remove students within rooms.')
          }
          roomIds.push(this.selections[i].roomId)
        }
        let studentString = studentIds.join(',')
        let roomString = roomIds.join(',')
        window.console.log(studentString)
        window.console.log(roomString)

        this.$axios.post('/students/remove', this.$qs.stringify({
          studentId: studentString,
          roomId: roomString
        })).then(response => {
          if (response.data.status === 'success') {
            this.$message.success('Operation finished')
            this.removeFromDormDialogVisible = false
            this.loadData()
          } else {
            this.$message.error('Operation failed')
            this.removeFromDormDialogVisible = false
            this.loadData()
          }
        })
      }
    },
    computed: {
      getDisabled () {
        return this.selections.length === 0
      }
    },
  }
</script>

<style>
  /**/
</style>
