<script>
export default {
    props:{
        message:{
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <div class="container Raleway">
        <p>{{ message }}</p>
    </div>
</template>

<style scoped>
.container{
    padding: 20px;
    text-align: center;
    background: #33a56b;
    border-radius: 5px;
    width: 270px;
}
.container > p{
    font-size: 16px;
    line-height: 30px;
    color: #ffffff;
}


</style>