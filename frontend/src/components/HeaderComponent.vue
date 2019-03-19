<template>
<div class="header">
    <div class="container">
    <vk-sticky>
        <vk-navbar>
        <vk-navbar-nav>
            <vk-navbar-logo>CGV movies</vk-navbar-logo>
            <vk-navbar-nav>
            <vk-navbar-nav-item icon="star" title="Features"></vk-navbar-nav-item>
            </vk-navbar-nav>
            
        </vk-navbar-nav>

        <vk-navbar-nav slot="right">
            <router-link to="/login">Login</router-link>
        </vk-navbar-nav>
        </vk-navbar>        
    </vk-sticky>
    </div>
</div>
    
</template>

<script>
export default {

}
</script>

<style>

</style>
