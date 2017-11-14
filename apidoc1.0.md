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

```json
{
    "status": "successful"
}
```

## General

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
| studentId   |   int      |   10         |

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



