import server from './server'
// import Vue from 'vue'
import path from 'path'
import fs from 'fs'
import templateCustom from './templates/custom'
import templateSchemas from './templates/schemas'

class Main {
	registerComponents(components) {
		const customComponentsCode = templateCustom(components)
		fs.writeFileSync(path.join(__dirname, 'client/plugins/generated_custom.js'), customComponentsCode)
	}

	registerSchemas(schemas) {
		this.schemas = schemas
		const customSchemasCode = templateSchemas(JSON.stringify(schemas))
		fs.writeFileSync(path.join(__dirname, 'client/generated/generated_schemas.js'), customSchemasCode)
	}

	registerDataTypes(dataTypes) {
		this.dataTypes = dataTypes
	}

	run(project) {
		server({
			project: project,
			schemas: this.schemas,
			dataTypes: this.dataTypes
		})
	}
}

export default Main