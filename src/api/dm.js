import request from '../utils/request';


export function getDM() {
    return request({
        url: '/api',
        method: 'get',
    })
}

export function getDMByBv(parm) {
    return request({
        url: '/api',
        method: 'post',
        data: parm
    })
}

export function getUpsVideo(param) {
    return request({
        url: '/api/upVideos',
        method: 'post',
        data: param
    })
}

export function getVedioInfo(param) {
    return request({
        url: '/api/videoInfo',
        method: 'post',
        data: param
    })
}