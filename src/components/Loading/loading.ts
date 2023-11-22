import { ElLoading } from 'element-plus'

export const loading = (text: string) => {
    const loading = ElLoading.service({
        lock: true,
        text,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return loading
}