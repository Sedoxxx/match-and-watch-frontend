<script>
export default {
    props:{
        message:{
            type: String,
            required: true,
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
    background: rgb(193,0,0);
    background-image: linear-gradient(
        55deg,
        hsl(0deg 100% 38%) 0%,
        hsl(5deg 100% 38%) 1%,
        hsl(9deg 100% 37%) 5%,
        hsl(11deg 100% 37%) 17%,
        hsl(13deg 100% 37%) 39%,
        hsl(15deg 100% 37%) 64%,
        hsl(8deg 83% 40%) 82%,
        hsl(2deg 73% 42%) 92%,
        hsl(357deg 72% 41%) 98%,
        hsl(352deg 74% 40%) 100%,
        hsl(349deg 75% 39%) 100%
        );
    border-radius: 5px;
    width: 270px;
}
.container > p{
    font-size: 16px;
    line-height: 30px;
    color: #ffffff;
}


</style>