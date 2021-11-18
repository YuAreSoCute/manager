import request from '@/utils/request'

// 查询noticeOne列表
export function listNoticeOne(query) {
  return request({
    url: '/manager/noticeOne/list',
    method: 'get',
    params: query
  })
}

// 查询noticeOne详细
export function getNoticeOne(noticeId) {
  return request({
    url: '/manager/noticeOne/' + noticeId,
    method: 'get'
  })
}

// 新增noticeOne
export function addNoticeOne(data) {
  return request({
    url: '/manager/noticeOne',
    method: 'post',
    data: data
  })
}

// 修改noticeOne
export function updateNoticeOne(data) {
  return request({
    url: '/manager/noticeOne',
    method: 'put',
    data: data
  })
}

// 删除noticeOne
export function delNoticeOne(noticeId) {
  return request({
    url: '/manager/noticeOne/' + noticeId,
    method: 'delete'
  })
}

// 导出noticeOne
export function exportNoticeOne(query) {
  return request({
    url: '/manager/noticeOne/export',
    method: 'get',
    params: query
  })
}