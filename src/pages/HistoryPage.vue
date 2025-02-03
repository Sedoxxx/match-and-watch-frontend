<template>
  <div id="app" class="podium-container">
      <h1 class="match-title Raleway">Matches History</h1>
      <div class="card-container Raleway">
          <div v-for="(movie, index) in movies" :key="movie.id" :class="['card', 'small']">
              <div class="image-container">
                  <img :src="movie.image" :alt="movie.title" />
                  <div class="overlay">
                      <a :href="`https://www.imdb.com/title/${movie.movie_imdb_id}/`" target="_blank" class="watch-button Raleway">Watch</a>
                  </div>
              </div>
              <div class="ranking Inter">{{ index + 1 }}</div>
              <div class="movie-details">
                  <h2 class="movie-title">{{ movie.title }}</h2>
                  <p class="movie-description">{{ truncateDescription(movie.description) }}</p>
                  <p class="movie-rating Inter" v-if="movie.rating !== 0">Rating: {{ movie.rating }}</p>
                  <div class="notRated" v-if="movie.rating === 0">
                      <p class="Inter">Rate me</p>
                      <div class="ratings-wrapper">
                          <div class="ratings">
                              <span v-for="rating in [5, 4, 3, 2, 1]" :key="rating" :data-rating="rating" @click="setRating(movie, rating)" :class="{ active: rating <= movie.rating }">
                                  &#9733;
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div  v-if="isLoading" class="loading-spinner faded">
        <div class="spinner"></div>
      </div>
      <div class="films-container"></div>
  </div>
</template>

<script>
import store from '@/store/store';
import { GET_USER_TOKEN_GETTER } from '@/store/storeconstants';
import axios from 'axios';
import { RECURL } from '@/const';

export default {
    data() {
        return {
            movies: [],
            isLoading: true
        };
    },
    async mounted() {
        let moviesFromBackend = [];
      moviesFromBackend = [
      // {
      //   id: 1,
      //   movie_imdb_id: 'tt0111161',
      //   title: 'The Shawshank Redemption',
      //   description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      //   rating: 5
      // },
      // {
      //   id: 2,
      //   movie_imdb_id: 'tt0068646',
      //   title: 'The Godfather',
      //   description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      //   rating: 4
      // },
      // {
      //   id: 3,
      //   movie_imdb_id: 'tt0071562',
      //   title: 'The Godfather Part II',
      //   description: 'The early life and career of Vito Corleone in 1920s New York is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
      //   rating: 0
      // },
      // {
      //   id: 4,
      //   movie_imdb_id: 'tt0468569',
      //   title: 'The Dark Knight',
      //   description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      //   rating: 3
      // },
      // {
      //   id: 5,
      //   movie_imdb_id: 'tt0050083',
      //   title: '12 Angry Men',
      //   description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
      //   rating: 0
      // },
      // {
      //   id: 6,
      //   movie_imdb_id: 'tt0108052',
      //   title: 'Schindler\'s List',
      //   description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
      //   rating: 4
      // }
    ];
       try {
            let url = `${RECURL}/api/movies/history?token=`;
            let thistoken = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
            url += thistoken;
            let response = await axios.get(url);
            moviesFromBackend = response.data;
        } catch (err) {
            console.log(err);
        }
        //console.log(moviesFromBackend);
  
        let promises = moviesFromBackend.map(movie => {
            let url = 'https://img.omdbapi.com/?apikey=ee3c8d4a&i=' + movie.imdb_id;
           // console.log(url);
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
            this.isLoading = false;
            this.movies = updatedMovies;

        });
    },
    methods: {
        async setRating(movie, rating) {
            for (let i = 0; i < this.movies.length; i++) {
                if (this.movies[i] === movie) {
                    this.movies[i].rating = rating;
                }
            }
            try{
              let url=`${RECURL}/api/rate/movie?rate=`;
              url+=rating;
              url+="&movie_imdb_id="
              url+=movie.movie_imdb_id
              url+="&token="
              let thistoken = store.getters[`auth/${GET_USER_TOKEN_GETTER}`];
              url += thistoken;
              let response = await axios.post(url);
            }
            catch(err){
               console.log(err)
            }
        },
        truncateDescription(description) {
            return description.length > 150 ? description.substring(0, 147) + '...' : description;
        }
    }
}

</script>

<style scoped>


.match-title {
    font-size: 36px;
    font-weight: 700;
    z-index: 1;
    color: white;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  
  .podium-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    background-image:linear-gradient(rgb(16, 1, 29),black)
  }
  
  .card-container {

    width: 70%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: space-between;
    row-gap: 30px;
    column-gap: 10px;
    z-index: 1;
    
  }
  
  .card {

    width: 300px;
    margin: 0 10px;
    /* background: rgb(140, 69, 255, 0.1); */
    background: linear-gradient(180deg, rgb(1, 0, 2, 1) 0%, rgb(1, 0, 2, 0.5) 50%, rgb(1, 0, 2, 0.7) 90%, rgb(140, 69, 255, 0.6) 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    align-content: center;
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 40%);
    transition: all 0.3s ease-in-out;
  }

  .card:hover{
    box-shadow: inset 0px 0px 6px 1px rgb(255, 255, 255);
    outline: 1px solid rgba(255, 255, 255, 0.8);
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
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 12px;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5);
    /* box-shadow: inset 0px 0px 6px 1px rgba(00, 0, 0, 40%); */
    font-size: 16px;
  }
  
  .card.large {
    width: 280px;
    transform: translateY(-20px);
  }
  
  .card.small {
    width: 230px;
  }
  
  .image-container {
    position: relative;
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
    padding: 10px;
    color: white;
  }
  
  .movie-title {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .movie-description {
    font-size: 14px;

    margin: 10px 0;
  }
  
  .movie-rating {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
  }
  .ratings-wrapper {
    display: inline-block;
    padding: 0 10px;
}

.ratings {
    display: flex;
    flex-direction: row-reverse;
}

.ratings span {
    cursor: pointer;
    transition: color .2s, transform .2s;
    font-size: 20px;
}

.ratings span:hover,
.ratings span:hover ~ span{
    color: orange;
    transform: scale(1.3);
}
.ratings span.active {
    color: orange;
    transform: scale(1);
}

.films-container{
    /* display: inline-block; */
    position: absolute;
    /* margin-top: 200px; */
    overflow:auto;
    height: 1200px;
    width: 1200px;
    transform: scale(1);
    opacity: 0.1;
    background-position-x: center;
    background-position-y: center;
    overflow: hidden;
    top: -45vh;
    /* background: url(../assets/images/background.jpg); */
    background: url(../assets/images/container-films.png);

    z-index: 0;
}

</style>
