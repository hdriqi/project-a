import server from './server'
import path from 'path'
import fs from 'fs'
import templateCustom from './templates/custom'

class Main {
	registerComponents(components) {
		const customComponentsCode = templateCustom(components)
		fs.writeFileSync(path.join(__dirname, 'client/plugins/generated_custom.js'), customComponentsCode)
	}

	registerDataTypes(dataTypes) {
		this.dataTypes = dataTypes
	}

	run(project) {
		this.schemas = require(path.join(process.cwd(), 'src/schemas.js'))
		fs.copyFileSync(path.join(process.cwd(), 'src/schemas.js'), path.join(__dirname, 'client/generated/generated_schemas.js'))

		server({
			project: project,
			schemas: this.schemas,
			dataTypes: this.dataTypes
		})
	}
}

export default Main