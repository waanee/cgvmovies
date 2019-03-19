<template>
    <div>
        <h1>ADD MOVIE</h1>
        
        <form action="/">
            <label for="title"></label>
            제목 : <input type="text" v-model="title"><br>
            <label for="year"></label>
            년도 : <input type="text" v-model="year"><br>
            <label for="director"></label>
            주연 : <input type="text" v-model="director"><br>
            <label for="imgsrc"></label>
            이미지경로 : <input type="text" v-model="imgsrc"><br>

            <button @click="addMovie">ADD</button>
        </form>
        
        <br>

        <a href="javascript:history.back();">back</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title : '',
            year : '',
            director : '',
            imgsrc : ''
        }
    },
    methods: {
        addMovie(){
            this.$http.post(`/api/movies/`, {
                title: this.title,
                year: this.year,
                director: this.director,
                imgsrc: this.imgsrc,
            })
            .then((response) => {
                console.log(response);
                //var res = response.data;
                //this.movie = res.data;
            })
            .catch((error) => consorl.log(error));
        }
    },
}
</script>

<style>

</style>
