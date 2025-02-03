<template>
  <div class="firstContainer"> 
    <NavBar/>
         <div>
          <LoadingSpinner />
           <router-view>

           </router-view>
         </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from './components/NavBarComponent.vue';
import Footer from './components/FooterComponent.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';

import { AUTO_LOGIN_ACTION } from './store/storeconstants';
export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    LoadingSpinner
  },
  created(){
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.firstContainer{
  background: black;
}

/* ::-webkit-scrollbar{
    width: 9px;
    background: #131313;
  } 

 ::-webkit-scrollbar-track{

    background: #131313;
  }

  ::-webkit-scrollbar-track-piece{
    background: #131313;


  }

::-webkit-scrollbar-thumb{
   background: linear-gradient(transparent, #40BA21);

   border-radius: 15px;
 } */
</style>
