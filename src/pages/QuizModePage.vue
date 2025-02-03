<template>
  <div class="quizContainer">
    <!-- Question 0 -->
    <div v-show="showForm === 0" class="content-container">
      <div class="display-container flex flex-column justify-content-center align-items-center">
        <h1 class="quiz-title Raleway">Choose the Quiz Mode</h1>
        <div v-if="currentQuestion.options.length" :class="['questions-container', optionContainerClass]">
          <input type="radio" id="option0" name="option" value="oneUser" v-model="selectedOption" class="Inter optionDes">
          <label for="option0" class="Inter optionDes optionLabel" @click="redirectToOneUserQuiz">One User</label>
          <input type="radio" id="option1" name="option" value="multipleUsers" v-model="selectedOption" class="Inter optionDes">
          <label for="option1" class="Inter optionDes optionLabel" @click="handleModeSelection">Multiple Users</label>
        </div>
      </div>
    </div>

    <!-- Question 1 -->
    <div v-show="showForm === 1" class="content-container">
      <div class="display-container flex flex-column justify-content-center align-items-center">
        <h1 class="quiz-title Raleway">Choose the Session Action</h1>
        <div v-if="currentQuestion.options.length" :class="['questions-container', optionContainerClass]">
          <input type="radio" id="createSession" name="sessionAction" value="create" v-model="sessionActionSelected" class="Inter optionDes">
          <label for="createSession" class="Inter optionDes optionLabel" @click="handleSessionAction('create')">Create a session</label>
          <input type="radio" id="joinSession" name="sessionAction" value="join" v-model="sessionActionSelected" class="Inter optionDes">
          <label for="joinSession" class="Inter optionDes optionLabel" @click="handleSessionAction('join')">Join a session</label>
        </div>
      </div>
    </div>

    <!-- Background and other elements -->
    <!-- <div class="blur-circle"></div>
    <div class="blur-circle"></div> -->
    <!-- <div class="blur-circle-black"></div> -->
    <div class="films-container"></div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      showForm: 0, // Start with the initial question
      modeSelected: null,
      sessionActionSelected: null,
      currentQuestionIndex: 0,
      selectedOption: '',
      userInput: '',
      sessionCode: '',
      joinCode: '',
      quizArray: [
        { id: "0", question: "Do you want to start a new session or join a current one?", options: ["new", "join"] },
        { id: "1", question: "How do you feel now?", options: ["Happy", "Surprised", "Angry", "Scared", "Sad", "Excited", "Frustrated", "Tense", "Nostalgic"] },
        { id: "2", question: "What kind of show do you want to see?", options: ["Movie", "Series", "Anime", "Cartoon"] },
        { id: "3", question: "What show genre do you want to watch?", options: ['Music','Animation','Scifi','Horror','Fantasy','Action','Western','War','Crime','History','Reality','Family','Documentation','Romance','Comedy','European','Sport','Drama','Thriller'] },
        { id: "4", question: "What are the available platforms for you?", options: ["HBO Max", "Netflix", "Amazon Prime", "Disney+", "Paramount"] },
        { id: "5", question: "What is the preferred release year for you?", options: ["After 2010", "After 1990", "After 1970", "Before 1970"] },
        { id: "6", question: "You can choose the age restriction for our recommendation", options: ["Okay for all", "PG-13", "R", "Adults only"] },
        { id: "7", question: "What is the preferred period of the show?", options: ["Between 1 and 1.5 hours", "Between 1.5 and 2 hours", "Between 2 and 3 hours", "Over 3 hours"] }
      ]
    };
  },
  computed: {
    currentQuestion() {
      return this.quizArray[this.currentQuestionIndex];
    },
    isLastQuestion() {
      return this.currentQuestionIndex === this.quizArray.length - 1;
    },
    optionContainerClass() {
      const optionCount = this.currentQuestion.options.length;
      if (optionCount <= 2) {
        return 'two-options';
      } else if (optionCount <= 5) {
        return 'four-options';
      } else if (optionCount <= 10) {
        return 'ten-options';
      } else {
        return 'many-options';
      }
    }
  },
  methods: {
    handleModeSelection(mode) {
      this.showForm = 1;  
    },
    handleSessionAction(action) {
      this.sessionActionSelected = action;
      if (action === 'create') {
         window.location.href ='/create'
      }
      else{
        window.location.href ='/join'
      }
    },
    redirectToOneUserQuiz() {
      window.location.href = '/oneUserQuiz';
    }
  }
}
</script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .quizContainer{
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    /* background-image: radial-gradient(
        #8C45FF,
      black
   ); */
   background: black;
}

.content-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);

  z-index: 2;
  transition: all 0.3s ease-in-out;
}

.quiz-title{
  font-size: 45px;
  z-index: 1;
  color: white;
  text-align: center;
  margin: 20px;
  margin-top:-180px;
  margin-bottom:60px;
}

/* .quiz-title > h1 {
  box-shadow: -6px 4px 10px rgba(0, 0, 0, 0.7);
} */

.question-header{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.question-number {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.question {
  color: white;
  font-size: 20px;
  font-weight: 400;
}

.questions-container{
  width: 80%; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.two-options {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  row-gap: 15px;
  column-gap: 15px; 
}

.two-options > div {
  width: 200px;
  margin: 0;
}

.four-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 15px;
  column-gap: 15px;
}

.four-options > div {
  width: 300px;
  margin: 0;
}

/* .four-options > div {
  width: 150px;
  margin: 0;
} */

.ten-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 15px;
  column-gap: 15px;
  margin-top: 20px;
}

.ten-options > div {
  width: 150px;
  margin: 0;
}

.many-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 15px;
  column-gap: 15px;
  margin-top: 20px;
}

.many-options > div {
  width: 150px;
  margin: 0;
}

  
  /* .quizContainer {
    height: 150vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background-image: linear-gradient(black, #8C45FF);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  } */

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

/* .films-container{
    display: inline-block;
    position: absolute;
    overflow:auto;
    height: 1200px;
    width: 1200px;
    transform: scale(0.9);
    opacity: 0.3;
    background-position-x: center;
    background-position-y: center;
    top: 10vh;
    background: url(../assets/images/films_container.png);
    z-index: 0;
} */

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

.black-box{
    display: inline-block;
    position:relative;
    height: 50vh;
    width: 100%;
    background-color: black;
    z-index: -1;
}
  
  /* h1 {
    text-align: center;
    padding-top: 60px;
    font-size: 80px;
  } */
  
  .display-container {
      position: relative;

      /* background-image: linear-gradient(#3c1e6b, black); */
      /* background: linear-gradient(180deg, rgb(1, 0, 2, 0.7) 0%, rgb(54, 23, 100, 0.7) 35%, rgb(54, 23, 100, 0.7) 50%, rgb(54, 23, 100, 0.7) 75%, rgb(1, 0, 2, 0.7) 100%); */
      background: linear-gradient(180deg, #010002d6 0%, #010002d8 25%, #461295de 100%);
      
            box-shadow: -6px 4px 10px rgba(0, 0, 0, 0.7);
      box-shadow: inset 0px 0px 6px 7px rgba(0, 0, 0, 0.45);
  
      padding: 30px;
      /* width: 36vw; */
      height: 85%;
      width: auto;
    min-width: 500px; /* Initial static width */
      max-width: 900px;
      /* max-width: 600px; */
      border-radius: 30px;
      z-index: 1;
      /* margin-top: 20px; */
      transition: all 0.3s ease-in-out;
    }

  .blur-circle-black {
  position: absolute;
  width: 800px;
  height: 800px;
  top: -50vh;
  /* top: 20vh; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* background-image: linear-gradient(180deg,rgb(0, 0, 0, 0.5), rgb(122, 82, 187, 0.8) ); */
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  filter: blur(50px);
  z-index: 0;
}
  

   
  .optionDes{
    width: 80%;
    height: 50px;
    margin: 10px;
    align-content: center;
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 30px;
    background: 3D3D3D;
    color: white;
    text-align: center;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
    transition: all 0.3s ease-in-out;
  }

  .optionDes:hover{
    box-shadow: inset 0px 0px 6px 1px rgb(255, 255, 255);
    outline: 1px solid rgba(255, 255, 255, 0.5);
  }

  
    input[type="radio"] {
    display: none;
    }

    .optionLabel {
    display: block;
    padding: 10px;
    cursor: pointer;
    width:300px;
    }

    /* input[type="radio"]:checked + .optionLabel {


    box-shadow: inset 0px 0px 6px 1px #8C45FF;
    outline: 1px solid rgba(255, 255, 255, 0.5);
    } */

    .selected-option{
    background: rgb(140, 69, 255, 0.4);
    color: #8C45FF;
    box-shadow: inset 0px 0px 6px 5px #8C45FF;
    outline: 1px solid #8C45FF;
    transition: all 0.3s ease-in-out;
    }

    .inputText{
        width: 500px;
        border: solid rgb(51, 44, 3) 1px;
        background-color: #33185f;
        text-align: left;
        color: white;
        padding: 20px;
        max-width: 100%;
        resize:none;
        box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
        transition: all 0.3s ease-in-out;
        outline: 1px solid rgba(255, 255, 255, 0.25);
        outline-offset: -1px;
        border-radius: 30px;
    }

    .inputText::placeholder{
      font-family: Raleway;
      color: rgba(255, 255, 255, 0.47);
    }
    .inputText:hover{
      
      box-shadow: inset 0px 0px 6px 5px #8C45FF;
      outline: 1px solid #8C45FF;
      transition: all 0.3s ease-in-out;
    }

    .optionDes{
    width: 80%;
    height: 50px;
    margin: 10px;
    align-content: center;
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 30px;
    background: 3D3D3D;
    color: white;
    text-align: center;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
    transition: all 0.3s ease-in-out;
  }

  .optionDes:hover{
    box-shadow: inset 0px 0px 6px 1px rgb(255, 255, 255);
    outline: 1px solid rgba(255, 255, 255, 0.5);
  }

.buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0;
    
}
 .buttons > button{
    margin-top: 20px;
    width: fit-content;
    height: 40px;
    margin-left: 5px;
  }


  .button{
    cursor: pointer;
    margin-bottom: 15px;
    padding: 10px 30px;
    /* border: none; */
    border-radius: 10px;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;

    line-height: 20px;
    letter-spacing: 0.5px;
}



.next-btn{
    background: rgba(140, 69, 255, 0.4);
    color: white;
    border: 2px transparent solid;
    font-weight: 500;
    font-size: 12px;
    text-decoration: none;
    padding: 4px 30px;
    margin: 0;
    transition: all 0.3s ease-in-out;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 25%);
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
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 25%);
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
.question1{
  display:none;
}
@media only screen and (max-width: 1200px) {
  .display-container {
    min-width: 600px;
    padding: 20px;
  }

  .question {
    font-size: 25px;
  }

  .question-number {
    font-size: 18px;
  }

  .inputText {
    width: 400px;
  }
  .films-container{
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  .display-container {
    min-width: 100%;
    padding: 10px;
    height: 100%;
    max-width: 100%;
    border-radius: 10px;
  }

  .quiz-title {
    font-size: 35px;
  }

  .question {
    font-size: 22px;
  }

  .question-number {
    font-size: 16px;
  }

  .inputText {
    width: 300px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    width: 100%;
    margin: 10px 0;
  }
}

@media only screen and (max-width: 480px) {
  .quiz-title {
    font-size: 30px;
  }

  .question {
    font-size: 18px;
  }

  .question-number {
    font-size: 14px;
  }

  .inputText {
    width: 250px;
  }

  .button {
    width: 100%;
    height: 40px;
    font-size: 14px;
  }

  .display-container {
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

  </style>
  

