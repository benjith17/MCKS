<script lang="ts" setup>

import { ref } from 'vue';
import { keyboardData, displaySettings } from '../store';

const items = [
    { id: 'none', label: "Any/Empty", icon: 'none' },
    { id: 'sword', label: "Sword", icon: 'sword' },
    { id: 'axe', label: "Axe", icon: 'axe' },
    { id: 'pick', label: "Pickaxe", icon: 'pick'},
    { id: 'obsidian', label: "Obsidian", icon: 'obsidian' },
    { id: 'crystal', label: "Crystals", icon: 'crystal' },
    { id: 'anchor', label: "Respawn Anchor", icon: 'anchor' },
    { id: 'glow', label: "Glowstone", icon: 'glow' },
    { id: 'pearl', label: "Ender Pearl", icon: 'pearl' },
    { id: 'gap', label: "Golden Apple", icon: 'gap' },
    { id: 'food', label: "Food", icon: 'food' },
    { id: 'totem', label: "Totem of Undying", icon: 'totem' },
    { id: 'potion_health', label: "Health Potion", icon: 'potion_health' },
    { id: 'potion_strength', label: "Strength Potion", icon: 'potion_strength'},
    { id: 'potion_fire', label: "Fire Resistance Potion", icon: 'potion_fire'}
]

let selectedSlot = ref(0);
let showPopover = ref(false);

function editHotbarSlot(n: number) {
    if (displaySettings.viewMode) return;
    
    selectedSlot.value = n;
    showPopover.value = true;
}

function closeHotbarSlotEditor() {
    showPopover.value = false;
}

function keybindForHotbar(n: number) {
    let keybind = '';
    Object.keys(keyboardData.keys).forEach(k => {
        const e = keyboardData.keys[k];
        if (e?.includes('hb_' + n.toString())) {
            keybind = k;
        }
    })
    return '';
}

</script>

<template>
    <div class="settings-section">
        <div v-for="slot in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
            <!-- <label class="form-label">Slot {{ slot }} item</label> -->
            <button @click="editHotbarSlot(slot)" class="cell hotbar-slot">
                <img :src="'/' +  keyboardData.hotbar[slot] + '.svg'">
                <div class="cell-label">{{ keybindForHotbar(slot) }}</div>
            </button>
        </div>
    </div>

    <div @click="closeHotbarSlotEditor" class="cover" :style="{display: showPopover ? '' : 'none'}"></div>
    <div class="popover settings-section grid" :style="{display: showPopover ? '' : 'none'}">
        <div v-for="item in items" @click="keyboardData.hotbar[selectedSlot] = item.id; closeHotbarSlotEditor()" class="cell tooltip" :data-tooltip="item.label">
            <img :src="'/' +  item.icon + '.svg'">
        </div>
    </div>
</template>

<style scoped>
.settings-section {
    background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
    border: 2px solid #2a2a2a;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    display: flex;
    gap: 8px;
}

.settings-section.grid {
    display: inline-flex;
    flex-wrap: wrap;
    /* max-width: 60vw; */
    width: fit-content;
    margin: 100px;
}

.form-label {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    display: block;
}

.cell {
    width: 50px;
    height: 50px;
    padding: 12px 12px 12px 12px;
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
    border: 2px solid #3a3a3a;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    appearance: none;
    transition: all 0.3s;
    box-shadow: 0 2px 0 #0a0a0a;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.cell:hover {
    border-color: #4ade80;
    background: linear-gradient(145deg, #2f2f2f, #242424);
}

.cell:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 2px 0 #0a0a0a, 0 0 15px rgba(74, 222, 128, 0.3);
}

.cell-label {
    font-size: 9px;
    color: #eee;
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
    background-color: #1f1f1f;
}

.cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #1f1f1fb3;
    top: 0;
    left: 0;
}

.popover {
    position: absolute;
    display: flex;
    flex-direction: row;

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