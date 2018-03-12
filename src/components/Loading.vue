<template lang="pug">
  .loading-block.d-flex.justify-content-center.align-items-center
    p
      i.fa.fa-spinner.fa-spin(aria-hidden='true')
      | &nbsp; Loading...
</template>

<style lang="stylus">
  .loading-block
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    background rgba(51,51,51,0.7)
    z-index 10
    p
      font-size 30px
</style>
