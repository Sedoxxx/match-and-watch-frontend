import { createRouter, createWebHistory } from "vue-router";
import Login from './pages/Login.vue';
import Signup from "./pages/Signup.vue";
import QuizPage from './pages/QuizPage.vue'
import HomePage from './pages/HomePage.vue'
import FinishJoin from './pages/finishJoinPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import HistoryPage from './pages/HistoryPage'
import Matched from './pages/Matched.vue'
import QuizMode from './pages/QuizModePage.vue'
import CreatePage from './pages/CreatePage.vue'
import JoinPage from './pages/JoinPage.vue' 
import Waiting from './pages/WaitingPage.vue'
import store from './store/store';
import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';
import OneUserQuiz from "./pages/OneUserQuiz.vue";
import { loadingState } from './store/loading';

const routes =  [
    {
        path:'/login_new',
        name:'Login', 
        component:Login,
        meta:{
            auth:false
        },
    },
    {
        path:'/signup_new',
        name:'SignUp', 
        component:Signup,
        meta:{
            auth:false
        },
    },
    {
        path:'/quiz',
        name:'Quiz',
        component:QuizPage,
        meta:{
            auth:true
        },
    },
     {
        path:'/matched',
        name:'Result',
        component:Matched,
        meta:{
            auth:true
        },
        props: true
    },
    {
       path:'/waiting',
       name:'Waiting',
       component:Waiting,
       meta:{
        auth:true
       },
       props:true
    },
    {
        path:'/history', 
        name:'History',
        component:HistoryPage,
        meta:{
            auth:true
        },
    },
    {
       path:'/quizMode',
       name:'QuizMode',
       component:QuizMode,
       meta:{
        auth:true
       },
    },
    {
        path:'/oneUserQuiz',
        name:'OneUserQuiz',
        component:OneUserQuiz,
        meta:{
           auth:true
        }
    },
    {
        path:'/',
        name:'Home',
        component:HomePage
    },
    {
        path:'/create',
        name:'Create',
        component:CreatePage,
        meta:{
            auth:true
         }
    },
    {
        path:'/join',
        name:'Join',
        component:JoinPage,
        meta:{
            auth:true
         }
    },
    {
        path:'/finishPage',
        name:'FinsihJoin',
        component:FinishJoin,
        meta:{
            auth:true
         }
    }
];

const router=createRouter(
    {
        history:createWebHistory(),
        routes,
    }
);

router.beforeEach((to, from, next) => {
        loadingState.setLoading(true);
        // setTimeout(() => next(), 500); 
    if (
        'auth' in to.meta &&
        to.meta.auth &&
        !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/login_new');
    } else if (
        'auth' in to.meta &&
        !to.meta.auth &&
        store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
    ) {
        next('/');
    } else {
        next();
    }
    // next();
});

router.afterEach(() => {
    setTimeout(() => loadingState.setLoading(false), 1000); 
});

export default router;
