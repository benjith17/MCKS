<script lang="ts" setup>
// import { ref } from 'vue';
import { keyboardData, /*allTags,*/ displaySettings } from '../store';
// import type { Tag } from '../types';

// function addTag(t: Tag) {
//     keyboardData.tags.push(t);
// }

// function removeTag(t: string) {
//     if (displaySettings.viewMode) return;
//     keyboardData.tags = keyboardData.tags.filter(e => e.id != t);
// }

// function showAddTag() {
//     showPopover.value = true;
// }

// function closeAddTag() {
//     showPopover.value = false;
// }

function disableViewMode() {
    window.location.pathname = '';
}

// const showPopover = ref(false);
</script>

<template>
    <div class="meta-container">
        <h2 v-if="displaySettings.viewMode == true">{{ keyboardData.name }}</h2>
        <button @click="disableViewMode()" v-if="displaySettings.viewMode == true && displaySettings.captureMode == false">edit</button>

        <input v-model="keyboardData.name" v-if="displaySettings.viewMode == false">

        <!-- <div class="tags">
            <div v-for="tag in keyboardData.tags" @click="removeTag(tag.id)" class="tag" :style="{backgroundColor: tag.color}">{{ tag.name }}</div>
            <div @click="showAddTag()" class="tag" style="background-color: #777;" v-if="displaySettings.viewMode == false">+</div>
        </div> -->
    </div>

    <!-- <div @click="closeAddTag()" class="cover" :style="{ display: showPopover ? '' : 'none' }"></div>
    <div class="popover settings-section" :style="{ display: showPopover ? '' : 'none' }">
        <div v-for="tag in allTags" @click="addTag(tag)" class="tag" :style="{backgroundColor: tag.color}">{{ tag.name }}</div>
    </div> -->

</template>

<style scoped>
h2 {
    margin-bottom: 0;
    color: var(--color-text-primary);
}

.meta-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    height: min-content;
    gap: 10px;
}

.tags {
    display: flex;
    flex-direction: row;
    gap: 5px;
}

.tag {
    padding: 5px 7px;
    border-radius: 100px;
    text-transform: uppercase;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    line-height: 1;
    font-size: 0.85rem;
    font-weight: 800;
    min-width: max-content;
    cursor: pointer;
    color: #ffffff;
}

input {
    background: var(--color-bg-secondary);
    border-radius: 15px;
    padding: 10px;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
    border: 2px solid var(--color-border);
    color: var(--color-text-primary);
    font-size: 1rem;
    line-height: 1.4;
    font-family: "Segoe UI", Arial, sans-serif;
    transition: border 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    box-sizing: border-box;
    backdrop-filter: blur(2px);
}

input:focus-visible {
    outline: none;
    border-color: var(--color-border-focus);
    border-width: 2px;
}

.settings-section {
    background: linear-gradient(145deg, var(--color-bg-secondary), var(--color-bg-tertiary));
    border: 2px solid var(--color-border);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    display: flex;
    gap: 8px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: min(400px, 80vh);
}

.cell {
    width: 50px;
    height: 50px;
    padding: 12px 12px 12px 12px;
    background: linear-gradient(145deg, var(--color-bg-input-hover), var(--color-bg-input));
    border: 2px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-text-primary);
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

.cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-overlay);
    top: 0;
    left: 0;
    z-index: 1;
}

.popover {
    position: absolute;
    z-index: 2;
}
</style>