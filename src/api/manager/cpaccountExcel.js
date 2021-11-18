import request from '@/utils/request'

// 查询cpaccountExcel列表
export function listCpaccountExcel(query) {
  return request({
    url: '/manager/cpaccountExcel/list',
    method: 'get',
    params: query
  })
}

// 查询cpaccountExcel详细
export function getCpaccountExcel(accountId) {
  return request({
    url: '/manager/cpaccountExcel/' + accountId,
    method: 'get'
  })
}

// 新增cpaccountExcel
export function addCpaccountExcel(data) {
  return request({
    url: '/manager/cpaccountExcel',
    method: 'post',
    data: data
  })
}

// 修改cpaccountExcel
export function updateCpaccountExcel(data) {
  return request({
    url: '/manager/cpaccountExcel',
    method: 'put',
    data: data
  })
}

// 删除cpaccountExcel
export function delCpaccountExcel(accountId) {
  return request({
    url: '/manager/cpaccountExcel/' + accountId,
    method: 'delete'
  })
}

// 导出cpaccountExcel
export function exportCpaccountExcel(query) {
  return request({
    url: '/manager/cpaccountExcel/export',
    method: 'get',
    params: query
  })
}