import request from '@/utils/request'

// 查询orderDetail列表
export function listOrderDetail(query) {
  return request({
    url: '/manager/orderDetail/list',
    method: 'get',
    params: query
  })
}

// 查询orderDetail详细
export function getOrderDetail(id) {
  return request({
    url: '/manager/orderDetail/' + id,
    method: 'get'
  })
}

// 新增orderDetail
export function addOrderDetail(data) {
  return request({
    url: '/manager/orderDetail',
    method: 'post',
    data: data
  })
}

// 修改orderDetail
export function updateOrderDetail(data) {
  return request({
    url: '/manager/orderDetail',
    method: 'put',
    data: data
  })
}

// 删除orderDetail
export function delOrderDetail(id) {
  return request({
    url: '/manager/orderDetail/' + id,
    method: 'delete'
  })
}

// 导出orderDetail
export function exportOrderDetail(query) {
  return request({
    url: '/manager/orderDetail/export',
    method: 'get',
    params: query
  })
}