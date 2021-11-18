import request from '@/utils/request'

// 查询fee列表
export function listFee(query) {
  return request({
    url: '/manager/fee/list',
    method: 'get',
    params: query
  })
}

// 查询fee详细
export function getFee(feeId) {
  return request({
    url: '/manager/fee/' + feeId,
    method: 'get'
  })
}

// 新增fee
export function addFee(data) {
  return request({
    url: '/manager/fee',
    method: 'post',
    data: data
  })
}

// 修改fee
export function updateFee(data) {
  return request({
    url: '/manager/fee',
    method: 'put',
    data: data
  })
}

// 删除fee
export function delFee(feeId) {
  return request({
    url: '/manager/fee/' + feeId,
    method: 'delete'
  })
}

// 导出fee
export function exportFee(query) {
  return request({
    url: '/manager/fee/export',
    method: 'get',
    params: query
  })
}