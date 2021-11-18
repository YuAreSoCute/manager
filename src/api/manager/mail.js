import request from '@/utils/request'

// 查询mail列表
export function listMail(query) {
  return request({
    url: '/manager/mail/list',
    method: 'get',
    params: query
  })
}

// 查询mail详细
export function getMail(mailId) {
  return request({
    url: '/manager/mail/' + mailId,
    method: 'get'
  })
}

// 新增mail
export function addMail(data) {
  return request({
    url: '/manager/mail',
    method: 'post',
    data: data
  })
}

// 修改mail
export function updateMail(data) {
  return request({
    url: '/manager/mail',
    method: 'put',
    data: data
  })
}

// 删除mail
export function delMail(mailId) {
  return request({
    url: '/manager/mail/' + mailId,
    method: 'delete'
  })
}

// 导出mail
export function exportMail(query) {
  return request({
    url: '/manager/mail/export',
    method: 'get',
    params: query
  })
}