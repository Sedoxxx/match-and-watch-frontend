<template>
    <div class="homeContainer">
        <!-- <div class="blur-circle"></div>
        <div class="blur-circle"></div> -->
        <div class="blur-circle-black"> </div>
        <div class="blur-circle-rotate"> </div>

        <div class="films-container"></div>
       <div class="firstDivision">
            <h1 class="title-1 Inter">Let's match the best shows for you to watch</h1>
            <h3 class="title-2 Inter">Click this Button, Answer our Questions, Match, and Watch your Show</h3>
            <h3 class="title-3 Inter">You can find movies and series from a big variety of platforms</h3>
            <a  class="matchandwatchbutton" v-on:click="goToQuiz">Match & Watch</a>
       </div>
       <div class="thirdDivision Raleway">
        <p>You can find movies from the following platforms</p>
        <div class="logosConainter">
           <img src="../assets/images/logos/disney.svg" alt="Disney" class="logo">
           <img src="../assets/images/logos/Amazon_Prime_Logo.svg" alt="Amozon Prime" class="logo">
           <img src="../assets/images/logos/HBO_Max_Logo_White.svg" alt="HBO MAX" class="logo">
           <img src="../assets/images/logos/Netflix_2015_logo.svg" alt="Netflix" class="logo">
           <img src="../assets/images/logos/Paramount_Pictures_Corporation_logo.svg" alt="Disney" class="logo">
        </div>
       </div>
      <!-- 
        <div class="discover">
            <h1 class="explore">
                Explore our wide variety of categories
            </h1>
            <p class="exploreParagraph">
                Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new
            </p>
        </div>
        <div class="categories">
            <div class="category">
                <img src="../assets/images/newDesginBackground/large-m0156-thor-love-and-thunder-poster-12-x-18-inch-300-gsm-original-imagfzkdahxdsg3h.webp" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/unnamed (1).jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/71M8YFEakfL._AC_UF894,1000_QL80_.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/4-4127_avengers_endgame_movie_poster_web.jpg" class="cataegoryImage">
                <p class="categoryName">Action</p>
            </div>
            <div class="category">
                <img src="../assets/images/newDesginBackground/61ljrN7zmoL._AC_UF894,1000_QL80_.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/wb0101-8harrypotter-thephilosophersstoneno150x70.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/MV5BOTY0ZjliOGUtMDFiZS00YzcwLWFiZWYtMzg4MWZkMWIwYzYwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg" class="cataegoryImage">
                <p class="categoryName">Comedy</p>
            </div>
            <div class="category">
                <img src="../assets/images/newDesginBackground/large-m0156-thor-love-and-thunder-poster-12-x-18-inch-300-gsm-original-imagfzkdahxdsg3h.webp" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/s-l1600.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/Money_Heist_Korea_Denver_Poster_EN.webp" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/unnamed (1).jpg" class="cataegoryImage">
                <p class="categoryName">Drama</p>
            </div>
            <div class="category">
                <img src="../assets/images/newDesginBackground/s-l1600.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/xciwhezc8y9y.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/unnamed.jpg" class="cataegoryImage">
                <img src="../assets/images/newDesginBackground/large-m0156-thor-love-and-thunder-poster-12-x-18-inch-300-gsm-original-imagfzkdahxdsg3h.webp" class="cataegoryImage">
                <p class="categoryName">Horror</p>
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                require('@/assets/images/newDesginBackground/$_57.jpeg'),
                require('@/assets/images/newDesginBackground/3ba32041615387.57acc4bf0b15f.jpg'),
                require('@/assets/images/newDesginBackground/4-4127_avengers_endgame_movie_poster_web.jpg'),
                require('@/assets/images/newDesginBackground/61ljrN7zmoL._AC_UF894,1000_QL80_.jpg'),
                require('@/assets/images/newDesginBackground/71M8YFEakfL._AC_UF894,1000_QL80_.jpg'),
                require('@/assets/images/newDesginBackground/81U0-cRG34S._AC_UF894,1000_QL80_.jpg'),
                require('@/assets/images/newDesginBackground/DE_1899S1_Main_Vertical_27x40_RGB_PRE.jpg'),
                require('@/assets/images/newDesginBackground/Eyizh9ZU4AMPelM.avif'),
                require('@/assets/images/newDesginBackground/Glow-Season-1-One-Sheet-Poster-Print-22-x-34_db8f4b67-da32-4b2b-b46f-b85c80a585c0.2363af5d231b52395b4ac40af3549ada.webp'),
                require('@/assets/images/newDesginBackground/harry-potter-and-the-deadly-hallows-i133035.jpg'),
                require('@/assets/images/newDesginBackground/i8szyqqin2o71.webp'),
                require('@/assets/images/newDesginBackground/large-m0156-thor-love-and-thunder-poster-12-x-18-inch-300-gsm-original-imagfzkdahxdsg3h.webp'),
                require('@/assets/images/newDesginBackground/Money_Heist_Korea_Denver_Poster_EN.webp'),
                require('@/assets/images/newDesginBackground/MV5BMDBiZmI1OGItNTNhOS00NTc4LTk4MzItNWFjYjEzODFkYjg3XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg'),
                require('@/assets/images/newDesginBackground/MV5BMjAyMDMzNTU5M15BMl5BanBnXkFtZTgwMjg2NjExNjM@._V1_.jpg'),
                require('@/assets/images/newDesginBackground/MV5BNzVkOTIxZWUtMTNjOC00NWMwLWEyNDQtNTY2NzYxNjhhYTA1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg'),
                require('@/assets/images/newDesginBackground/MV5BOTY0ZjliOGUtMDFiZS00YzcwLWFiZWYtMzg4MWZkMWIwYzYwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'),
                require('@/assets/images/newDesginBackground/s-l1600.jpg'),
                require('@/assets/images/newDesginBackground/xciwhezc8y9y.jpg'),
                require('@/assets/images/newDesginBackground/wb0101-8harrypotter-thephilosophersstoneno150x70.jpg'),
                require('@/assets/images/newDesginBackground/unnamed.jpg'),
                require('@/assets/images/newDesginBackground/unnamed (1).jpg'),
                require('@/assets/images/newDesginBackground/s-l1600.jpg'),
                require('@/assets/images/newDesginBackground/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'),
                require('@/assets/images/newDesginBackground/MV5BOTY0ZjliOGUtMDFiZS00YzcwLWFiZWYtMzg4MWZkMWIwYzYwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'),
                require('@/assets/images/newDesginBackground/s-l1600.jpg'),
                require('@/assets/images/newDesginBackground/i8szyqqin2o71.webp'),
                require('@/assets/images/newDesginBackground/MV5BNzVkOTIxZWUtMTNjOC00NWMwLWEyNDQtNTY2NzYxNjhhYTA1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg'),
                require('@/assets/images/newDesginBackground/MV5BMjAyMDMzNTU5M15BMl5BanBnXkFtZTgwMjg2NjExNjM@._V1_.jpg'),
                require('@/assets/images/newDesginBackground/s-l1600.jpg')
            ]
        };
    },
    computed: {
        token() {
            return this.$store.state.auth.token;
        }
    },
    methods: {
    goToQuiz() {
        this.$router.push('/quizMode')
    }
}

};
</script>



<style scoped>
.homeContainer{
    width: 100%;
    height: 150vh;
    display: flex;
    overflow-x: none;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background: black;
}
.firstDivision{
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content:flex-start;
    align-items: center;
    flex-direction: column;    
    overflow-x: none;
    /* background: black; */
    margin-bottom: 100px;
    z-index: 3;
}
.thirdDivision{
    width: 100%;
    height: calc(20vh);
    display: flex;
    justify-content:flex-start;
    align-items: center;
    flex-direction: column;

    /* background: black; */
    z-index: 3;
}

.thirdDivision > p {
    font-weight: 400;
}

.blur-circle-black {
  position: absolute;
  width: 800px;
  height: 800px;
  /* top: 20vh; */
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* background-image: linear-gradient(180deg,rgb(0, 0, 0, 0.5), rgb(122, 82, 187, 0.8) ); */
  background: rgba(0, 0, 0, 0.85);
  border-radius: 50%;
  filter: blur(50px);
  z-index: 2;
}

.blur-circle-rotate {
  position: absolute;
  width: 800px;
  height: 800px;
  top: 20vh;
  background: linear-gradient(180deg, rgb(1, 0, 2, 0.5) 0%, rgb(1, 0, 2, 0.5) 34%, rgba(95, 35, 184, 0.8) 100%);
  border-radius: 50%;
  filter: blur(50px);
  animation: rotateCircle 5s linear infinite;
  z-index: 2;
}

@keyframes rotateCircle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.title-1 {
    font-family: Raleway;
    font-weight: 700;
    width: 65%;
    font-size: 82px;
    line-height: 0.9;
}

.title-2 {
    font-family: Raleway;
    font-weight: 600;
}
.title-3 {
    font-family: Raleway;
    font-weight: 400;
}


h1{
    font-weight: 900;
    font-style: normal;
    color: white;
    font-size: 3em;
    text-align: center;
    padding-top: 1em;
    z-index: 20;
    margin-top: 0.5em;
    margin-bottom: 0.25em;
}
h3{
    font-weight: 900;
    font-style: normal;
    color: white;
    text-align: center;
    z-index: 20;
    margin-bottom: 0.5em;
}
.matchandwatchbutton{
    font-family: Raleway;
    font-weight: 700;
    text-align: center;
    margin: auto;
    /* display: grid; */
    /* width: 210px; */
    width: 270px;

    /* height: 60px; */
    text-decoration: none;
    font-size: 25px;
    padding: 15px 5px;
    border-radius: 20px;
    cursor: pointer;
    /* text-transform: uppercase; */
    letter-spacing: 1px;
    border: 2px transparent solid;
    color: #2b0268;
    color: black;
    background-size: 400%;
    margin: 0;
    background-image: linear-gradient(90deg,#b185f8, #5b2da5b1,#b185f8);
    background-image: linear-gradient(90deg, rgb(164, 118, 238), rgba(140, 69, 255, 0.4), rgb(164, 118, 238));
    transition: all 0.3s ease-in-out;
}
.matchandwatchbutton:before{
    content: '';
    position: absolute;
    background: inherit;
    top: -5px;
    right: -5px;
    left: -5px;
    width: 200px;
    height: 80px;
    bottom: -5px;
    background: #8e45f5;
    border-radius: 50px;
    filter: blur(20px);
    opacity: 0;
    transition: opacity 0.5s
}
.matchandwatchbutton:before{
    opacity: 1;
    z-index: -1;
}

.matchandwatchbutton:hover{
    background-image: none;
    background-color: transparent;
    color: #FFFFFF;
    border: 2px #FFFFFF solid;
}

.matchandwatchbutton{
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
button{
    background: white;
    color:black;        
    height: 30px;
    border-radius: 20px;
}
img{
    height: 200px;
    width: 150px;
    margin: 10px;
    border-radius: 20px;
}
.imagesContainer{
    opacity: 0.7;
    margin-left: 100px;
    margin-right: 30px;
   margin-bottom: 100px;
}
.logosConainter{
    display: flex;
    flex-wrap: wrap;
    gap:5px;
    margin: 0;
}
.logo{
    border: solid;
    border-color: white;
    width:220px;
    height: 120px;
    padding: 25px;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 25%);

    border: solid 0.7px #a0a0a0;
}
p{
    color: white;
    width: 800px;
    font-weight: 100;
    margin-bottom: 40px;
    font-size: 20px;
    text-align: center;
}
.explore{
    margin-left: -330px;
}
.category{
    display: flex;
    width: 250px;
    height: 350px;
    flex-wrap: wrap;
    border: solid white 1px;
    margin-right: 30px;
    margin-bottom: 20px;
    border-radius: 20px;
}
.cataegoryImage{
    height: 120px;
    width: 100px;
    margin:10px;
    border-radius: 0;
}
.categories{
    display: flex;
    padding-left: 270px;
}
.categoryName{
    margin-left: 50px;
}
a{
    text-decoration: none;
    width: 100px;
}
.blur-circle{
    display: inline-block;
    position: absolute;
    overflow:auto;
    height: 900px;
    width: 900px;
    margin-top: 70px;
    transform: scale(1.5);
    opacity: 0.4;
    background-position-x: center;
    background-position-y: center;
    top: -15vh;
    left: 15vw;
    background: url(../assets/images/blur.png);
    z-index: 2;
}

.films-container{
    /* display: inline-block; */
    position: absolute;
    /* margin-top: 200px; */
    overflow:auto;
    height: 1200px;
    width: 1200px;
    transform: scale(1.2);
    opacity: 0.5;
    background-position-x: center;
    background-position-y: center;
    overflow: hidden;
    top: -30vh;
    /* background: url(../assets/images/background.jpg); */
    background: url(../assets/images/container-films.png);

    z-index: 1;
}


@media (max-width: 1310px) {
    .films-container{
        transform: scale(1);
    }
}
@media (max-width: 1210px) {
    .films-container{
        transform: scale(0.9);
    }
}
@media (max-width: 1110px) {
    .films-container{
        transform: scale(0.8);
    }
    .title-1 {
        font-size: 2.9em;
    }
}
@media (max-width: 1070px) {
    .films-container{
       display: none;
    }
    .title-1 {
        font-size: 2.7em;
    }
}
@media (max-width: 950px) {
    .films-container{
       display: none;
    }
}
@media (max-width: 700px) {
    .title-1 {
        font-size: 2.4em;
    }
}
@media (max-width: 600px) {
    .title-1 {
        font-size: 2.2em;
    }
}
@media (max-width: 510px) {
    .title-1 {
        font-size: 2.2em;
    }
}
</style>