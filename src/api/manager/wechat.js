import request from '@/utils/request'

// 查询wechat列表
export function listWechat(query) {
  return request({
    url: '/manager/wechat/list',
    method: 'get',
    params: query
  })
}

// 查询wechat详细
export function getWechat(wxId) {
  return request({
    url: '/manager/wechat/' + wxId,
    method: 'get'
  })
}

// 新增wechat
export function addWechat(data) {
  return request({
    url: '/manager/wechat',
    method: 'post',
    data: data
  })
}

// 修改wechat
export function updateWechat(data) {
  return request({
    url: '/manager/wechat',
    method: 'put',
    data: data
  })
}

// 删除wechat
export function delWechat(wxId) {
  return request({
    url: '/manager/wechat/' + wxId,
    method: 'delete'
  })
}

// 导出wechat
export function exportWechat(query) {
  return request({
    url: '/manager/wechat/export',
    method: 'get',
    params: query
  })
}