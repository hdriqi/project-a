import path from 'path'

const custom = (components) => {
  return `import Vue from 'vue'
${components.map(component => {
  return `import ${component.name} from '${path.join(process.cwd(), `src/custom/${component.component}.vue`)}'`
}).join('\n')}

${components.map(component => {
  return `Vue.component('${component.name}', ${component.name})`
}).join('\n')}
  `
}

export default custom