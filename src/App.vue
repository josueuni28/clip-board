<template>
  <div class="agrBtns">
    <div class="separaBtns">
      <Btn label="h" @onClickBtn="copyLabel"></Btn>
      <Btn label="g" @onClickBtn="copyLabel"></Btn>
      <Btn label="ã" @onClickBtn="copyLabel"></Btn>
      <Btn label="õ" @onClickBtn="copyLabel"></Btn>
      <Btn label="ô" @onClickBtn="copyLabel"></Btn>
      <Btn label="ê" @onClickBtn="copyLabel"></Btn>
    </div>
    <div class="separaBtns">
      <Btn label="H" @onClickBtn="copyLabel"></Btn>
      <Btn label="G" @onClickBtn="copyLabel"></Btn>
      <Btn label="Ã" @onClickBtn="copyLabel"></Btn>
      <Btn label="Õ" @onClickBtn="copyLabel"></Btn>
      <Btn label="Ô" @onClickBtn="copyLabel"></Btn>
      <Btn label="Ê" @onClickBtn="copyLabel"></Btn>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import Btn from './components/Btn.vue';

export default {
  name: 'Home',
  components: {
    Btn
  },
  methods: {
    copyLabel(value){
      ipcRenderer.send('process-character-copy', value)
      ipcRenderer.on('process-character-copy-reply', (event, dadosDaResposta) => {
        if(dadosDaResposta == 'eNull'){
          alert('Erro!')
        }

        ipcRenderer.removeAllListeners('process-character-copy-reply')
      })
    }
  }
}
</script>

<style>
*{
  margin: 0px;
  padding: 0px;
}
.agrBtns {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
.separaBtns {
 display: flex;
 height: 100vh;
}
</style>
