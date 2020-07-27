<template>
  <div>
    <h1>Hello!</h1>
    <div v-for="schema in schemas" :key="schema.name">
      <p>{{schema.name}}</p>
      <div v-for="field in schema.fields" :key="field.name">
        <p>{{field.name}}</p>
        <components v-model="form[field.name]" :is="field.type" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import schemas from '../generated/generated_schemas.js'

export default {
  async asyncData (context) {
    const response = await axios.get('http://localhost:8000/api/schemas')
    return { 
      schemas: response.data.data.schemas
    }
  },

  data() {
    console.log(schemas)
    return {
      form: {}
    }
  }
}
</script>