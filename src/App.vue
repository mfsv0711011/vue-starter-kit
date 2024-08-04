<script setup>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
</script>

<template>
    <div class="container mx-auto">
        <div class="flex gap-4">
            <router-link active-class="text-red" :to="{name: 'home'}" type="button">Home</router-link>
            <router-link active-class="text-red" :to="{name: 'test'}" type="button">Test</router-link>

            <div class="ml-auto flex gap-2">
                <LanguageSwitcher/>
            </div>
        </div>
    </div>
    <router-view/>
</template>

<style scoped>
.text-red {
    color: teal;
    text-decoration: underline;
}
</style>
