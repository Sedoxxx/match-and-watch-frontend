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
      <button class="close button close-btn Raleway" @click="closeSession()">
            Check Results
      </button>
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
        texts: ["Waiting for other users", "Check results if everyone finished", "Now, it's time to watch."],

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
    top: -45vh;
    /* background: url(../assets/images/background.jpg); */
    background: url(../assets/images/container-films.png);

    z-index: 1;
}

.button{
    cursor: poRaleway;
    margin-bottom: 15px;
    padding: 10px 30px;
    /* border: none; */
    border-radius: 60px;
 
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
 
    line-height: 20px;
    letter-spacing: 0.5px;
}
 
 
.previous-btn{
    background: transparent;
    text-align: center;
    color: white;
    border: 2px transparent solid;
    font-weight: 500;
    font-size: 12px;
    text-decoration: none;
    padding: 4px 30px;
    margin: 0;
    transition: all 0.3s ease-in-out;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 35%);
}

.next-btn:hover{
    background-color: transparent;
    color: #FFFFFF;
    border: 2px #FFFFFF solid;
}

.previous-btn:hover{
    background-color: transparent;
    color: #FFFFFF;
    border: 2px #FFFFFF solid;
}
 
.close-btn{
    background: transparent;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 45%);
    /* background: rgba(140, 69, 255, 0.6); */
    color: white;
    border: 2px transparent solid;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    padding: 15px 30px;
    margin-top: 50px;
    transition: all 0.3s ease-in-out;
    /* transition: opacity 0.5s ; */
    /* box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 25%); */
}
.close-btn:before{
    filter: blur(20px);
    opacity: 0;
        opacity: 1;
        z-index: -1;
    }
    .close-btn{
        z-index: 1;
        animation: glow 20s linear infinite;
    }
 

.close-btn:hover{
    background-color: transparent;
    color: #FFFFFF;
    border: 2px #FFFFFF solid;
}
 


/* .close{
    text-align: center;
    margin: auto;
    display: grid;
     top: 40%;
     left:46%;
     width: 200px;
     height: 60px;
     text-decoration: none;
     font-size: 20px;
     padding-top:0.6em;
     cursor: pointer;
     text-transform: uppercase;
     letter-spacing: 1px;
     color: #2b0268;
     font-weight: 600;
     background-size: 400%;
     border-radius: 30px;
     background-image: linear-gradient(90deg,#b185f8, #7a52bb,#b185f8);
   }
   .close:before{
    content: '';
    position: absolute;
    background: inherit;
    top: -5px;
    right: -5px;
    left: -5px;
    width: 200px;
    height: 60px;
    bottom: -5px;
    background: #8e45f5;
    border-radius: 50px;
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.5s    
    }
    .close:before{
        opacity: 1;
        z-index: -1;
    }
    .close{
        z-index: 1;
        animation: glow 20s linear infinite;
    }*/
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
  


<!-- 


<template>
    <div class="pageContainer">
        <p class="explaination">
            close the session when the other users finish thier quizes or when you just want to see the reslts
        </p>
        <button class="close" @click="closeSession()">
            Close Session
        </button>
    </div>
</template>

<script>
 export default{
    props: ['sessionCode'],
    methods:{
        closeSession(){
            this.$router.push({ name: 'Result', params: {sessionCode:this.sessionCode } });
        }
    }
 };
</script>

<style scoped>
   .pageContainer{      
        width: 100%;
        height: 80vh;
        background-image: linear-gradient(#3f1f72,#4f298b, black);
   }
   .explaination{
    color:white;
    text-align: center;
    padding: 40px;
    font-size:30px;
   }
   .close{
    text-align: center;
    margin: auto;
    display: grid;
     top: 40%;
     left:46%;
     width: 200px;
     height: 60px;
     text-decoration: none;
     font-size: 20px;
     padding-top:0.6em;
     cursor: pointer;
     text-transform: uppercase;
     letter-spacing: 1px;
     color: #2b0268;
     font-weight: 600;
     background-size: 400%;
     border-radius: 30px;
     background-image: linear-gradient(90deg,#b185f8, #7a52bb,#b185f8);
   }
   .close:before{
    content: '';
    position: absolute;
    background: inherit;
    top: -5px;
    right: -5px;
    left: -5px;
    width: 200px;
    height: 60px;
    bottom: -5px;
    background: #8e45f5;
    border-radius: 50px;
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.5s    
    }
    .close:before{
        opacity: 1;
        z-index: -1;
    }
    .close{
        z-index: 1;
        animation: glow 20s linear infinite;
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
</style> -->