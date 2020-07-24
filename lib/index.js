import server from './server'
// import Vue from 'vue'
import path from 'path'
import fs from 'fs'
import templateCustom from './templates/custom'

class Main {
	registerComponents(components) {
		const customComponentsCode = templateCustom(components)
		fs.writeFileSync(path.join(__dirname, 'client/plugins/generated_custom.js'), customComponentsCode)
	}

	registerSchemas(schemas) {
		this.schemas = schemas
	}

	run() {
		server({schemas: this.schemas})
	}
}

export default Main