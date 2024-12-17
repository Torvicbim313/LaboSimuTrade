<template>
  <div class="p-8 background">
    <Navbar/>
    <RouterView/>
  </div>
</template>
<script>

import Navbar from './components/Navbar.vue';

export default {
  name : "App",
  components: { Navbar },
  data() {
    return {
      componentName : "App"
    }
  },

}
</script>
