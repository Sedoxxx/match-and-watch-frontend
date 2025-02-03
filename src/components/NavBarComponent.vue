<template>
  <header class="header">
    <a href="/" class="logo">
       <img  src="../assets/images/mw_logo.svg" alt="logo">
    </a>
    <nav class="navbar">
       <div class="navPart">
          <a href="/quizMode" class="nav-btn">
              <span>
                <img src="@/assets/images/navbar/movie.svg" alt="match-plus">
              </span>
              <span class="nav-btn-txt">Match</span>
          </a>
       </div>
       <div class="navPart">
          <a href="/history" class="nav-btn">
                <span>
                  <img src="@/assets/images/navbar/check.svg" alt="match-plus">
                </span>
                <span class="nav-btn-txt">History</span>
          </a>
       </div>
       <div class="navPart">
        <a href="/join" class="nav-btn">
             <span>
                <img src="@/assets/images/navbar/play.svg" alt="match-plus">
              </span>
              <span class="nav-btn-txt">Join Session</span>
          </a>
      </div>
      <div class="navPart">
        <a href="/create" class="nav-btn">
              <span>
                <img src="@/assets/images/navbar/plus.svg" alt="match-plus">
              </span>
              <span class="nav-btn-txt">Create Session</span>
        </a>
      </div>
    </nav>
 
    <div class="logedOut" v-if="isAuthenticated">
      <RouterLink to="/quizMode" class="register-btn button Raleway match-small-screen">Match</RouterLink>
      <RouterLink to="/" @click.prevent="onLogout()" class="register-btn button Raleway">Logout</RouterLink>
    </div>
    <div v-else class="logedOut">
      <RouterLink to="/quizMode" class="register-btn button Raleway match-small-screen">Match</RouterLink>
      <RouterLink to="/login_new" class="register-btn button Raleway">Login</RouterLink>
      <RouterLink to="/signup_new" class="register-btn button Raleway">SignUp</RouterLink>
    </div>
  </header>
</template>

 
<script>
    import { IS_USER_AUTHENTICATE_GETTER, LOGOUT_ACTION } from '@/store/storeconstants';
    import { RouterLink } from 'vue-router';
    import { mapActions, mapGetters } from 'vuex';
   export default{
      computed:{
        ...mapGetters('auth', {
          isAuthenticated:IS_USER_AUTHENTICATE_GETTER
        })
      },
      methods:{
        ...mapActions('auth',{
            logout:LOGOUT_ACTION   
        }),
        onLogout(){
          this.logout()
        }
      }
   };
</script>
 
<style scoped>
.header{
  position: sticky;
  top: 0;
  left:0;
  width: 100%;
  padding: 20px 200px;
  background:rgb(0, 0, 0);
  color:white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index:100;
  height: 100px;
}
.navbar{
  display: flex;
  justify-content: space-between;
  gap: 40px;
  border: solid rgb(255, 255, 255, 0.2);
  padding: 15px 40px;
  border-radius: 50px;
  border-width: thin;
  font-weight:100;
}
.nav-btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.logo > img {
}
.logedOut{
  display: flex;
  gap: 10px;
}
.authButton{
  padding:3px 30px;
  border: none;
  border-radius: 20px;
  color:white;
  background-image: radial-gradient(
    rgb(37, 7, 56) 70%,  
    rgb(95, 16, 148)
 );
}
a{
  text-decoration: none;
  color: white;
}
.navPart{
  display: flex;
  margin: 0;
}
.navPart > a {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  opacity: 60%;
  transition: all 0.3s ease-in-out;
}

.navPart >  a:hover{
  opacity: 100%;
  text-decoration: underline;
}
.button{
  cursor: poRaleway;
  margin-bottom: 15px;
  padding: 10px 30px;
  border: none;
  border-radius: 60px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
}
.login-btn, .register-btn{
  background: rgba(140, 69, 255, 0.4);
  color: white;
  border: 2px transparent solid;
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
  padding: 4px 20px;
  margin: 0;
  transition: all 0.3s ease-in-out;
}
.login-btn:hover, .register-btn:hover{
  background-color: transparent;
  color: #FFFFFF;
  border: 2px #FFFFFF solid;
}
@media (max-width: 1240px) {
  .header{
    padding: 20px 120px;
  }
  .navbar{
     gap:30px;
     padding:15px 35px;
  }
}
@media (max-width: 1050px) {
  .header{
    padding: 20px 80px;
  }
  .navbar{
     gap:20px;
     padding:15px 25px;
  }
}
@media (max-width: 950px) {
  .header{
    padding: 20px 60px;
  }
  .navbar{
     gap:15px;
     padding:15px 15px;
  }
}
.match-small-screen {
  display: none;
}

@media (max-width: 800px) {
  .navbar {
    display: none;
  }
  .logedOut {
    align-items: flex-start;
  }
  .match-small-screen {
    display: block;
  }
}


</style>