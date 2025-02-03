<template>
    <transition name="fade-spin">
      <div v-if="loadingState.isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </transition>
  </template>
  
  <script>
  import { loadingState } from '../store/loading';
  
  export default {
    setup() {
      return {
        loadingState,
      };
    },
  };
  </script>
  
  <style scoped>
  .loading-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 1);
    z-index: 9999;
  }
  
  .spinner {
    position: absolute;
    width: 300px;
    height: 300px;
    background: linear-gradient(180deg, rgba(1, 0, 2, 0.5) 0%, rgba(1, 0, 2, 0.5) 34%, rgba(95, 35, 184, 0.8) 100%);
    border-radius: 50%;
    filter: blur(50px);
    animation: rotateCircle 5s linear infinite;
    z-index: 2;
  }
  
  @keyframes rotateCircle {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
.fade-spin-leave-active {
    opacity: 1;
    transition: opacity 0.5s;
  }
.fade-spin-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  