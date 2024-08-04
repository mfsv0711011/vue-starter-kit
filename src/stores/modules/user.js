import { defineStore } from 'pinia'
import axios from '/src/services/axios.js'
import { computed, reactive } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const state = reactive({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        user: {},
    })

    const fetchToken = (data) =>
        axios.post('/users/auth', data).then((res) => {
            state.accessToken = res.data.accessToken
            state.refreshToken = res.data.refreshToken
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
        })

    function clearToken() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        state.accessToken = localStorage.getItem('accessToken')
        state.refreshToken = localStorage.getItem('refreshToken')
    }

    const refreshToken = (data) =>
        axios.post('/users/auth/refreshToken', { refreshToken: data }).then((res) => {
            state.accessToken = res.data.accessToken
            state.refreshToken = res.data.refreshToken
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
        })

    const fetchAboutMe = () => axios.post('/users/about_me', {}).then((res) => (state.user = res.data))

    return {
        fetchToken,
        clearToken,
        refreshToken,
        fetchAboutMe,
        getAccessToken: computed(() => state.accessToken),
        getRefreshToken: computed(() => state.refreshToken),
        isAuthorized: computed(() => state.accessToken !== null),
        getUser: computed(() => state.user),
    }
})
