import request from '@/utils/request'

// 查询agency列表
export function listAgency(query) {
  return request({
    url: '/manager/agency/list',
    method: 'get',
    params: query
  })
}

// 查询agency详细
export function getAgency(agencyId) {
  return request({
    url: '/manager/agency/' + agencyId,
    method: 'get'
  })
}

// 新增agency
export function addAgency(data) {
  return request({
    url: '/manager/agency',
    method: 'post',
    data: data
  })
}

// 修改agency
export function updateAgency(data) {
  return request({
    url: '/manager/agency',
    method: 'put',
    data: data
  })
}

// 删除agency
export function delAgency(agencyId) {
  return request({
    url: '/manager/agency/' + agencyId,
    method: 'delete'
  })
}

// 导出agency
export function exportAgency(query) {
  return request({
    url: '/manager/agency/export',
    method: 'get',
    params: query
  })
}