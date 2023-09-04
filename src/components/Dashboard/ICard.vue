<template>
    <div class=" px-3 py-4 bg-white border-round shadow-1">
        <div class="flex justify-content-between align-items-center mb-2">
            <h3 class="text-600">
                <slot name="title" />
            </h3>
            <span class="h-2rem w-2rem bg-primary flex align-items-center justify-content-center text-xl border-circle opacity-70">
                <slot name="icon"/>
            </span>
        </div>
        <h2 class="text-800">
            <slot name="text-plain"/>
        </h2>
    </div>
</template>