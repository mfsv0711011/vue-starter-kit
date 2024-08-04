import axios from 'axios'
import { useUserStore } from '@/stores/modules/user.js'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL + '/api'
axios.defaults.headers.post['Content-Type'] = 'application/ld+json'
axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json'

axios.interceptors.request.use((config) => {
    if (config.url !== '/users/auth') {
        config.headers.Authorization = 'bearer ' + useUserStore().getAccessToken
    }

    return config
})
export default axios
