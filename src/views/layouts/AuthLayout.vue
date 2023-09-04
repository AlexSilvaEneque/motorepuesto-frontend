<script setup lang="ts">
    
</script>

<template>
    <div class="w-full h-screen grid grid-nogutter">
        <div class="hidden md:block custom-bg md:col-3 lg:col-4">
        </div>
        <div class="col flex justify-content-center align-items-center md:justify-content-start md:pl-5 lg:pl-8">
            <RouterView />
        </div>
    </div>
</template>
<style scoped>
.custom-bg {
    background-image: url('/img/bg-image.jpg');
    background-size: cover;
}
</style>