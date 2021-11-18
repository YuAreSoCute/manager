import request from '@/utils/request'

// 查询cpaccountFee列表
export function listCpaccountFee(query) {
  return request({
    url: '/manager/cpaccountFee/list',
    method: 'get',
    params: query
  })
}

// 查询cpaccountFee详细
export function getCpaccountFee(accountFeeId) {
  return request({
    url: '/manager/cpaccountFee/' + accountFeeId,
    method: 'get'
  })
}

// 新增cpaccountFee
export function addCpaccountFee(data) {
  return request({
    url: '/manager/cpaccountFee',
    method: 'post',
    data: data
  })
}

// 修改cpaccountFee
export function updateCpaccountFee(data) {
  return request({
    url: '/manager/cpaccountFee',
    method: 'put',
    data: data
  })
}

// 删除cpaccountFee
export function delCpaccountFee(accountFeeId) {
  return request({
    url: '/manager/cpaccountFee/' + accountFeeId,
    method: 'delete'
  })
}

// 导出cpaccountFee
export function exportCpaccountFee(query) {
  return request({
    url: '/manager/cpaccountFee/export',
    method: 'get',
    params: query
  })
}