<template>
    <div
        ref="languageSwitcher"
        :class="{ 'bg-active-bg': isOpenSelect }"
        class="transition-all duration-200 cursor-pointer relative flex flex-col rounded-lg gap-2 w-20 select-none"
        @click="toggleSelectLang"
    >
        <div
            class="h-fit w-full flex gap-2 justify-around group p-2 hover:bg-hover-bg transition-all duration-200 rounded-lg"
        >
<!--            <img class="rounded h-[20px]" alt="uz" :src="'/images/flags/' + activeLang?.imgPath" />-->
            <div class="uppercase text-sm font-semibold text-black">
                {{ activeLang?.name }}
            </div>
        </div>

        <div
            v-show="isOpenSelect"
            class="shadow-[0_2px_10px_0_#78789D] transition-all duration-200 absolute bg-[#F4F3FD] z-30 flex flex-col left-0 w-full"
            :class="{ 'bottom-10': positionSelectMenu === 'top', 'top-full': positionSelectMenu === 'bottom' }"
        >
            <div v-for="lang of langs" :key="lang.id" @click="selectLang(lang.id)">
                <div
                    :class="{ 'bg-active-bg': lang.id === activeLang.id }"
                    class="group transition-all duration-200 flex justify-around w-full gap-2 cursor-pointer hover:bg-hover-bg py-3 px-2"
                >
<!--                    <img class="h-5 rounded" alt="uz" :src="'/images/flags/' + lang.imgPath" />-->
                    <div class="uppercase text-sm font-semibold text-black">
                        {{ lang.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { positionSelectMenu } = defineProps({
    positionSelectMenu: {
        type: String,
        default: 'bottom'
    }
})

const langs = reactive([
    { id: 1, locale: 'uzL', name: 'Uz', imgPath: 'UZ.svg' },
    { id: 2, locale: 'uzC', name: 'Уз', imgPath: 'UZ.svg' },
    { id: 3, locale: 'ru', name: 'Ру', imgPath: 'RU.svg' },
    { id: 4, locale: 'en', name: 'En', imgPath: 'US.svg' }
])

const activeLangId = ref(1)
const isOpenSelect = ref(false)
const languageSwitcher = ref(null)

const activeLang = computed(() => langs[activeLangId.value - 1])
const toggleSelectLang = () => {
    isOpenSelect.value = !isOpenSelect.value
}

const lang = ref(localStorage.getItem('lang') || 'uzL')
const { locale } = useI18n()

const selectLang = (id) => {
    activeLangId.value = id

    lang.value = activeLang.value.locale
    localStorage.setItem('lang', activeLang.value.locale)
    locale.value = activeLang.value.locale
}

onClickOutside(languageSwitcher, () => {
    isOpenSelect.value = false
})

onMounted(() => {
    activeLangId.value = langs.find((lang) => lang.locale === locale.value).id
})
</script>

<style scoped></style>
