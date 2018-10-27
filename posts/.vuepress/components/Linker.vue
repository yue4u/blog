<template>
<router-link to="./articles/">
    <button id="go-to-articles">

{{text}}
</button>
</router-link>
</template>
<script>
export default {
  props: {
    text: String
  }
};
</script>

<style lang="stylus" scoped>
$color = #6390F7
#go-to-articles 
    transition .3s all ease-in-out

    background-color white
    color $color
    border 1px solid $color
    font-size: 1.6rem
    border-radius: 0.6rem
    margin-top: 3rem
    padding: 0 1rem 0

    &:hover
        background-color: $color
        color: #fff

    &:focus 
        outline: none;
    

</style>
