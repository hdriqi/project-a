import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Store from './Store'

import { Nuxt, build, loadNuxtConfig } from 'nuxt'
const config = require('../nuxt.config.js')

const isProd = (process.env.NODE_ENV === 'production')
config.dev = !isProd

const main = async ({ schemas }) => {
	const PORT = 8000
	const server = express()

	const store = new Store('mongodb://localhost:27017')
	await store.init()

	server.use(cors())
	server.use(bodyParser.urlencoded({ extended: true }))
	server.use(bodyParser.json())

	server.get('/api', (req, res) => {
		res.json({
			success: 1,
			data: 'ok'
		})
	})

	server.get('/api/schemas', (req, res) => {
		res.json({
			success: 1,
			data: schemas
		})
	})

	server.post('/api/collections/:id', (req, res) => {
		const schema = schemas.find(schema => schema.name.toLowerCase() === req.params.id)
		const errors = []
		const input = {}
		schema.fields.forEach(field => {
			const inputField = req.body[field.name]
			if (typeof field.validation === 'function') {
				const [success, msg] = field.validation(inputField)
				if (!success) {
					errors.push({
						field: field.name,
						message: msg
					})
				}
			}
			input[field.name] = inputField
		})
		// save to database
		console.log(input)
		// call after save
		if (typeof schema.afterSave === 'function') {
			schema.afterSave(input)
		}
		if (errors.length > 0) {
			return res.status(400).json({
				success: 0,
				errors: errors
			})
		}
		res.json({
			success: 1,
			data: input
		})
	})

	server.get('/api/schemas/:id', (req, res) => {
		const schema = schemas.find(schema => schema.name.toLowerCase() === req.params.id)
		res.json({
			success: 1,
			data: schema
		})
	})

	const defaultConfig = await loadNuxtConfig()
	const newConfig = { ...config, ...defaultConfig}
	const nuxt = new Nuxt(newConfig)
	server.use(nuxt.render)

	if (config.dev) {
		build(nuxt)
	}

	server.listen(PORT, () => {
		console.log(`Running on PORT ${PORT}`)
	})
}

export default main