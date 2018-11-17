<template>

<div class="page-container">

<nav-bar />

<div class="page-title-container">
  <h1 class="page-title">{{$page.title}}</h1>
<div class="page-date">
  <time>{{getDate($page.frontmatter.date)}}</time>
 </div>
</div>
 
<main>

 <Content/>
<div
  class="last-updated"
  v-if="lastUpdated"
>
  <span class="prefix">{{ lastUpdatedText }}: </span>
  <time class="time">{{ lastUpdated }}</time>
  </div>
</main>


<Footer/>
</div>

</template>

<script>
import Footer from "./Footer.vue";
import NavBar from "@vuepress/theme-default/components/Navbar"
export default {
  data() {
    return {};
  },
  components: {
    Footer,
    NavBar
  },
  computed: {
    lastUpdated() {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang);
      }
    },
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    }
  },
  methods: {
    getDate(dateString) {
      const dateTime = dateString.split("T");
      const date = dateTime[0];
      const time = dateTime[1].split(".")[0];
      return `${date}  ${time}`;
    }
  }
};
</script>

<style lang="stylus" scoped>

.page
  &-container
    max-width: 740px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
    // img
    // width 80%
    // height 80%
    // margin-left: 10%
  

  &-title

    text-align: center;
    padding-bottom: 0.5rem;
    margin-bottom: 0;
    &-container
      text-align center
      margin-top 5rem
    &:after
      content ''
      width 100%
      border-bottom: 1px solid skyblue;
  

  &-date
    display inline-block
    width 60%
    padding-top .5rem
    margin-top: 0.5rem;
    text-align: center;
    border-top 1px solid skyblue
    //margin-bottom: 3rem;

@media (max-width: 959px) 
  .page-container 
    padding: 2rem;
  


.last-updated 
  text-align: right;

.prefix 
  color: #2749b3;

</style>