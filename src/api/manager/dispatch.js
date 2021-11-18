import request from '@/utils/request'

// 查询dispatch列表
export function listDispatch(query) {
  return request({
    url: '/manager/dispatch/list',
    method: 'get',
    params: query
  })
}

// 查询dispatch详细
export function getDispatch(dispatchInfoId) {
  return request({
    url: '/manager/dispatch/' + dispatchInfoId,
    method: 'get'
  })
}

// 新增dispatch
export function addDispatch(data) {
  return request({
    url: '/manager/dispatch',
    method: 'post',
    data: data
  })
}

// 修改dispatch
export function updateDispatch(data) {
  return request({
    url: '/manager/dispatch',
    method: 'put',
    data: data
  })
}

// 删除dispatch
export function delDispatch(dispatchInfoId) {
  return request({
    url: '/manager/dispatch/' + dispatchInfoId,
    method: 'delete'
  })
}

// 导出dispatch
export function exportDispatch(query) {
  return request({
    url: '/manager/dispatch/export',
    method: 'get',
    params: query
  })
}