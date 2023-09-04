<script setup lang="ts">
    interface IPaths {
        label: string,
        icon: string,
        to?: string
    }

    const props = defineProps<{
        home: IPaths,
        items?: IPaths[]
    }>()
</script>

<template>
    <Breadcrumb
        class="transparent flex justify-content-end border-none text-xs md:text-sm lg:text-base"
        :home="props.home"
        :model="props.items"
    />
</template>
<style scoped>
.transparent {
    background-color: transparent;
}
</style>