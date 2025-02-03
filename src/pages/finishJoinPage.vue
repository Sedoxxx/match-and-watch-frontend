<template>
    <div class="waiting-container">
        <div class="waiting-page">
      <img src="../assets/images/mw_logo.svg" alt="Logo" class="logo" />
      <!-- <div class="waiting-text Inter">
        <p v-if="currentMessage === 0" class="fade">Waiting for other users...</p>
        <p v-else-if="currentMessage === 1" class="fade">Almost there...</p>
        <p v-else class="fade">Hang tight, movie is being selected...</p>
      </div> -->
      <div class="waiting-text Raleway">{{ currentText }}</div>
      <!-- <button class="close button close-btn Raleway" @click="closeSession()">
            Check Results
      </button> -->
    </div>
     <div class="blur-circle-black"> </div>
      <!-- <div class="blur-circle"></div>
        <div class="blur-circle"></div> -->
        <div class="films-container"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['sessionCode'],
    data() {
      return {
        currentMessage: 0,
        currentTextIndex: 0,
        texts: ["Check your results if everyone finished.", "The result will be sent to the creator of this session.", "Now, it's time to watch."],

      };
    },
    mounted() {
    //   this.startMessageRotation();
      this.startTextAnimation();
    },
    computed: {
    currentText() {
      return this.texts[this.currentTextIndex];
    }
  },
    methods: {
    //   startMessageRotation() {
    //     setInterval(() => {
    //       this.currentMessage = (this.currentMessage + 1) % 3;
    //     }, 3000); // Change message every 3 seconds
    //   }
    closeSession(){
            this.$router.push({ name: 'Result', params: {sessionCode:this.sessionCode } });
    },
    startTextAnimation() {
      setInterval(() => {
        setTimeout(() => {
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }, 3000); // Adjust the timeout to match the animation duration
      }, 3000); // Adjust the interval to change text duration
    }

    }
  };
  </script>
  
  <style scoped>

.waiting-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
    background-color: black;
    text-align: center;

  }
  
  .waiting-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);
    background-color: transparent;
    text-align: center;
    z-index: 2;

  }

  
  .logo {
    width: 100px;
    margin-bottom: 20px;
    animation: fadeLogo 3s infinite;
  }
  
  .waiting-text {
  font-size: 2rem;
  color: rgb(255, 255, 255);
  font-weight: 500;
  animation: fadeInOut 3s infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
  @keyframes fadeLogo {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .fade {
    animation: fadeText 3s infinite;
  }
  
  @keyframes fadeText {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .blur-circle{
    display: inline-block;
    position: absolute;
    overflow:auto;
    height: 900px;
    width: 900px;
    transform: scale(0.9);
    opacity: 0.7;
    background-position-x: center;
    background-position-y: center;
    top: -15vh;
    left: 15vw;
    background: url(../assets/images/blur.png);
    z-index: 0;
}

.blur-circle-black {
  position: absolute;
  width: 600px;
  height: 600px;
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* background-image: linear-gradient(180deg,rgb(0, 0, 0, 0.5), rgb(122, 82, 187, 0.8) ); */
  background: linear-gradient(180deg, rgb(1, 0, 2, 0.5) 0%, rgb(1, 0, 2, 0.5) 34%, rgba(95, 35, 184, 0.8) 100%);
  border-radius: 50%;
  filter: blur(50px);
  animation: rotateCircle 5s linear infinite;
  z-index: 1;
}

@keyframes rotateCircle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.logo{
    transform: scale(2);
    margin-bottom: 30px;
}

.films-container{
    /* display: inline-block; */
    position: absolute;
    /* margin-top: 200px; */
    overflow:auto;
    height: 1200px;
    width: 1200px;
    transform: scale(1);
    opacity: 0.3;
    background-position-x: center;
    background-position-y: center;
    overflow: hidden;
    top: -25vh;
    /* background: url(../assets/images/background.jpg); */
    background: url(../assets/images/container-films.png);

    z-index: 1;
}



    @keyframes glow{
        0%{
            background-position: 0%;
        }
        50%{
            background-position: 400%;
        }
        100%{
            background-position:0%;
        }
        
    } 

  </style>
  

