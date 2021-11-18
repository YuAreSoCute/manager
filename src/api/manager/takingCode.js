import request from '@/utils/request'

// 查询takingCode列表
export function listTakingCode(query) {
  return request({
    url: '/manager/takingCode/list',
    method: 'get',
    params: query
  })
}

// 查询takingCode详细
export function getTakingCode(codeId) {
  return request({
    url: '/manager/takingCode/' + codeId,
    method: 'get'
  })
}

// 新增takingCode
export function addTakingCode(data) {
  return request({
    url: '/manager/takingCode',
    method: 'post',
    data: data
  })
}

// 修改takingCode
export function updateTakingCode(data) {
  return request({
    url: '/manager/takingCode',
    method: 'put',
    data: data
  })
}

// 删除takingCode
export function delTakingCode(codeId) {
  return request({
    url: '/manager/takingCode/' + codeId,
    method: 'delete'
  })
}

// 导出takingCode
export function exportTakingCode(query) {
  return request({
    url: '/manager/takingCode/export',
    method: 'get',
    params: query
  })
}