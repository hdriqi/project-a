<template>
  <h1>Hello {{ name }}!</h1>
</template>

<script>
export default {
  asyncData (context) {
    return { name: 'World' }
  }
}
</script>