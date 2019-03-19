<template>
    <div>
        <h1>UPDATE MOVIE</h1>
        
        <form action="/">
            <label for="title"></label>
            제목 : <input type="text" v-model="title"><br>
            <label for="year"></label>
            년도 : <input type="text" v-model="year"><br>
            <label for="director"></label>
            주연 : <input type="text" v-model="director"><br>
            <label for="imgsrc"></label>
            이미지경로 : <input type="text" v-model="imgsrc"><br>

            <button @click.prevent="UpadateMovie">modify</button>
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
        showMovie(){
            var id = this.$route.params.id;
            this.$http.get(`/api/movies/${id}`)
            .then((response) => {
                var res = response.data;

                this.title = res.data[0].name;
                this.year = res.data[0].year;
                this.director = res.data[0].director;
                this.imgsrc = res.data[0].poster;
            })
            .catch((error) => consorl.log(error));
        },
        UpadateMovie(){
            var id = this.$route.params.id;

            console.log(this.title);

            this.$http.put(`/api/movies/${id}`, {
                title: this.title,
                year: this.year,
                director: this.director,
                imgsrc: this.imgsrc,
            })
            .then((response) => {
                console.log(response);
                this.$router.push(`/movie/${id}`);
            })
            .catch((error) => consorl.log(error));
        }
    },
    created() {
        this.showMovie();
    },
}
</script>

<style>

</style>
