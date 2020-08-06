import server from './server'
import path from 'path'
import fs from 'fs'
import nodemailer from 'nodemailer'
import templateCustom from './templates/custom'

class Main {
	constructor() {
		this.email = null
	}
	registerComponents(components) {
		const customComponentsCode = templateCustom(components)
		fs.writeFileSync(path.join(__dirname, 'client/plugins/generated_custom.js'), customComponentsCode)
	}

	registerDataTypes(dataTypes) {
		this.dataTypes = dataTypes
	}

	setupEmail(config) {
		this.email = nodemailer.createTransport(config)
	}

	run(project) {
		this.schemas = require(path.join(process.cwd(), 'src/schemas.js'))
		this.hooks = require(path.join(process.cwd(), 'src/hooks.js'))
		fs.copyFileSync(path.join(process.cwd(), 'src/schemas.js'), path.join(__dirname, 'client/generated/generated_schemas.js'))

		server({
			project: project,
			schemas: this.schemas,
			dataTypes: this.dataTypes,
			hooks: this.hooks,
			ctx: {
				email: this.email
			}
		})
	}
}

export default Main