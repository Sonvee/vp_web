import { request } from '@/utils/request.js'

export function getSentences(params) {
  return request({
    url: '/sentences',
    method: 'get',
    params: params
  })
}

/**
 * 获取好看视频
 * @param {*} params {page: 页码, size: 总数 id}
 * @returns 
 */
export function getVideo(params) {
  return request({
    url: '/getHaoKanVideo',
    method: 'get',
    params: params
  })
}