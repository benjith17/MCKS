<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    data: any
}>();
const emit = defineEmits(['dataUpdated']);

const data = ref(props.data);

watch(data, (d) => emit("dataUpdated", d))

const hotbarItems = computed({
    get() {
        return data.value.hotbar;
    },
    set(v) {
        data.value.hotbar = v;
    }
})

const items = [
    'sword',
    'axe',
    'pick',
    'gap',
    'block',
]

</script>

<template>
    <div class="dropdown">
        <select class="dropdown-select" v-model="hotbarItems[0]">
            <select v-for="item in items" :key="item" :value="item">{{ item }}</select>
        </select>
    </div>
</template>

<style scoped>
.dropdown-select {
    width: 100%;
    padding: 12px 40px 12px 15px;
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
    border: 2px solid #3a3a3a;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-family: 'Courier New', monospace;
    cursor: pointer;
    appearance: none;
    transition: all 0.3s;
    box-shadow: 0 2px 0 #0a0a0a;
}

.dropdown-select:hover {
    border-color: #4ade80;
    background: linear-gradient(145deg, #2f2f2f, #242424);
}

.dropdown-select:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 2px 0 #0a0a0a, 0 0 15px rgba(74, 222, 128, 0.3);
}

/* .dropdown::after {
    content: '▼';
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #4ade80;
    pointer-events: none;
    font-size: 12px;
} */
</style>