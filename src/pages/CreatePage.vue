<template>
    <div class="quizContainer">
      <div :style="{ opacity: showForm ? '1' : '0', transform: showForm ? 'translateY(0)' : 'translateY(100px)' }" class="content-container">
        <h1 class="quiz-title Raleway">Match +</h1>
        <div class="display-container flex flex-column justify-content-center align-items-center">
          <div class="sessionCode Inter">
            <p>
                Session Code: <span>{{ sessionCode }}</span>
            </p>
          </div>
          <div class="flex flex-column justify-content-center question-header">
            <p class="question-number Inter mb-3">Question {{ currentQuestionIndex + 1 }} of {{ quizArray.length }}</p>
            <p class="question Raleway mb-3">{{ currentQuestion.question }}</p>
          </div>
          <div v-if="currentQuestion.options.length" :class="['questions-container', optionContainerClass]">
            <div v-for="(option, index) in currentQuestion.options" :key="index" class="option-wrapper Inter">
              <input
                v-if="isMultiSelect(currentQuestion)"
                type="checkbox"
                :id="'option' + index"
                :value="option"
                v-model="selectedOptions"
                class="Inter optionDes"
                style="display: none;"
              />
              <input
                v-else
                type="radio"
                :id="'option' + index"
                name="option"
                :value="option"
                v-model="selectedOption"
                class="Inter optionDes"
                style="display: none;"
              />
              <label :for="'option' + index" :class="['optionLabel', { 'selected-option': isSelected(option) }]">
                {{ option }}
              </label>
            </div>
          </div>
          <div v-else>
            <textarea
              type="text"
              v-model="userInput"
              rows="6"
              placeholder="Write whatever you want"
              class="inputText write-container"
            ></textarea>
          </div>
          
          <div class="buttons">
            <button v-if="currentQuestionIndex > 0" @click="previousQuestion" class="button Raleway previous-btn">
              Previous
            </button>
            <button
      @click="nextQuestion"
      class="button Raleway next-btn"
      :class="{ 'finish-button': isLastQuestion, 'disabled-btn': isDisabled }"
      :disabled="isDisabled"
    >
      {{ isLastQuestion ? 'Finish' : 'Next' }}
    </button>
          </div>
        </div>
      </div>
      <div class="blur-circle"></div>
      <div class="blur-circle"></div>
      <div class="films-container"></div>
    </div>
  </template>
  
  <script>
  import store from '@/store/store';
  import { GET_USER_TOKEN_GETTER } from '@/store/storeconstants';
  import axios from 'axios';
  import { USERURL, RECURL } from '../const'

  export default {
    data() {
      return {
        showForm: false,
        modeSelected: null,
        sessionActionSelected: null,
        currentQuestionIndex: 0,
        selectedOption: '',
        selectedOptions: [],
        userInput: '',
        sessionCode: '',
        joinCode: '',
        responses: [],
        quizArray: [
         { id: "1", question: "What kind of show do you want to see?", options: ["Movie", "Series"] },
        { id: "2", question: "What genres do you prefer?", options: ['Music','Animation','Scifi','Horror','Fantasy','Action','Western','War','Crime','History','Reality','Family','Documentation','Romance','Comedy','European','Sport','Drama','Thriller'],multi: true},
          { id: "3", question: "How do you feel now?", options: ["Happy", "Surprised", "Angry", "Scared", "Sad", "Excited", "Frustrated", "Tense", "Nostalgic"], multi: true },
        { id: "4", question: "What are the available platforms for you?", options: ["HBO Max", "Netflix", "Amazon Prime", "Disney+", "Paramount"], multi: true },
        { id: "5", question: "What is the preferred release year for you?", options: ["After 2010", "After 1999", "After 1965", "Before 1965"] },
        { id: "6", question: "Any age restriction?", options: ["+5","+13","+16","+18"] },
        { id: "7", question: "What is the preferred period of the show?", options: ["less than 1 hour", "Between 1 and 1.5 hours", "Between 1.5 and 2 hours", "Over 2 hours"] }
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
      isDisabled() {
      return this.selectedOption.length === 0 && this.selectedOptions.length === 0;
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
    created() {
      setTimeout(() => {
        this.showForm = true;
      }, 300);
    },
    methods: {
      nextQuestion() {
        if(this.selectedOption.length>0 || this.selectedOptions.length>0){
          if (this.currentQuestion.options.length) {
            if (this.isMultiSelect(this.currentQuestion)) {
              this.responses[this.currentQuestionIndex] = this.selectedOptions;
            } else {
              this.responses[this.currentQuestionIndex] = this.selectedOption;
            }
          } else {
            this.responses[this.currentQuestionIndex] = this.userInput;
          }
          if (!this.isLastQuestion) {
            this.currentQuestionIndex++;
            this.selectedOption = '';
            this.selectedOptions = [];
            this.userInput = '';
          }  else {
            let req = {}
            for (let i = 0; i < this.responses.length; i++) {
              if (i === 0) {
                if (this.responses[i] === "Series") {
                  req['type'] = "Show"
                }
                else req['type'] = this.responses[i];
              }
              else if (i === 1) {
                req['genres'] = this.responses[i];
              }
              else if (i === 2) {
                let s = "";
                for (let j = 0; j < this.responses[i].length; j++) {
                  if (this.responses[i][j] === "Happy") {
                    this.responses[i][j] = "Happiness"
                  }
                  else if (this.responses[i][j] === "Surprised") {
                    this.responses[i][j] = "Surprise"
                  }
                  else if (this.responses[i][j] === "Angry") {
                    this.responses[i][j] = "Anger"
                  }
                  else if (this.responses[i][j] === "Scared") {
                    this.responses[i][j] = "Fear"
                  }
                  else if (this.responses[i][j] === "Sad") {
                    this.responses[i][j] = "Sadness"
                  }
                  else if (this.responses[i][j] === "Excited") {
                    this.responses[i][j] = "Excitement"
                  }
                  else if (this.responses[i][j] === "Frustrated") {
                    this.responses[i][j] = "Frustration"
                  }
                  else if (this.responses[i][j] === "Tense") {
                    this.responses[i][j] = "Tension"
                  }
                  else if (this.responses[i][j] === "Nostalgic") {
                    this.responses[i][j] = "Nostalgia"
                  }
                }
                req['emotions'] = this.responses[i];
              }
              //else if(i===3){
              //req['platforms']=this.responses[i];
              //}
              else if (i === 4) {
                if (this.responses[i] === "After 2010") {
                  req['release_year'] = 2010;
                }
                else if (this.responses[i] === "After 1999") {
                  req['release_year'] = 1999;
                }
                else if (this.responses[i] === "After 1965") {
                  req['release_year'] = 1965;
                }
                else {
                  req['release_year'] = 1900

                    ;
                }
              }
              else if (i === 5) {
                req['age_certification'] = this.responses[i];
              }
              else if (i === 6) {
                if (this.responses[i] === "less than 1 hour") {
                  req['length'] = "short"
                }
                else if (this.responses[i] === "Over 2 hours")
                  req['length'] = "long";
              }
              else {
                req['length'] = "medium"
              }
            }
          try{
              let url=`${RECURL}/api/submit-session-answer?session_code=`
              url+=this.sessionCode;
              url+="&token="
              let thistoken = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
              url += thistoken;
              console.log(req)
              let response = axios.post(url, req);
              console.log(response)
          }
          catch(err){
              console.log(err)
            }
            this.$router.push({ name: 'Waiting', params: { sessionCode:this.sessionCode } });
          }
        }
      },
      previousQuestion() {
        if (this.currentQuestionIndex > 0) {
          this.currentQuestionIndex--;
        }
      },
      isSelected(option) {
        if (this.isMultiSelect(this.currentQuestion)) {
          return this.selectedOptions.includes(option);
        }
        return this.selectedOption === option;
      },
      isMultiSelect(question) {
        return question.multi === true;
      },
      toggleOption(option) {
        if (this.isMultiSelect(this.currentQuestion)) {
          const index = this.selectedOptions.indexOf(option);
          if (index > -1) {
            this.selectedOptions.splice(index, 1);
          } else {
            this.selectedOptions.push(option);
          }
        } else {
          this.selectedOption = option;
        }
      }
    },
    async mounted() {
      try{
        let thistoken = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        let url=`${RECURL}/api/generate-session-code?token=`;
        url+=thistoken;
        console.log(url)
        let response= await axios.get(url)
        console.log(response.data.code)
        console.log(response.data);
        this.sessionCode=response.data.code
      }
      catch(err){
        console.log(err)
      }
    }
  };
  </script>
  
    
<style scoped>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  
    .quizContainer{
      position: relative;
      display: inline-block;
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

  .disabled-btn {
  background: rgba(140, 69, 255, 0.1) !important;
  color: grey !important;
  cursor: not-allowed !important;
}
  
  .content-container{
    z-index: 1;
    display: relative;
    height: 100%;
    /* transition: all 0.3s ease-in-out; */
  }
  
  .quiz-title{
  font-size: 45px;
  z-index: 1;
  color: white;
  text-align: center;
  margin: 10px;
}
  
  /* .quiz-title > h1 {
    box-shadow: -6px 4px 10px rgba(0, 0, 0, 0.7);
  } */
  
  .question-header{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease-in-out;
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

    z-index: 0;
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
      background: linear-gradient(180deg, #010002d6 0%, #010002d8 25%, #461295de 100%);         box-shadow: -6px 4px 10px rgba(0, 0, 0, 0.7);
      box-shadow: inset 0px 0px 6px 7px rgba(0, 0, 0, 0.45);
  
      padding: 30px;
      /* width: 36vw; */
      height: 85%;
      width: auto;
    min-width: 800px; /* Initial static width */
      max-width: 900px;
      /* max-width: 600px; */
      border-radius: 30px;
      z-index: 1;
      /* margin-top: 20px; */
      transition: all 0.3s ease-in-out;
    }

    
  
     
    .optionWrapper{
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
      /* transition: all 0.3s ease-in-out; */
    }
  
    .optionWraper:hover{
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
      }
  
      /* input[type="radio"]:checked + .optionLabel {
  
  
      box-shadow: inset 0px 0px 6px 1px #8C45FF;
      outline: 1px solid rgba(255, 255, 255, 0.5);
      } */
  
      .selected-option{
      background: rgb(140, 69, 255, 0.4);
      color: white;
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
      /* background-image: radial-gradient(rgb(37, 7, 56) 70%, rgb(95, 16, 148));
      border: solid rgb(51, 44, 3) 1px;
      color: white;
      margin-left: 450px; */
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
  .selected-option {
    background: rgb(140, 69, 255, 0.4);
    color: white;
    box-shadow: inset 0px 0px 6px 5px #8C45FF;
    outline: 1px solid #8C45FF;
    transition: all 0.3s ease-in-out;
  }
  
  .inputText {
    width: 500px;
    border: solid rgb(51, 44, 3) 1px;
    background-color: #33185f;
    text-align: left;
    color: white;
    padding: 20px;
    max-width: 100%;
    resize: none;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
    /* transition: all 0.3s ease-in-out; */
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 30px;
  }
  
  .inputText::placeholder {
    font-family: Raleway;
    color: rgba(255, 255, 255, 0.47);
  }
  
  .inputText:hover {
    box-shadow: inset 0px 0px 6px 5px #8C45FF;
    outline: 1px solid #8C45FF;
    transition: all 0.3s ease-in-out;
  }
  
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0;
  }
  
  .buttons > button {
    margin-top: 20px;
    width: fit-content;
    height: 40px;
    margin-left: 5px;
  }
  
  .button {
    cursor: pointer;
    margin-bottom: 15px;
    padding: 10px 30px;
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.5px;
  }
  
  .next-btn {
    background: rgba(140, 69, 255, 0.4);
    color: white;
    border: 2px transparent solid;
    font-weight: 500;
    font-size: 12px;
    text-decoration: none;
    padding: 4;
  }
  .option-wrapper {
    display: flex;
    align-items: center;
    margin: 5px 0;
    transition: all 0.3s ease;
    
  }
  
  .optionLabel {
    display: block;
    cursor: pointer;
    padding: 10px;
    margin: 0;
    color:white;
    border:white solid 1px;
    border-radius: 20px;
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    transition: all 0.3s ease;
    width:100%;
    text-align:center;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
  }
  .optionLabel:hover{
      box-shadow: inset 0px 0px 6px 1px rgb(255, 255, 255);
      outline: 1px solid rgba(255, 255, 255, 0.5);
  }
  .selected-option {
    background: rgba(140, 69, 255, 0.4);
    color: white;
    box-shadow: inset 0px 0px 6px 5px #8C45FF;
    outline: 1px solid #8C45FF;
  }
  
  .inputText {
    width: 500px;
    border: solid rgb(51, 44, 3) 1px;
    background-color: #33185f;
    text-align: left;
    color: white;
    padding: 20px;
    max-width: 100%;
    resize: none;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
    transition: all 0.3s ease-in-out;
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 30px;
  }
  
  .inputText::placeholder {
    font-family: Raleway;
    color: rgba(255, 255, 255, 0.47);
  }
  
  .inputText:hover {
    box-shadow: inset 0px 0px 6px 5px #8C45FF;
    outline: 1px solid #8C45FF;
    transition: all 0.3s ease-in-out;
  }
  
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0;
  }
  
  .buttons > button {
    margin-top: 20px;
    width: fit-content;
    height: 40px;
    margin-left: 5px;
  }
  
  .button {
    cursor: pointer;
    margin-bottom: 15px;
    padding: 10px 30px;
    /* border: none; */
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.5
  }


  .sessionCode p{
    position: absolute;
    color: white;
    top: 40px;
    left:8%;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.409);
    border-radius: 15px;
  }

  .sessionCode p > span{
    font-weight: 800;
    font-size: 25px;
    color:#f89305
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
  
  