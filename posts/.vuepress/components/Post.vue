<template>

<div class="page-container">
<h1 class="page-title">{{$page.title}}</h1>
<p class="page-date">{{getDate($page.frontmatter.date)}}</p>
 <Content/>
<Footer/>
</div>

</template>

<script>
import Footer from "./Footer.vue";
export default {
  data() {
    return {};
  },
  components: {
    Footer
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
.page {
  &-container {
    max-width: 740px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
    // img
    // width 80%
    // height 80%
    // margin-left: 10%
  }

  &-title {
    text-align: center;
    padding-bottom: 0.5rem;
    margin-bottom: 0;
    border-bottom: 1px solid #eeeeee;
  }

  &-date {
    margin-top: 0.5rem;
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
  }
}

@media (max-width: 959px) {
  .page-container {
    padding: 2rem;
  }
}
</style>