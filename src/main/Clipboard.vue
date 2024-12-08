<template>
    <div>
        <Btn label="H" @onClickBtn="copyLabel"></Btn>
        <Btn label="h" @onClickBtn="copyLabel"></Btn>
        <Btn label="G" @onClickBtn="copyLabel"></Btn>
        <Btn label="g" @onClickBtn="copyLabel"></Btn>
        <Btn label="ã" @onClickBtn="copyLabel"></Btn>
    </div>
</template>

<script>
import Btn from '@/components/Btn.vue';

export default {
    name: 'Clipboard',
    components: {
        Btn
    }
}
</script>

<style>

</style>