
<template>
    <div class="initial-selection">
      <h1 class="title Raleway">Choose Quiz Mode</h1>
      <div class="options">
        <button @click="selectMode('single')" class="button Raleway">Single User</button>
        <button @click="selectMode('multiple')" class="button Raleway">Multiple Users</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      selectMode(mode) {
        this.$emit('modeSelected', mode);
      }
    }
  }
  </script>
  
  <style scoped>

  </style>
  