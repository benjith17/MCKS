<script lang="ts" setup>

import { computed, ref } from 'vue';
import { keyboardData, displaySettings, gameData } from '../store';

const items = computed(() => {
    return gameData.value?.hotbarItems || [];
})

const hotbarSize = computed(() => {
    return gameData.value?.hotbarSize || 9;
})

let selectedSlot = ref(0);
let showPopover = ref(false);

function editHotbarSlot(n: number) {
    if (displaySettings.viewMode) return;
    if (!gameData.value?.canEditHotbar) return;
    
    selectedSlot.value = n;
    showPopover.value = true;
}

function closeHotbarSlotEditor() {
    showPopover.value = false;
}

function keybindForHotbar(n: number) {
    //@ts-ignore
    let keybind = '';
    Object.keys(keyboardData.keys).forEach(k => {
        const e = keyboardData.keys[k];
        if (e == 'hb_' + n.toString()) {
            keybind = k;
        }
    })
    // return keybind;
    return '';
}

</script>

<template>
    <div class="settings-section">
        <div v-for="slot in Array.from({ length: hotbarSize || 9 }, (_, i) => i)" class="slot-container">
            <!-- <label class="form-label">Slot {{ slot }} item</label> -->
            <div class="spacer" :hidden="!(gameData?.hotbarSpacers as any)?.includes(slot)"></div>
            <button @click="editHotbarSlot(slot)" class="cell hotbar-slot">
                <img :src="'/' +  items.find(i => i.id == keyboardData.hotbar[slot])?.icon">
                <div class="cell-label">{{ keybindForHotbar(slot) }}</div>
            </button>
        </div>
    </div>

    <div @click="closeHotbarSlotEditor" class="cover" :style="{display: showPopover ? '' : 'none'}"></div>
    <div class="popover settings-section grid" :style="{display: showPopover ? '' : 'none'}">
        <div v-for="item in items" @click="keyboardData.hotbar[selectedSlot] = item.id; closeHotbarSlotEditor()" class="cell hotbar-slot tooltip" :data-tooltip="item.label">
            <img :src="'/' +  item.icon">
        </div>
    </div>
</template>

<style scoped>
.settings-section {
    background: linear-gradient(145deg, var(--color-bg-secondary), var(--color-bg-tertiary));
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    display: flex;
    gap: 8px;
}

.settings-section.grid {
    display: inline-flex;
    flex-wrap: wrap;
    width: fit-content;
    margin: 100px;
}

.form-label {
    color: var(--color-text-primary);
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    display: block;
}

.cell {
    width: 50px;
    height: 50px;
    padding: 12px 12px 12px 12px;
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input));
    border: 2px solid var(--color-border);
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    appearance: none;
    transition: all 0.3s;
    box-shadow: 0 2px 0 var(--color-shadow-dark);
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.cell:hover {
    border-color: var(--color-border-focus);
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input-hover));
}

.cell:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 2px 0 var(--color-shadow-dark), 0 0 15px rgba(74, 222, 128, 0.3);
}

.cell-label {
    font-size: 9px;
    color: #ffffff;
    margin-top: 2px;
    text-transform: uppercase;
}

.hotbar-slot {
    width: 70px;
    height: 70px;
    padding-top: 0;
    padding-bottom: 0;
}

option {
    background-color: var(--color-bg-secondary);
}

.slot-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.spacer {
    width: 3px;
    height: 90%;
    border-radius: 2px;
    background: var(--color-border);
    margin-right: 8px;
}

.cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-overlay);
    top: 0;
    left: 0;
}

.popover {
    position: absolute;
    display: flex;
    flex-direction: row;
    max-width: 514px;
}
</style>