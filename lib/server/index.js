import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Store from './Store'
import multer from './middleware/multer'

import { Nuxt, build, loadNuxtConfig } from 'nuxt'
const config = require('../nuxt.config.js')

const isProd = (process.env.NODE_ENV === 'production')
config.dev = !isProd

const main = async ({ project, schemas }) => {
	const PORT = 8000
	const server = express()

	const store = new Store(project)
	await store.init()

	server.use(cors())
	server.use(bodyParser.urlencoded({ extended: true }))
	server.use(bodyParser.json())

	server.get('/cdn/:id', async (req, res) => {
		try {
			store.getFile(req.params.id, res)
		} catch (err) {
			console.log(err)
			return res.json({
				success: 0,
				errors: {
					message: 'err'
				}
			})
		}
	})

	server.post('/api/upload', multer, async (req, res) => {
		const response = await store.upload(req.files[0])
		res.json({
			status: 1,
			...response
		})
	})

	server.get('/api', (req, res) => {
		res.json({
			success: 1,
			data: 'ok'
		})
	})

	server.get('/api/medias', async (req, res) => {
		try {
			const data = await store.get(project.name, '_media', req.query)
			return res.json({
				success: 1,
				...data
			})
		} catch (err) {
			console.log(err)
			return res.json({
				success: 0,
				errors: {
					message: 'err'
				}
			})
		}
	})

	server.get('/api/schemas', (req, res) => {
		res.json({
			success: 1,
			data: schemas
		})
	})

	server.get('/api/collections/:collection', async (req, res) => {
		try {
			const data = await store.get(project.name, req.params.collection, req.query)
			return res.json({
				success: 1,
				...data
			})
		} catch (err) {
			console.log(err)
			return res.json({
				success: 0,
				errors: {
					message: 'err'
				}
			})
		}
	})

	server.put('/api/collections/:collection/:id', async (req, res) => {
		const schema = schemas.find(schema => schema.name.toLowerCase() === req.params.collection)
		if (!schema) {
			return res.status(400).json({
				success: 0,
				errors: {
					message: 'schema not exist'
				}
			})
		}
		const validationErrors = []
		const input = {}
		schema.fields.forEach(field => {
			const inputField = req.body[field.name]
			if (typeof field.validation === 'function') {
				const [success, msg] = field.validation(inputField)
				if (!success) {
					validationErrors.push({
						field: field.name,
						message: msg
					})
				}
			}
			input[field.name] = inputField
		})
		// update database
		const { value } = await store.client.db(project.name).collection(req.params.collection.toLowerCase()).findOneAndUpdate({
			_id: store.convertId(req.params.id)
		}, {
			$set: input
		}, {
			returnOriginal: false
		})
		res.json({
			success: 1,
			data: value
		})
	})

	server.post('/api/collections/:collection', async (req, res) => {
		const schema = schemas.find(schema => schema.name.toLowerCase() === req.params.collection)
		if (!schema) {
			return res.status(400).json({
				success: 0,
				errors: {
					message: 'schema not exist'
				}
			})
		}
		const validationErrors = []
		const input = {}
		schema.fields.forEach(field => {
			const inputField = req.body[field.name]
			if (typeof field.validation === 'function') {
				const [success, msg] = field.validation(inputField)
				if (!success) {
					validationErrors.push({
						field: field.name,
						message: msg
					})
				}
			}
			input[field.name] = inputField
		})
		// save to database
		await store.client.db(project.name).collection(String(req.params.collection)).insertOne(input)
		// call after save
		if (typeof schema.afterCreate === 'function') {
			schema.afterCreate(input)
		}
		if (validationErrors.length > 0) {
			return res.status(400).json({
				success: 0,
				errors: {
					validation: validationErrors
				}
			})
		}
		res.json({
			success: 1,
			data: input
		})
	})

	server.delete('/api/collections/:collection/:id', async (req, res) => {
		const schema = schemas.find(schema => schema.name.toLowerCase() === req.params.collection)
		if (!schema) {
			return res.status(400).json({
				success: 0,
				errors: {
					message: 'schema not exist'
				}
			})
		}
		// delete database
		const { value } = await store.client.db(project.name).collection(req.params.collection).findOneAndDelete({
			_id: store.convertId(req.params.id)
		})
		res.json({
			success: 1,
			data: value
		})
	})

	const defaultConfig = await loadNuxtConfig()
	const newConfig = { ...config, ...defaultConfig }
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