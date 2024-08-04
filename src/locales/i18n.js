import uzL from './uz_l.json'
import uzC from './uz_c.json'
import en from './en.json'
import ru from './ru.json'
import { createI18n } from 'vue-i18n'

export default createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'uzC',
    fallbackLocale: 'ru',
    messages: { uzL, uzC, en, ru }
})
