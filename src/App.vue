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
      &.router-link-exact-active
        color #42b983
  a
    color rgb(51, 90, 161)
    border rgb(51, 90, 161)
    &:hover
      color rgb(51, 90, 161)
      border rgb(51, 90, 161)
  
  .custom-file-input:lang(en)
  .custom-file-label::after
    content "Upload"
    background-color rgb(51, 90, 161)
    border-color rgb(51, 90, 161)
    color:white
</style>
