<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { keyboardData } from './store';

import Keyboard from './components/Keyboard.vue';
import Sidebar from './components/Hotbar.vue';

watch(keyboardData, (v) => {
    window.location.hash = btoa(JSON.stringify(v));
})

onMounted(() => {
    if (window.location.hash) {
        try {
            const urlData = JSON.parse(atob(window.location.hash.slice(1)))
            keyboardData.keys = urlData.keys;
            keyboardData.hotbar = urlData.hotbar;
            return;
        } catch { }
    }

    keyboardData.keys = {
        w: "move_forward",
        a: "move_left",
        s: "move_backward",
        d: "move_right"
    }
});
</script>

<template>
    <div class="container">
        <Keyboard />
        <Sidebar />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    overflow: hidden;
}
</style>
