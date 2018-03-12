<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
  @import 'assets/stylus/_main.styl'

  #app
    position: relative
    min-height 100vh
    color #fff
    background-color background

  #nav
    padding 30px
    a
      font-weight bold
      color #2c3e50
      &.router-link-exact-active
        color #42b983
</style>
