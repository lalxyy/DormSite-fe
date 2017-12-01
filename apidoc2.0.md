## API Doc

## 全局约定

- 请求格式（only POST）：application/x-www-urlencode-form
- 返回格式：application/json
- 简记：need auth == need authentication
- 简记：req == request; resp == response
- URL 可能需要再定
- 请求值示例：

| parameter   |  data type | sample value |
|-------------|------------|--------------|
|  id         |   int      | `1`            |

- 返回值示例：
    + code（返回 HTTP 状态码）：200
    + 没有写的返回 HTTP status code 都是 200

```json
{
    "status": "successful"
}
```

## General

## Get detailed information of a student



### Get students information

- need auth
- `/api/students`
- GET
- req

no parameter

- resp
    + code 200: 正常返回

```json
[
    {
        "id": 1,
        "name": "Carl Li",
        "major": "Software Engineering",
        "photoURL": "https://www.google.com",
        "grade": 86,
        "phoneNumber": "13000000000",
        "college": "Software College",
        "gender": "Male",
        "roomId": 20, // 数据库里面的 room id
        "bed": 2,
        "classNumber": 2,
        "isRoomLeader": true,
        "legalElectricalAppliance": true,
        "onCampus": true,
        "dormitoryStaffId": 34, // 数据库里面的 dormitory staff id
        "InstructorId": 33, // 数据库里面的 instructor id
    },
    {
        "id": 4,
        "name": "Shawn Yu",
        "major": "Software Engineering",
        "photoURL": "https://www.google.com",
        "grade": 83,
        "phoneNumber": "13000000003",
        "college": "Software College",
        "gender": "Male",
        "roomId": 20, // 数据库里面的 room id
        "bed": 1,
        "classNumber": 2,
        "isRoomLeader": false,
        "legalElectricalAppliance": true,
        "onCampus": true,
        "dormitoryStaffId": 34, // 数据库里面的 dormitory staff id
        "InstructorId": 33, // 数据库里面的 instructor id
    }
]
```

### add student

- need auth
- `/api/students`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
|   name      |   string   | `"Carl Li"` |
|   major     |  string    | `"Software Engineering"`  |
|  photoURL   | string     | `"https://www.google.com"`  |
|   grade     |   int      |   `86`    |
| phoneNumber | string     | `"13000000000"`  |
| college     | string     |  `"Software College"`  |
|  gender     |  string    |   `"Male"`     |
| classNumber |  int       |    `2`        |

- resp
    + code 200: 添加成功

```json
{
    "status": "successful",
    "studentId": 10, // 数据库生成的 id
}
```

### delete student(s)

- need auth
- `/api/students`
- DELETE
- req
    + 把删除的多个 id 转换成 `"4,20,27,6"` 的形式

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| delete_ids  |  string    |  `"4,20,27,6"` |

- resp
    + code 200: 删除成功

```json
{
    "status": "successful"
}
```

### partially update student info 部分修改学生信息

- 不能用于换寝室，换寝室有专门的entry，见instructor
- 不能用于换宿管
- 不能用于换导员，见instructor
- 不能用于指定寝室长，见instructor
- need auth
- `/api/students/{id}`
- PATCH
- req
    + 修改什么字段就上传什么，字段名称见 get students information 的返回值

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| 修改字段    |  （对应）    |   （）    |

- resp
    + code 200: 成功

```json
{
    "status": "successful"
}
```

## Instructor

### change password

见 system administrator 部分的 partially update instructor info

### Get Sanitary Status of all

- need auth
- `/api/sanitary`
- GET
- req

no parameter

- response
    + code 200

```json
[
    {
        "roomId": 1,
        "roomNumber": "2A219",
        "statuses": [
            {
                "date": "2017-11-09",
                "score": 86
            },
            {
                "date": "2017-11-11",
                "score": 100
            }
        ]
    },
    {
        "roomId": 3,
        "roomNumber": "2A220",
        "statuses": [
            {
                "date": "2017-11-09",
                "score": 100
            },
            {
                "date": "2017-11-11",
                "score": 86
            }
        ]
    }
]
```

### add sanitary status of room

- need auth
- `/api/sanitary/{roomId}`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
|  date       |   string   |  `"2017-11-01"`  |
|  score      |   int      |   `86`     |

- resp
    + code 200: 添加成功

```json
{
    "status": "successful"
}
```

### remove student from dorm

- 该操作不会把学生从系统中删除，只删除了它与该寝室的联系，其余类似API也一样
- need auth
- `/api/room/{roomId}/student/{studentId}`
- DELETE
- req

no parameter

- resp

```json
{
    "status": "successful"
}
```

### add students to dorm

- 如果学生不在系统中，需要先添加学生，获得数据库里面的 student id
- need auth
- `/api/room/{roomId}/student`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| studentId   |   int      |   `10`         |
| bedId       |   int      |  `2`         |

- resp

```json
{
    "status": "successful"
}
```

### appoint room leader

- need auth
- `/api/room/{roomId}/leader`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| studentId   |   int      |   10         |

- resp

```json
{
    "status": "successful"
}
```

### view electrical appliance usage

- need auth
- `/api/electrical-appliance`
- GET
- req

no parameter

- resp

```json
[
    {
        "roomId": 1,
        "roomNumber": "2A219",
        "electricalAppliance": 180,
        "situation": "bad"
    },
    {
        "roomId": 2,
        "roomNumber": "2A216",
        "electricalAppliance": 100,
        "situation": "good"
    }
]
```

### modify electrical appliance usage

- need auth
- `/api/electrical-appliance/{roomId}`
- PATCH
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| roomId      |  int       |  `8`         |
| newSituation |   string   |  `"bad"`    |


- resp

```json
{
    "status": "successful"
}
```


## System Administrator

### Get Instructors Info

- need auth
- `/api/instructor`
- GET
- req

no parameter

- resp

```json
[
    {
        "id": 2,
        "chargedBuildingId": 1,
        "name": "lalxyy",
        "account": "starr2beat",
    },
    {
        "id": 3,
        "chargedBuildingId": 3,
        "name": "Zhicheng",
        "account": "barry"
    }
]
```

### Remove instructor(s)

- need auth
- `/api/instructor`
- DELETE
- req
    + 把删除的多个 id 转换成 `"4,20,27,6"` 的形式

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| delete_ids  |  string    |  `"4,20,27,6"` |

- resp

```json
{
    "status": "successful"
}
```

### Add instructor

- need auth
- `/api/instructor`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| name        |  string    |  `"lalxyy"`  |
| account     |  string    |  `"starr2beat"`  |

- resp

```json
{
    "status": "successful",
    "password": "12345678"
}
```

### partially update instructor info

- need auth
- 不能用于 permission distribution, 详见 permission distribution
- **可以用来修改密码！！传入password字段即可**
- **instructor 自己可以调用自己的**
- 修改的字段可以有多个
- `/api/instructor`
- PATCH
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| id          | int        |    `2`       |
| 需要修改的字段 |   （-）    |  新值         |

- resp

```json
{
    "status": "successful"
}
```

### get dormitory staff info

- need auth
- `/api/dormitory-staff`
- GET
- req

no parameter

- resp

```json
[
    {
        "id": 1,
        "name": "Carl Li",
        "account": "lalxyy",
        "chargedBuildingId": 13
    },
    {
        "id": 3,
        "name": "Zhicheng",
        "account": "barry",
        "chargedBuildingId": 14
    }
]
```

### change password

- system administrator 可以修改任何人的密码
- instructor 和 dormitory staff 只能各自修改自己的密码，具体见“部分修改信息”部分
- need auth
- `/api/password`
- PATCH
- req
    + 如果不指定 `target_user_type`，默认为 system administrator 自己
    + 只有指定了 `target_user_type` 才需要传入 `target_user_id`，否则不需指定

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| target_user_id |  int (optional)     |   `int`     |
| target_user_type  | string (optional)  |   `"dormitory-staff" or "instructor" or "system-administrator"` |
|  password   |  string    | `"12345678"` |

### set instructor permission

- need auth
- `/api/instructor/permission`
- POST
- req
    + id: id of instructor

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| id          | int        |   `2`        |
| floors      | string     | `"2,6,4"`    |
| charged_building_id | int   |  `34`     |

- resp

```json
{
    "status": "successful"
}
```

### set dormitory staff permission

- need auth
- `/api/dormitory-staff/permission`
- POST
- req
    + id: id of dormitory staff

```json
{
    "status": "successful"
}
```

### set dormitory structure

- need auth
- `/api/building/structure`
- POST
- req
    + id: id of building

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| id          |  int       |  `3`         |
| floors      |  int       |  `6`         |
| rooms_per_floor |  int      |  `60`     |

- resp

```json
{
    "status": "successful"
}
```

## Dormitory Staff

### Add special actions

- need auth
- `/api/special-action`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| room_id     |  int       |   `23`       |
| student_id  |  int       |   `145`      |
| action_type |  string    | `"going back late"`  |
| date        |  string      | `2017-11-11` |

- resp

```json
{
    "status": "successful"
}
```

### get all special actions

- need auth
- `/api/special-action`
- GET
- req

no parameter

- resp

```json
[
    {
        "id": 12,
        "roomId": 6,
        "roomName": "2A219", // Room 类里面的 roomId
        "studentId": 3,
        "actionType": "going back late",
        "date": "2017-11-23"
    },
    {
        "id": 13,
        "roomId": 76,
        "roomName": "2A110", // Room 类里面的 roomId
        "studentId": 237,
        "actionType": "going out early",
        "date": "2017-11-22"
    }
]
```

### get all repairing equipment

- need auth
- `/api/repairing-equipment`
- GET
- req

no parameter

- resp

```json
[
    {
        "id": 23,
        "roomId": 24,
        "roomName": "wrethoehw",// Room 类里面的 roomId
        "description": "wriekfhrweikfwikfhnwef", 
        "date": "2017-11-23",
        "repaired": false
    },
    {
        "id": 23,
        "roomId": 24,
        "roomName": "wrethoehw",// Room 类里面的 roomId
        "description": "wriekfhrweikfwikfhnwef", 
        "date": "2017-11-23",
        "repaired": false
    }
]
```

### add new repairing equipment

- need auth
- `/api/repairing-equipment`
- GET
- req
    + 默认 repaired status 为 false

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| roomId      |  int       |  `20`        |
| description | string     | `"elkjnfrsdj"` |
| date        | string     | `"2017-11-03"` |

- resp

```json
{
    "status": "successful"
}
```

### change repairing equipment status

- need auth
- `/api/repairing-equipment`
- PATCH
- req
    + id: repairing equipment id

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| id          |  int       |  `20`        |
| repaired    |  bool      |  `true`      |

- resp

```json
{
    "status": "successful"
}
```

### get all records of lending keys

- need auth
- `/api/lending-keys`
- GET
- req

no parameter

- resp

```json
[
    {
        "id": 345,
        "studentId": 20,
        "studentName": "Ang Li",
        "roomId": 23,
        "roomName": "2A219", // Room 类里面的 roomId
        "date": "2017-11-23",
        "returned": true
    },
    {
        "id": 370,
        "studentId": 21,
        "studentName": "Zhicheng Zhan",
        "roomId": 56,
        "roomName": "2A126", // Room 类里面的 roomId
        "date": "2017-11-24",
        "returned": false
    }
]
```

### add lending keys record

- need auth
- `/api/lending-keys`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| student_id  |  int       |  `21`        |
| room_id     |  int       |  `23`        |
| date        |  string    |  `"2017-10-10"` |

- resp

```json
{
    "status": "successful"
}
```

### change lending keys status

- need auth
- `/api/lending-keys`
- PATCH
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| id          |  int       |  `21`        |
| returned    |  bool      |  `true`      |

- resp

```json
{
    "status": "successful"
}
```

### get all visitor records

- need auth
- `/api/visitor`
- GET
- req

no parameter

- resp

```json
[
    {
        "id": 23,
        "name": "Carl",
        "visitorId": 3,
        "reason": "sdakhgfewsikjfsd",
        "date": "2017-11-23",
        "leaveStatus": false
    },
    {
        "id": 24,
        "name": "Barry",
        "visitorId": 6,
        "reason": "ewouhfojskf ksrfbhnjsdfkh weljkrfhnwaeklj",
        "date": "2017-10-24",
        "leaveStatus": true
    }
]
```

### add new visitor record

- need auth
- `/api/visitor`
- POST
- req

| parameter   |  data type | sample value |
|-------------|------------|--------------|
| name        |  string    |  `"Carl"`    |
| visitor_id   |  int       |  `6`         |
| reason      |  string    |  `"wsdljfhwesa wsefkjnwer"` |
| date        |  string    |  `"2017-11-23"` |
| leave_status |  bool     |   `false`    |

### clear all records

- need auth
- `/api/dormitory-staff/clear-records`
- DELETE
- req

no parameter

- resp

```json
{
    "status": "successful"
}
```




