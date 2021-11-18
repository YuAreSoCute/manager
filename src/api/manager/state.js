import request from '@/utils/request'

// 查询state列表
export function listState(query) {
  return request({
    url: '/manager/state/list',
    method: 'get',
    params: query
  })
}

// 查询state详细
export function getState(stateId) {
  return request({
    url: '/manager/state/' + stateId,
    method: 'get'
  })
}

// 新增state
export function addState(data) {
  return request({
    url: '/manager/state',
    method: 'post',
    data: data
  })
}

// 修改state
export function updateState(data) {
  return request({
    url: '/manager/state',
    method: 'put',
    data: data
  })
}

// 删除state
export function delState(stateId) {
  return request({
    url: '/manager/state/' + stateId,
    method: 'delete'
  })
}

// 导出state
export function exportState(query) {
  return request({
    url: '/manager/state/export',
    method: 'get',
    params: query
  })
}