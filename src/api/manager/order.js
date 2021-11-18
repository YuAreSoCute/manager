import request from '@/utils/request'

// 查询order列表
export function listOrder(query) {
  return request({
    url: '/manager/order/list',
    method: 'get',
    params: query
  })
}

// 查询order详细
export function getOrder(orderId) {
  return request({
    url: '/manager/order/' + orderId,
    method: 'get'
  })
}

// 新增order
export function addOrder(data) {
  return request({
    url: '/manager/order',
    method: 'post',
    data: data
  })
}

// 修改order
export function updateOrder(data) {
  return request({
    url: '/manager/order',
    method: 'put',
    data: data
  })
}

// 删除order
export function delOrder(orderId) {
  return request({
    url: '/manager/order/' + orderId,
    method: 'delete'
  })
}

// 导出order
export function exportOrder(query) {
  return request({
    url: '/manager/order/export',
    method: 'get',
    params: query
  })
}