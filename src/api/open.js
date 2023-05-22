import { request } from '@/utils/request.js'

export function getSentences(params) {
  return request({
    url: '/sentences',
    method: 'get',
    params: params
  })
}

/**
 * 获取短视频
 * @param {*} params {page: 页码, size: 总数 id}
 * @returns 
 */
export function getHaoKanVideo(params) {
  return request({
    url: '/getHaoKanVideo',
    method: 'get',
    params: params
  })
}

/**
 * 获取短视频
 * @param {*} params {page: 页码, size: 总数 id}
 * @returns 
 */
export function getMiniVideo(params) {
  return request({
    url: '/getMiniVideo',
    method: 'get',
    params: params
  })
}

/**
 * 获取短视频
 * @param {*} params {page: 页码, size: 总数 id}
 * @returns 
 */
export function getShortVideo(params) {
  return request({
    url: '/getShortVideo',
    method: 'get',
    params: params
  })
}