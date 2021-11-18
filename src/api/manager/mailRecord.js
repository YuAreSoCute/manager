import request from '@/utils/request'

// 查询mailRecord列表
export function listMailRecord(query) {
  return request({
    url: '/manager/mailRecord/list',
    method: 'get',
    params: query
  })
}

// 查询mailRecord详细
export function getMailRecord(recordId) {
  return request({
    url: '/manager/mailRecord/' + recordId,
    method: 'get'
  })
}

// 新增mailRecord
export function addMailRecord(data) {
  return request({
    url: '/manager/mailRecord',
    method: 'post',
    data: data
  })
}

// 修改mailRecord
export function updateMailRecord(data) {
  return request({
    url: '/manager/mailRecord',
    method: 'put',
    data: data
  })
}

// 删除mailRecord
export function delMailRecord(recordId) {
  return request({
    url: '/manager/mailRecord/' + recordId,
    method: 'delete'
  })
}

// 导出mailRecord
export function exportMailRecord(query) {
  return request({
    url: '/manager/mailRecord/export',
    method: 'get',
    params: query
  })
}