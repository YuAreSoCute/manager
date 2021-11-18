import request from '@/utils/request'

// 查询applyType列表
export function listApplyType(query) {
  return request({
    url: '/manager/applyType/list',
    method: 'get',
    params: query
  })
}

// 查询applyType详细
export function getApplyType(typeId) {
  return request({
    url: '/manager/applyType/' + typeId,
    method: 'get'
  })
}

// 新增applyType
export function addApplyType(data) {
  return request({
    url: '/manager/applyType',
    method: 'post',
    data: data
  })
}

// 修改applyType
export function updateApplyType(data) {
  return request({
    url: '/manager/applyType',
    method: 'put',
    data: data
  })
}

// 删除applyType
export function delApplyType(typeId) {
  return request({
    url: '/manager/applyType/' + typeId,
    method: 'delete'
  })
}

// 导出applyType
export function exportApplyType(query) {
  return request({
    url: '/manager/applyType/export',
    method: 'get',
    params: query
  })
}