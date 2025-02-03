<template>
    <div class="profileContainer">
       {{ token }}   
    </div>
</template>

<script>
   export default{
    computed:{
        token(){
            console.log(this)
            return this.$store.state.auth.authenticated;
        }
    }
   };    
</script>

<style>

</style>