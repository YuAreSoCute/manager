import request from '@/utils/request'

// 查询address列表
export function listAddress(query) {
  return request({
    url: '/manager/address/list',
    method: 'get',
    params: query
  })
}

// 查询address详细
export function getAddress(addressId) {
  return request({
    url: '/manager/address/' + addressId,
    method: 'get'
  })
}

// 新增address
export function addAddress(data) {
  return request({
    url: '/manager/address',
    method: 'post',
    data: data
  })
}

// 修改address
export function updateAddress(data) {
  return request({
    url: '/manager/address',
    method: 'put',
    data: data
  })
}

// 删除address
export function delAddress(addressId) {
  return request({
    url: '/manager/address/' + addressId,
    method: 'delete'
  })
}

// 导出address
export function exportAddress(query) {
  return request({
    url: '/manager/address/export',
    method: 'get',
    params: query
  })
}