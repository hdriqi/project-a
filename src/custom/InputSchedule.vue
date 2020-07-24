<template>
  <input type="text" />
</template>

<script>
import axios from 'axios'

export default {
  async mounted () {
    const response = await axios.get('http://localhost:8000/api/schemas')
    console.log(response.data)
  }
}
</script>