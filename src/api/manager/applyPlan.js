import request from '@/utils/request'

// 查询applyPlan列表
export function listApplyPlan(query) {
  return request({
    url: '/manager/applyPlan/list',
    method: 'get',
    params: query
  })
}

// 查询applyPlan详细
export function getApplyPlan(planId) {
  return request({
    url: '/manager/applyPlan/' + planId,
    method: 'get'
  })
}

// 新增applyPlan
export function addApplyPlan(data) {
  return request({
    url: '/manager/applyPlan',
    method: 'post',
    data: data
  })
}

// 修改applyPlan
export function updateApplyPlan(data) {
  return request({
    url: '/manager/applyPlan',
    method: 'put',
    data: data
  })
}

// 删除applyPlan
export function delApplyPlan(planId) {
  return request({
    url: '/manager/applyPlan/' + planId,
    method: 'delete'
  })
}

// 导出applyPlan
export function exportApplyPlan(query) {
  return request({
    url: '/manager/applyPlan/export',
    method: 'get',
    params: query
  })
}