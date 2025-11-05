<script lang="ts" setup>
import { ref } from 'vue';
import { keyboardData, allTags, displaySettings } from '../store';
import type { tag } from '../types';

function addTag(t: tag) {
    keyboardData.tags.push(t);
}

function removeTag(t: string) {
    if (displaySettings.viewMode) return;
    keyboardData.tags = keyboardData.tags.filter(e => e.id != t);
}

function showAddTag() {
    showPopover.value = true;
}

function closeAddTag() {
    showPopover.value = false;
}

function disableViewMode() {
    window.location.pathname = '';
}

const showPopover = ref(false);
</script>

<template>
    <div class="meta-container">
        <h2 v-if="displaySettings.viewMode == true">{{ keyboardData.name }}</h2>
        <button @click="disableViewMode()" v-if="displaySettings.viewMode == true && displaySettings.captureMode == false">edit</button>

        <input v-model="keyboardData.name" v-if="displaySettings.viewMode == false">

        <div class="tags">
            <div v-for="tag in keyboardData.tags" @click="removeTag(tag.id)" class="tag" :style="{backgroundColor: tag.color}">{{ tag.name }}</div>
            <div @click="showAddTag()" class="tag" style="background-color: #777;" v-if="displaySettings.viewMode == false">+</div>
        </div>
    </div>

    <div @click="closeAddTag()" class="cover" :style="{ display: showPopover ? '' : 'none' }"></div>
    <div class="popover settings-section" :style="{ display: showPopover ? '' : 'none' }">
        <div v-for="tag in allTags" @click="addTag(tag)" class="tag" :style="{backgroundColor: tag.color}">{{ tag.name }}</div>
    </div>

</template>

<style scoped>
h2 {
    margin-bottom: 0;
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
    display: inline-flex;       /* makes vertical centring reliable */
    flex-direction: row;
    align-items: center;        /* vertically centres the text */
    line-height: 1;             /* removes excessive vertical space */
    font-size: 0.85rem;
    font-weight: 800;           /* optional */

    min-width: max-content;

    cursor: pointer;
}

input {
    background: #1a1a1a;
    border-radius: 15px;
    padding: 10px;

    /* Recessed inner shadow you provided */
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);

    /* Extra details for polish */
    border: 2px solid #3a3a3a;
    color: #e0e0e0; /* comfortable contrast on a dark background */
    font-size: 1rem;
    line-height: 1.4;
    font-family: "Segoe UI", Arial, sans-serif;

    /* Smooth interaction */
    transition: border 0.2s ease, box-shadow 0.2s ease;

    /* Make it expand nicely in layouts */
    width: 100%;
    box-sizing: border-box;

    /* Optional: slight transparency for a modern feel */
    backdrop-filter: blur(2px);
}

input:focus-visible {
    outline: none;

    border-color: #4ade80;
    border-width: 2px;
    /* background: linear-gradient(145deg, #2f2f2f, #242424); */
}

.settings-section {
    background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
    border: 2px solid #2a2a2a;
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

.cover {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #1f1f1fb3;
    top: 0;
    left: 0;

    z-index: 1;
}

.popover {
    position: absolute;
    z-index: 2;
}
</style>