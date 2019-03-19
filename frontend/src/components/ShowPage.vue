<template>
    <div>
        <div v-for="movie in movie" class="movie" v-bind:key="movie.id">
            <h1>{{movie.name}}</h1>
            <img v-bind:src="movie.poster" alt="">
            <p>년도 : {{movie.year}}</p>
            <p>주연 : {{movie.director}}</p>
        </div>
        <button @click="deleteItem">del</button> / 
        <button @click="modifyItem">modify</button>
        <br>
        <a href="javascript:history.back();">back</a>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data(){
        return{
            movie:[]
        }
    },
    methods: {
        // 영화정보 보기
        showMovie(){
            var id = this.$route.params.id;
            this.$http.get(`/api/movies/${id}`)
            .then((response) => {
                var res = response.data;
                this.movie = res.data;
            })
            .catch((error) => consorl.log(error));
        },
        // 영화정보 삭제
        deleteItem(){
            var id = this.$route.params.id;
            this.$http.delete(`/api/movies/${id}`)
            .then((response) => {
                var res = response.data;
                this.movie = res.data;
            })
            .catch((error) => consorl.log(error));
            this.$router.push('/');
        },
        // 영화정보 수정
        modifyItem(){
            this.$router.push('/');
        }
        
    },
    created() {
        this.showMovie();
    },
    
}
</script>

<style scoped>
    .movie img {
        width:255px;
    }
</style>
