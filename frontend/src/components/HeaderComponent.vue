<template>
<div class="header">
    <div class="container">
        <vk-navbar>
        <vk-navbar-nav slot="left">
            <vk-navbar-logo>
                <router-link to='/'>CGV movies</router-link>
            </vk-navbar-logo>
        </vk-navbar-nav>

        <vk-navbar-nav slot="center">
            {{welcome}}
        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
            <router-link to="/loginpage">Login</router-link> / 
            <router-link to="/me">me</router-link> / 
            <router-link to="/#" v-if="isAuthenticated" @click.prevent="onClickLogout">logout</router-link> 
        </vk-navbar-nav>
        </vk-navbar>        
    </div>
</div>
    
</template>

<script>
import axios from 'axios';
import store from '../store';

export default {
    data(){
        return{
            welcome : ''
        }
    },
    computed:{
        isAuthenticated(){
            return store.getters.isAuthenticated
        }
    },
    methods: {
        getWelcom(){
            axios.get('http://localhost:3000/home')
            .then(result => this.welcome = result.data.greeting);
        },
        onClickLogout(){
            // 로그아웃 변이 실행후 리다이렉트
            store.dispatch('LOGOUT').then(() => this.$router.push('/'))
        }
    },
    created() {
        this.getWelcom();
    }
}
</script>

<style>

</style>
