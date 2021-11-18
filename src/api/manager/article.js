import request from '@/utils/request'

// 查询article列表
export function listArticle(query) {
  return request({
    url: '/manager/article/list',
    method: 'get',
    params: query
  })
}

// 查询article详细
export function getArticle(newsId) {
  return request({
    url: '/manager/article/' + newsId,
    method: 'get'
  })
}

// 新增article
export function addArticle(data) {
  return request({
    url: '/manager/article',
    method: 'post',
    data: data
  })
}

// 修改article
export function updateArticle(data) {
  return request({
    url: '/manager/article',
    method: 'put',
    data: data
  })
}

// 删除article
export function delArticle(newsId) {
  return request({
    url: '/manager/article/' + newsId,
    method: 'delete'
  })
}

// 导出article
export function exportArticle(query) {
  return request({
    url: '/manager/article/export',
    method: 'get',
    params: query
  })
}