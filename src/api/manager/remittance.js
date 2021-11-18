import request from '@/utils/request'

// 查询remittance列表
export function listRemittance(query) {
  return request({
    url: '/manager/remittance/list',
    method: 'get',
    params: query
  })
}

// 查询remittance详细
export function getRemittance(remittanceId) {
  return request({
    url: '/manager/remittance/' + remittanceId,
    method: 'get'
  })
}

// 新增remittance
export function addRemittance(data) {
  return request({
    url: '/manager/remittance',
    method: 'post',
    data: data
  })
}

// 修改remittance
export function updateRemittance(data) {
  return request({
    url: '/manager/remittance',
    method: 'put',
    data: data
  })
}

// 删除remittance
export function delRemittance(remittanceId) {
  return request({
    url: '/manager/remittance/' + remittanceId,
    method: 'delete'
  })
}

// 导出remittance
export function exportRemittance(query) {
  return request({
    url: '/manager/remittance/export',
    method: 'get',
    params: query
  })
}