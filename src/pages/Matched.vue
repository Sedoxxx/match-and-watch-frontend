<template>
  <div id="app" class="podium-container">
    <h1 class="match-title Raleway">Match+</h1>
    <div class="card-container Raleway">
      <div v-for="(movie, index) in movies" :key="movie.id" :class="['card', index === 0 ? 'small' : index === 1 ? 'large' : index === 2 ? 'small' : 'small']">
        <div class="image-container">
          <img :src="movie.image" :alt="movie.title" />
          <div class="overlay">
            <a :href="`https://www.imdb.com/title/${movie.imdb_id}/`" target="_blank" class="watch-button Raleway">Watch</a>
          </div>
        </div>
        <div class="ranking Raleway">{{ index + 1 }}</div>
        <div class="movie-details">
          <h2 class="movie-title"><span>{{ movie.title }}</span></h2>
          <p class="movie-description">{{ truncateText(movie.description, 150) }}</p>
          <p class="movie-rating" v-if="movie.imdb_score">Rating: {{ movie.imdb_score }}</p>
        </div>
      </div>
    </div>
    <div class="blur-circle"></div>
    <div class="blur-circle"></div>
    <div class="films-container"></div>
    <div  v-if="isLoading" class="loading-spinner faded">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import { RECURL } from '@/const';
import store from '@/store/store';
import { GET_USER_TOKEN_GETTER } from '@/store/storeconstants';
import axios from 'axios';

export default {
  name: 'App',
  props: ['req', 'sessionCode'],
  data() {
    return {
      movies: [      
    //     {
    //     id: 1,
    //     movie_imdb_id: 'tt0111161',
    //     title: 'The Shawshank Redemption',
    //     description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    //     rating: 5
    //   },
    //   {
    //     id: 2,
    //     movie_imdb_id: 'tt0068646',
    //     title: 'The Godfather',
    //     description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    //     rating: 4
    //   },
    //   {
    //     id: 3,
    //     movie_imdb_id: 'tt0071562',
    //     title: 'The Godfather Part II',
    //     description: 'The early life and career of Vito Corleone in 1920s New York is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
    //     rating: 0
    //   }
      ],
      isLoading: true,
    };
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    }
  },
  async mounted() {
    let moviesFromBackend = [
    // {
    //     id: 1,
    //     imdb_idll: 'tt0111161',
    //     title: 'The Shawshank Redemption',
    //     description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    //     rating: 5
    //   },
    //   {
    //     id: 2,
    //     imdb_id: 'tt0068646',
    //     title: 'The Godfather',
    //     description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    //     rating: 4
    //   },
    //   {
    //     id: 3,
    //     imdb_id: 'tt0071562',
    //     title: 'The Godfather Part II',
    //     description: 'The early life and career of Vito Corleone in 1920s New York is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
    //     rating: 0
    //   }


    ];
    const minLoadingTime = 3000; // Minimum loading time in milliseconds
    const startTime = Date.now();
    const request = this.req

    if (this.req != null) {
      try {
        let thistoken = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        let url = `${RECURL}/api/movies?token=${thistoken}`;
        
        let dictionary = JSON.parse(request);
        let response = await axios.post(url, dictionary);
        moviesFromBackend = response.data;
      }
      catch (err) {
        console.log(err);
      }
    } else {
      try {
        let thistoken = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
        let url = `${RECURL}/api/close-session?token=${thistoken}&session_code=${this.sessionCode}`;
        let response = await axios.post(url);
        moviesFromBackend = response.data;
      }
      catch (err) {
        console.log(err);
      }
    }

    if (moviesFromBackend.length > 3) {
      moviesFromBackend.pop();
    }
    if (moviesFromBackend.length > 3) {
      moviesFromBackend.pop();
    }

    let promises = moviesFromBackend.map(movie => {
      let url = 'https://img.omdbapi.com/?apikey=ee3c8d4a&i=' + movie.imdb_id;
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.url;
        })
        .then(imageUrl => {
          movie.image = imageUrl;
          return movie;
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          movie.image = require('@/assets/images/placeholder2.jpg');
          return movie;
        });
    });

    Promise.all(promises).then(updatedMovies => {
    //   const temp = this.updatedMovies[0];
    //   this.updatedMovies[0] = this.updatedMovies[1];
    //   this.updatedMovies[1] = temp;
      this.movies = updatedMovies;
      this.isLoading = false;
    });
  }
};
</script>

<style scoped>
  .match-title {
    font-size: 50px;
    font-weight: 700;
    z-index: 1;
    color: white;

    /* margin-top: 10px; */
    margin-bottom: 30px;
  }
  
  .podium-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 100px);
    background-color: black;
    /* transition: all 1s ease-in-out; */
  }
  
  .card-container {
    /* height: 100%; */
    display: flex;
    align-items: flex-start;
    z-index: 1;
  }
  
  .card {
    position: relative;
    width: 21vw;
    margin: 0 10px;
    /* background: rgb(140, 69, 255, 0.1); */
    background: linear-gradient(180deg, rgb(1, 0, 2, 1) 0%, rgba(1, 0, 2, 0.759) 50%, rgb(1, 0, 2, 0.7) 90%, rgb(140, 69, 255, 0.6) 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    align-content: center;
    outline: 0px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 15px;
    overflow: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    text-align: center;
    box-shadow: inset 0px 0px 6px 1px rgb(5, 5, 5);
    transition: all 0.3s ease-in-out;
  }

  .card:hover{
    box-shadow: inset 0px 0px 6px 1px rgb(255, 255, 255);
    outline: 1px solid rgba(255, 255, 255, 0.8);
  }

  /* .optionDes{
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
  } */

  
  .card img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease, filter 0.3s ease;
  }
  
  .card .ranking {
    position: absolute;
    top: 10px;
    right: 10px;
    /* background: rgb(140, 69, 255, 0.7); */
    background:rgb(0, 0, 0);
    font-family: Inter;
    color: rgb(255, 255, 255);
    padding: 3px 12px 7px 12px;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
    /* box-shadow: inset 0px 0px 6px 1px rgba(00, 0, 0, 40%); */
    font-size: 22px;
    font-weight: 700;
  }
  
  .card.large {
    /* width: 30%; */
    /* transform: translateY(-20px); */
  }
  
  .card.small {

    /* width: 30%; */
  }
  
  .image-container {
    position: relative;
    border-radius: 50px;
  }

  .image-container img{
    height: 40vh;
    width: auto;
    padding-top: 5px;
    border-radius: 15px;
  }
  
  .image-container .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-container:hover img {
    transform: scale(1.1);
    filter: blur(2px) brightness(0.7);

  }
  
  .image-container:hover .overlay {
    opacity: 1;
  }
  
  .watch-button {
    background: rgb(140, 69, 255);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }
  
  .watch-button:hover {
    background: rgb(140, 69, 255, 0.8);
  }
  
  .movie-details {
    /* height: 200px; */
    padding: 10px;
    color: white;
  }
  
  .movie-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font: Raleway;
    font-size: 27px;
    font-weight: bold;
    height: 100px;
    margin: 15px;
    text-align: center;
    background: rgba(0, 0, 0, 0.604);
    box-shadow: -1px 1px 10px rgba(255, 255, 255, 0.5);
    border-radius: 35px;
    padding: 10px 5px;
    color: rgb(255, 255, 255);

  }
  
  .movie-description {
    font-size: 14px;
    font-weight: 500;
    margin: 15px 0;
  }
  
  .movie-rating {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .blur-circle {
    display: inline-block;
    position: absolute;
    overflow: auto;
    height: 900px;
    width: 900px;
    transform: scale(0.9);
    opacity: 0.7;
    background-position-x: center;
    background-position-y: center;
    top: -15vh;
    left: 15vw;
    background: url('../assets/images/blur.png');
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
  width: 300px;
  height: 300px;
  top: 30vh;
  background: linear-gradient(180deg, rgba(1, 0, 2, 0.5) 0%, rgba(1, 0, 2, 0.5) 34%, rgba(95, 35, 184, 1) 100%);
  border-radius: 50%;
  filter: blur(50px);
  animation: rotateCircle 5s linear infinite;
  z-index: 2;
}


@keyframes rotateCircle {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 100px);
    background-color: black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.spinner {
  position: absolute;
  top: 200px;
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
  
.faded-spin-leave-active {
    opacity: 1;
    transition: opacity 0.5s;
  }
.faded-spin-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }


  </style>