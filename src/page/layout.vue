<template>
  <div id="layout">
    <Header @sisterSaid="messageSon($event)"></Header>
    <Aside :isCollapse1="messageson"></Aside>
  </div>
</template>
<script>
import Header from '@/components/common/header'
import Aside from '@/components/common/aside'
export default {
  components: {
    Header,
    Aside
  },
  data(){
    return{
      messageson: false,
    }
  },
  methods:{
    messageSon(message){
      this.messageson = message;
    },
  }
}
</script>
<style>
@import "../common/css/common.css"
</style>
