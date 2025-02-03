<template>
    <div class="matchesContainer">
       <div v-for="movie in movies" :key="movie.title" class="movie">
          <img :src="movie.image" :alt="movie.title">
          <div class="nameRating">
               <h3>{{ movie.title }}</h3>
               <p class="rating">{{ movie.rating }}</p>
          </div>
          <p>{{ movie.description }}</p>
       </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            movies: [],
        };
    },
    mounted(){
      let moviesFromBackend=null;
      moviesFromBackend=[
        {'id':'tt0241527','title':'Harry Potter and the Sorcerer\'s Stone','description':'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.','rating':'7.6'},
        {'id':'tt0241527','title':'Harry Potter and the Sorcerer\'s Stone','description':'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.','rating':'7.6'},
        {'id':'tt0241527','title':'Harry Potter and the Sorcerer\'s Stone','description':'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.','rating':'7.6'},
      ]
      for(let i=0; i<moviesFromBackend.length;i++){
        let s="https://img.omdbapi.com/?apikey=ee3c8d4a&i="+moviesFromBackend[i].id; 
        moviesFromBackend[[i]]["image"]=s;
      }
      this.movies=moviesFromBackend
    }
}
</script>

<style scoped>
   
   html, body {
        height: 100%;
        margin: 0;
        padding: 0;
   }
   .matchesContainer {
        height: 110vh;
        width: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        padding: 60px;
        background-image: radial-gradient(#3e1d72,black);
        color: white;
        
   }
   .movie{
     width: 500px;
     border: solid rgb(51, 44, 3);
     border-radius: 20px;
     margin: 20px;
     padding: 20px;
     height: 700px;
     background-image: linear-gradient(#5b2da5,black);
   }
   img{
     width: 400px;
     height: 400px;
     margin-left: 25px;
     border-radius: 20px;
   }
   .nameRating{
     margin-top: 20px;
     display: flex;
   }
   .rating{
     margin-left: 130px;
   }

</style>
