import request from '@/utils/request'

// 查询orderAddress列表
export function listOrderAddress(query) {
  return request({
    url: '/manager/orderAddress/list',
    method: 'get',
    params: query
  })
}

// 查询orderAddress详细
export function getOrderAddress(orderAddressId) {
  return request({
    url: '/manager/orderAddress/' + orderAddressId,
    method: 'get'
  })
}

// 新增orderAddress
export function addOrderAddress(data) {
  return request({
    url: '/manager/orderAddress',
    method: 'post',
    data: data
  })
}

// 修改orderAddress
export function updateOrderAddress(data) {
  return request({
    url: '/manager/orderAddress',
    method: 'put',
    data: data
  })
}

// 删除orderAddress
export function delOrderAddress(orderAddressId) {
  return request({
    url: '/manager/orderAddress/' + orderAddressId,
    method: 'delete'
  })
}

// 导出orderAddress
export function exportOrderAddress(query) {
  return request({
    url: '/manager/orderAddress/export',
    method: 'get',
    params: query
  })
}