import request from '@/utils/request'

// 查询cartInfo列表
export function listCartInfo(query) {
  return request({
    url: '/manager/cartInfo/list',
    method: 'get',
    params: query
  })
}

// 查询cartInfo详细
export function getCartInfo(databaseId) {
  return request({
    url: '/manager/cartInfo/' + databaseId,
    method: 'get'
  })
}

// 新增cartInfo
export function addCartInfo(data) {
  return request({
    url: '/manager/cartInfo',
    method: 'post',
    data: data
  })
}

// 修改cartInfo
export function updateCartInfo(data) {
  return request({
    url: '/manager/cartInfo',
    method: 'put',
    data: data
  })
}

// 删除cartInfo
export function delCartInfo(databaseId) {
  return request({
    url: '/manager/cartInfo/' + databaseId,
    method: 'delete'
  })
}

// 导出cartInfo
export function exportCartInfo(query) {
  return request({
    url: '/manager/cartInfo/export',
    method: 'get',
    params: query
  })
}