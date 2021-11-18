import request from '@/utils/request'

// 查询applyInfo列表
export function listApplyInfo(query) {
  return request({
    url: '/manager/applyInfo/list',
    method: 'get',
    params: query
  })
}

// 查询applyInfo详细
export function getApplyInfo(applyInfoId) {
  return request({
    url: '/manager/applyInfo/' + applyInfoId,
    method: 'get'
  })
}

// 新增applyInfo
export function addApplyInfo(data) {
  return request({
    url: '/manager/applyInfo',
    method: 'post',
    data: data
  })
}

// 修改applyInfo
export function updateApplyInfo(data) {
  return request({
    url: '/manager/applyInfo',
    method: 'put',
    data: data
  })
}

// 删除applyInfo
export function delApplyInfo(applyInfoId) {
  return request({
    url: '/manager/applyInfo/' + applyInfoId,
    method: 'delete'
  })
}

// 导出applyInfo
export function exportApplyInfo(query) {
  return request({
    url: '/manager/applyInfo/export',
    method: 'get',
    params: query
  })
}