import request from '@/utils/request'

// 查询noticeTwo列表
export function listNoticeTwo(query) {
  return request({
    url: '/manager/noticeTwo/list',
    method: 'get',
    params: query
  })
}

// 查询noticeTwo详细
export function getNoticeTwo(noticeId) {
  return request({
    url: '/manager/noticeTwo/' + noticeId,
    method: 'get'
  })
}

// 新增noticeTwo
export function addNoticeTwo(data) {
  return request({
    url: '/manager/noticeTwo',
    method: 'post',
    data: data
  })
}

// 修改noticeTwo
export function updateNoticeTwo(data) {
  return request({
    url: '/manager/noticeTwo',
    method: 'put',
    data: data
  })
}

// 删除noticeTwo
export function delNoticeTwo(noticeId) {
  return request({
    url: '/manager/noticeTwo/' + noticeId,
    method: 'delete'
  })
}

// 导出noticeTwo
export function exportNoticeTwo(query) {
  return request({
    url: '/manager/noticeTwo/export',
    method: 'get',
    params: query
  })
}