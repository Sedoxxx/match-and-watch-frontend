<template>
        <div class="container">
        <div class="login-form" :style="{opacity: showForm ? '1' : '0', transform: showForm ? 'translateY(0)' : 'translateY(100px)' }">
            <Login/>
        </div>
        <div class="blur-circle"></div>
        <div class="blur-circle"></div>
        <div class="films-container"></div>
        </div>
</template>

<script>
    import Login from '../components/LoginComponents/Login.vue';
    export default{
        components:{
            Login,
        },
        data(){
            return{
                showForm: false,
            }
        },
        created(){
            setTimeout(() => {
                this.showForm = true;
            }, 300)
        },
        mounted(){
            document.title = "Match & Watch | Login";
        },
    }
</script>

<style scoped>
.container{
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


.login-form{
    z-index: 1;
    transition: all 0.3s ease-in-out;
}
</style>