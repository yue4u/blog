<template>

<div>

  <p>这人很懒 一共才写了{{pages.length}}篇文章</p>

  <div class="article" v-for="(page, index) in pagesDisplay" :key="index">

    <router-link class="article-link"  :to="page.path"><h2 class="article-title">{{page.title}}</h2></router-link>

    {{getDate(page.frontmatter.date)}}

    <p v-html="page.excerpt"></p>

    <div>
      Tags: <span class="article-tag" v-for="(tag, index) in page.frontmatter.tags" :key="index">{{tag}}</span>
    </div>

  </div>

  <ul class="bread">
    <li :class="['bread-item',isDisplay(index) ? 'now' :'']"  
        @click="changeDisplay(index)"
          v-for="(page, index) in pagesList">{{index+1}}</li>
  </ul>

  <Footer/>

</div>

</template>

<script>
import Footer from './Footer.vue'

export default {
  data() {
    return {
      nowIndex: 0,
      pages: this.site.pages
        .filter(page => RegExp("^/articles/.+").test(page.path))
        .sort((a, b) => this.getTimeString(b) - this.getTimeString(a))
    };
  },
  components:{
    Footer
  },
  computed: {
    pagesList() {
      const chunk_size = 5;
      let arr = this.pages;

      return arr
        .map(function(e, i) {
          return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
        })
        .filter(function(e) {
          return e;
        });
    },
    pagesDisplay() {
      return this.pagesList[this.nowIndex];
    }
  },
  props: {
    site: Object
  },
  methods: {
    isDisplay(index) {
      return index === this.nowIndex;
    },
    changeDisplay(index) {
      this.nowIndex = index;
      document
        .getElementsByTagName("html")[0]
        .scrollIntoView({
          alignToTop: true,
          block: "start",
          behavior: "smooth"
        });
    },
    getDate(dateString) {
      const dateTime = dateString.split("T");
      const date = dateTime[0];
      const time = dateTime[1].split(".")[0];
      return `${date}  ${time}`;
    },
    getTimeString(page) {
      return Date.parse(page.frontmatter.date);
    }
  }
};
</script>

<style lang="stylus" scoped>
.article 
  transition 0.5s all ease-in-out
  padding 2rem
  margin 2rem 0 2rem
  padding-top 0
  border-radius 1rem
  border 1px solid transparent
  //box-shadow 0 0 1rem #eee

  &:hover
    border 1px solid skyblue

  &-title 
    padding-top 0.5rem
    margin-top 1rem

  &-link
    transition .5s all ease-in-out
    text-decoration none

  &-tag 
    padding 0.2rem
    margin-left 0.3rem
    margin-right @margin-left
    padding-left 0.8rem
    padding-right @padding-left
    border-radius 1rem
    background #cbedff

.bread 
  width 100%
  text-align center
  list-style-type none
  padding 0
  box-sizing border-box

  &-item 
    transition 0.3s all ease-in-out
    width 3rem
    margin-left .2rem
    margin-right @margin-left
    padding-left 0.8rem
    padding-right @padding-left
    padding-top 0.5rem
    padding-bottom @padding-top
    display inline
    border 0.1rem solid rgba(0, 0, 0, 0)
    border-radius 0.8rem

    &:hover 
      cursor pointer
      background-color #6390F7
      color #fff

.now 
  font-weight: bold
  border 0.1rem solid #6390F7

</style>