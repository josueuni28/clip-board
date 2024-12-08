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
    background-color: #161616;
    color: #e2e2e2;
}
.button:hover {
    background-color: black;
    color: white;
}
</style>
