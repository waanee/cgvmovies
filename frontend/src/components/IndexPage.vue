<template>
    <div class="movies">
        <h1>Movie List</h1>
        <router-link to="/test">test</router-link> / 
        <router-link to="/addmovie">add movie</router-link><br>
        <div v-for="movie in movies" class="movie" v-bind:key="movie.id">
            <router-link :to="{name:'show', params:{id: movie.id}}"><img v-bind:src="movie.poster" alt=""></router-link>
            <div>
                <strong>{{ movie.name }}</strong>, <i>{{ movie.director }}</i> [{{ movie.year }}]
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data(){
        return{
            movies : []
        }
    },
    created() {
        this.$http.get('/api/movies')
        .then((response) => {
            var res = response.data;
            this.movies = res.data;
        })
        .catch((error) => consoellog(error))
    },
}
</script>

<style scoped>
    .movie {
        margin: 30px 0px;
        float: left;
        width: 140px;
        height:200px;
    }
    .movie img {
        width:120px;
    }
</style>
