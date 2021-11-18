import request from '@/utils/request'

// 查询mailInfo列表
export function listMailInfo(query) {
  return request({
    url: '/manager/mailInfo/list',
    method: 'get',
    params: query
  })
}

// 查询mailInfo详细
export function getMailInfo(mailInfoId) {
  return request({
    url: '/manager/mailInfo/' + mailInfoId,
    method: 'get'
  })
}

// 新增mailInfo
export function addMailInfo(data) {
  return request({
    url: '/manager/mailInfo',
    method: 'post',
    data: data
  })
}

// 修改mailInfo
export function updateMailInfo(data) {
  return request({
    url: '/manager/mailInfo',
    method: 'put',
    data: data
  })
}

// 删除mailInfo
export function delMailInfo(mailInfoId) {
  return request({
    url: '/manager/mailInfo/' + mailInfoId,
    method: 'delete'
  })
}

// 导出mailInfo
export function exportMailInfo(query) {
  return request({
    url: '/manager/mailInfo/export',
    method: 'get',
    params: query
  })
}