import Mock from 'mockjs'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

Mock.mock(/\/user\/listpage/, 'get', getUserList) //模拟分页查询用户信息接口
Mock.mock(/\/user\/remove/, 'get', deleteUser)   //模拟删除用户信息接口
Mock.mock(/\/user\/add/, 'get', createUser)     //模拟添加用户信息接口
Mock.mock(/\/user\/edit/, 'get', updateUser)   //模拟编辑用户信息接口


function getUserList() {
  return List
}

function deleteUser() {
  return
}

function createUser() {
  return
}

function updateUser() {
  return
}