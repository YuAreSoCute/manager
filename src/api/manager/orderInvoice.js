import request from '@/utils/request'

// 查询orderInvoice列表
export function listOrderInvoice(query) {
  return request({
    url: '/manager/orderInvoice/list',
    method: 'get',
    params: query
  })
}

// 查询orderInvoice详细
export function getOrderInvoice(orderInvoiceId) {
  return request({
    url: '/manager/orderInvoice/' + orderInvoiceId,
    method: 'get'
  })
}

// 新增orderInvoice
export function addOrderInvoice(data) {
  return request({
    url: '/manager/orderInvoice',
    method: 'post',
    data: data
  })
}

// 修改orderInvoice
export function updateOrderInvoice(data) {
  return request({
    url: '/manager/orderInvoice',
    method: 'put',
    data: data
  })
}

// 删除orderInvoice
export function delOrderInvoice(orderInvoiceId) {
  return request({
    url: '/manager/orderInvoice/' + orderInvoiceId,
    method: 'delete'
  })
}

// 导出orderInvoice
export function exportOrderInvoice(query) {
  return request({
    url: '/manager/orderInvoice/export',
    method: 'get',
    params: query
  })
}