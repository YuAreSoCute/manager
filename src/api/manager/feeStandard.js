import request from '@/utils/request'

// 查询feeStandard列表
export function listFeeStandard(query) {
  return request({
    url: '/manager/feeStandard/list',
    method: 'get',
    params: query
  })
}

// 查询feeStandard详细
export function getFeeStandard(standardId) {
  return request({
    url: '/manager/feeStandard/' + standardId,
    method: 'get'
  })
}

// 新增feeStandard
export function addFeeStandard(data) {
  return request({
    url: '/manager/feeStandard',
    method: 'post',
    data: data
  })
}

// 修改feeStandard
export function updateFeeStandard(data) {
  return request({
    url: '/manager/feeStandard',
    method: 'put',
    data: data
  })
}

// 删除feeStandard
export function delFeeStandard(standardId) {
  return request({
    url: '/manager/feeStandard/' + standardId,
    method: 'delete'
  })
}

// 导出feeStandard
export function exportFeeStandard(query) {
  return request({
    url: '/manager/feeStandard/export',
    method: 'get',
    params: query
  })
}