import request from '@/utils/request'

// 查询cart列表
export function listCart(query) {
  return request({
    url: '/manager/cart/list',
    method: 'get',
    params: query
  })
}

// 查询cart详细
export function getCart(Id) {
  return request({
    url: '/manager/cart/' + cartId,
    method: 'get'
  })
}

// 新增cart
export function addCart(data) {
  return request({
    url: '/manager/cart',
    method: 'post',
    data: data
  })
}

// 修改cart
export function updateCart(data) {
  return request({
    url: '/manager/cart',
    method: 'put',
    data: data
  })
}

// 删除cart
export function delCart(cartId) {
  return request({
    url: '/manager/cart/' + cartId,
    method: 'delete'
  })
}

// 导出cart
export function exportCart(query) {
  return request({
    url: '/manager/cart/export',
    method: 'get',
    params: query
  })
}