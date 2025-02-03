<template>
    <!-- Login Form -->
    <div v-if="!isLoggedIn" class="login-container center-div">
        <transition name="fadeUp">
            <successMsg v-if="success" class="login_popup" :message="successMessage"></successMsg>
        </transition>
        <transition name="fadeUp">
            <errorMsg v-if="apiError" class="login_popup" :message="errorMessage"></errorMsg>
        </transition>
        <h1 class="match-title zcool mb-3">Match & Watch</h1>
        <h2 class="login-title Raleway">Login</h2>
        <div class="login-form-container Raleway">
            <form action="\login" class="login-form center-div" id="login-form" @submit.prevent="onLogin()">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.lazy="email">
                    <div v-if="showError && !isValidEmail" class="input_error">Your email must not exceed 30 characters
                    </div>
                </div>
                <br>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password">
                    <div v-if="showError && !password" class="input_error">Please enter your password</div>
                </div>
                <div class="alert alert-danger" v-if="error">
                        {{ error }}
               </div>
                <div v-if="loading" class="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="submit-container">
                    <input type="submit" value="Login" class="login-btn button Raleway">
                    <RouterLink to="/signup_new" style="color: #F1F1F1"><h5 class="forgot-password Raleway">Forgot Password?</h5></RouterLink>
                </div>
            </form>
        </div>
        <div>
            
        </div>
        <h3 class="login-separator"></h3>
        <div class="login-register center-div">
            <h5 class="login-create-account Raleway">Don't Have an Account?</h5>
            <RouterLink to="/signup_new" class="register-btn button Raleway">Sign Up</RouterLink>
        </div>
    </div>
</template>



<script>
import SignupValidations from '../../services/SignupValidations'
import { mapActions } from 'vuex';
import { LOGIN_ACTION } from '@/store/storeconstants';
import successMsg from '../Popups/successMsg.vue';
import errorMsg from '../Popups/errorMsg.vue';

export default{
    components:{
        errorMsg,
        successMsg,
    },
    data(){
        return{
            email:'',
            password:'',
            errors:[],
            error:'',
            showError: false,
            success: false,
            apiError: false,
            loading: false,
            successMessage: "Login successfull\nWelcome Back",
            errorMessage: "Login failed!\nPlease try again later",
        }
    },
    methods:{
        ...mapActions('auth',{
            login:LOGIN_ACTION,
        }),
        async onLogin(){
          this.error=''
          this.errors=[]
          let validations=new SignupValidations(this.email,this.password);
          this.errors=validations.checkValidations();
          if('email' in this.errors || 'password' in this.errors){
            return false;
          }
          await this.login({ email: this.email, password: this.password}).then(() => {
             if (this.error === '') {
                 this.$router.push('/quizMode');
             }
          }).catch(error => {             
             console.log("Error caught:", error);
             this.error = error;
          });
        },
    },
};
</script>


<style scoped>

.login_popup{
    position: absolute;
    z-index: 2;
}

/* Three dots loading */
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    margin-bottom: 10px;
}

.loader span {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #fff;
    border-color: azure;
    border-radius: 50%;
    opacity: 0.2;
    animation: loaderAnimation 0.75s infinite;
}

.loader span:nth-child(1) {
    animation-delay: 0s;
}

.loader span:nth-child(2) {
    animation-delay: 0.25s;
}

.loader span:nth-child(3) {
    animation-delay: 0.5s;
}

@keyframes loaderAnimation {
    0% {
        opacity: 0.2;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.2;
    }
}


.center-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-container{
    width: 500px;
    padding-bottom: 20px;
    background: rgb(30,30,63);
    /* background: linear-gradient(119deg, rgba(30,30,63,1) 0%, rgba(26,28,31,1) 34%, rgba(27,28,36,1) 61%, rgba(30,30,63,1) 100%); */
    background: linear-gradient(180deg, #010002 0%, #010002 34%, #361764 100%);
    box-shadow: -4px 4px 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    font-weight: 500;
    font-size: 15px;
    padding: 40px 10px;
    margin: 10px 0;
    color: #fff;
    /* background-image: url('../../assets/images/pattern_login.svg'); */
}

.match-title{
    font-size: 36px;
    font-weight: 500;
}

.login-title{
    font-size: 22px;
    margin-bottom: 30px;
    font-weight: 400;
}

.login-form-container{
    width: 80%;
}
.login-form{
    position: relative;
}

.form-group{
    width: 100%;
    font-size: 18px;
    margin-left: 10px;
    font-weight: 500;
}

#login-form input[type=email],
#login-form input[type=password]{
    border: none;
    background-color: transparent;
    /* border: 1px #fff solid; */
    outline: 1px solid rgba(255, 255, 255, 0.25);
    outline-offset: -1px;
    border-radius: 15px;
    width: 100%;
    height: 50px;
    margin: 15px 0;
    padding: 5px 10px;
    color: #fff;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 25%);
}
.submit-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 30px 0;
}
.input_error{
    color: rgb(255, 70, 70);
    font-size: 12px;
}

.forgot-password,
.login-create-account{
    font-size: 12px;
    font-weight: 500;
}

.button{
    cursor: poRaleway;
    margin-bottom: 15px;
    padding: 10px 30px;
    border: none;
    border-radius: 10px;

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
    padding: 4px 30px;
    margin: 0;
    transition: all 0.3s ease-in-out;
    box-shadow: inset 0px 0px 6px 1px rgba(255, 255, 255, 25%);
}

.login-btn:hover, .register-btn:hover{
    background-color: transparent;
    color: #FFFFFF;
    border: 2px #FFFFFF solid;
}

.login-register{
    margin-top: 10px;
    line-height: 30px;
}

.login-separator {
    font-size: 16px;
    width: 300px;
    position: relative;
    text-align: center;
    font-weight: bold;
}

.login-separator::before,
.login-separator::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 50%;
    height: 1px;
    background-color: rgb(181, 181, 181);
}

.login-separator::before {
    left: 0;
}

.separator::after {
    right: 0;
}


.logged-in-container{
    height: 40vh;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.logged-in-container h3{
    font-size: 28px;
    margin-bottom: 20px;
}

.logout-btn{
    border: 2px #40BA21 solid;
    border-radius: 10px;
    background-color: #40BA21;
    color: #fff;
    padding: 5px 20px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
}

.logout-btn:hover{
    color: #000;
    border-color: #000;
    background-color: transparent;
}

/* Responsivness */
@media screen and (max-width: 768px) {
    .login-container{
        width: 400px;
        font-size: 14px;
    }
    .login-title{
        font-size: 26px;
    }
    .circle{
        width: 300px;
        height: 300px;
    }
}

@media screen and (max-width: 480px) {
    .login-container{
        width: 300px;
        font-size: 14px;
    }
    .demo-panel-title{
        font-size: 24px;
    }
    .login-title{
        font-size: 18px;
    }
    .login-form-container{
        width: 250px;
    }
    .login-form,
    .login-others,
    .login-separator{
        width:250px;
    }
    .button{
        font-size: 12px;
    }
    .login-with-google, 
    .login-with-github{
        font-size: 12px;
    }
    .circle{
        width: 300px;
        height: 300px;
    }
}
</style>
