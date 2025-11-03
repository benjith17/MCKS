<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, computed } from 'vue';

import Keyboard from './components/Keyboard.vue';
import Sidebar from './components/Sidebar.vue';

let keyboardDataEnc = computed({
    get() {
        return window.location.hash.slice(1);
    },
    set(v) {
        window.location.hash = v;
    }
});

let keyboardData = computed({
    get() {
        try {
            return JSON.parse(atob(keyboardDataEnc.value));
        } catch {
            return {}
        }
    },
    set(v) {
        keyboardDataEnc = v;
    }
})

function updateHash() {
    keyboardDataEnc.value = window.location.hash.slice(1);
}

watch(keyboardDataEnc, (v) => {
    window.location.hash = v
})

onMounted(() => {
    window.addEventListener('hashchange', updateHash);

    // if (!window.location.hash) {
    //     keyboardData = {
    //         keys: {
    //             w: "move_forward",
    //             a: "move_left",
    //             s: "move_backward",
    //             d: "move_right",
    //             shiftleft: "move_sprint",
    //             ctrlleft: "move_sneak",
    //             space: "move_jump",
    //             tab: "inv_open",
    //             _1: "hb_1",
    //             _3: "hb_2",
    //             _4: "hb_3",
    //             q: "hb_4",
    //             e: "hb_5",
    //             r: "hb_6",
    //             f: "hb_7",
    //             c: "hb_8",
    //             v: "hb_9"
    //         },
    //         hotbar: [
    //             "pick",
    //             "glow",
    //             "pearl",
    //             "sword",
    //             "block",
    //             "gap",
    //             "totem",
    //             "anchor",
    //             "crystal"
    //         ]
    //     }
    // }
});

onBeforeUnmount(() => {
    window.removeEventListener('hashchange', updateHash);
});
</script>

<template>
    <Keyboard :data=keyboardData @data-updated="d => keyboardDataEnc = d" />
    <Sidebar :data="keyboardData" @data-updated="d => keyboardData = d"/>
</template>

<style scoped></style>
