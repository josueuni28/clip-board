<template>
<button class="button" @click="$emit('onClickBtn', label)">{{ label }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        label: {}
    }
}
</script>

<style>
.button {
    flex: auto;
    font-size: 1.5rem;
    background-color: #000000a8;
    border-radius: 10px;
    border: 0px;
    color: #e2e2e2;
    cursor: pointer;
}
.button:hover {
    background-color: black;
    color: white;
}
.button:active {
    color: #43e9ff;
    background-color: #290088;
}
</style>
