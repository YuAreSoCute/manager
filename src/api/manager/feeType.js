import request from '@/utils/request'

// 查询feeType列表
export function listFeeType(query) {
  return request({
    url: '/manager/feeType/list',
    method: 'get',
    params: query
  })
}

// 查询feeType详细
export function getFeeType(feeTypeId) {
  return request({
    url: '/manager/feeType/' + feeTypeId,
    method: 'get'
  })
}

// 新增feeType
export function addFeeType(data) {
  return request({
    url: '/manager/feeType',
    method: 'post',
    data: data
  })
}

// 修改feeType
export function updateFeeType(data) {
  return request({
    url: '/manager/feeType',
    method: 'put',
    data: data
  })
}

// 删除feeType
export function delFeeType(feeTypeId) {
  return request({
    url: '/manager/feeType/' + feeTypeId,
    method: 'delete'
  })
}

// 导出feeType
export function exportFeeType(query) {
  return request({
    url: '/manager/feeType/export',
    method: 'get',
    params: query
  })
}