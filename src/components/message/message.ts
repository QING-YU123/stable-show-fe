import {ElMessage} from "element-plus";

export const message = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    ElMessage({
        message,
        type,
        offset: 40,
    })
}