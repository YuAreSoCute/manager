import request from '@/utils/request'

// 查询invoice列表
export function listInvoice(query) {
  return request({
    url: '/manager/invoice/list',
    method: 'get',
    params: query
  })
}

// 查询invoice详细
export function getInvoice(invoiceId) {
  return request({
    url: '/manager/invoice/' + invoiceId,
    method: 'get'
  })
}

// 新增invoice
export function addInvoice(data) {
  return request({
    url: '/manager/invoice',
    method: 'post',
    data: data
  })
}

// 修改invoice
export function updateInvoice(data) {
  return request({
    url: '/manager/invoice',
    method: 'put',
    data: data
  })
}

// 删除invoice
export function delInvoice(invoiceId) {
  return request({
    url: '/manager/invoice/' + invoiceId,
    method: 'delete'
  })
}

// 导出invoice
export function exportInvoice(query) {
  return request({
    url: '/manager/invoice/export',
    method: 'get',
    params: query
  })
}