import request from '@/utils/request'

// 查询invoiceDetail列表
export function listInvoiceDetail(query) {
  return request({
    url: '/manager/invoiceDetail/list',
    method: 'get',
    params: query
  })
}

// 查询invoiceDetail详细
export function getInvoiceDetail(invoiceDetailId) {
  return request({
    url: '/manager/invoiceDetail/' + invoiceDetailId,
    method: 'get'
  })
}

// 新增invoiceDetail
export function addInvoiceDetail(data) {
  return request({
    url: '/manager/invoiceDetail',
    method: 'post',
    data: data
  })
}

// 修改invoiceDetail
export function updateInvoiceDetail(data) {
  return request({
    url: '/manager/invoiceDetail',
    method: 'put',
    data: data
  })
}

// 删除invoiceDetail
export function delInvoiceDetail(invoiceDetailId) {
  return request({
    url: '/manager/invoiceDetail/' + invoiceDetailId,
    method: 'delete'
  })
}

// 导出invoiceDetail
export function exportInvoiceDetail(query) {
  return request({
    url: '/manager/invoiceDetail/export',
    method: 'get',
    params: query
  })
}