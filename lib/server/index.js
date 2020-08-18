import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Store from './Store'
import multer from './middleware/multer'

import { Nuxt, build, loadNuxtConfig } from 'nuxt'
import auth from './middleware/auth'
const config = require('../nuxt.config.js')
const Excel = require("exceljs");
import { generateColumn, restyleHeader} from './lib/excel'

const isProd = (process.env.NODE_ENV === 'production')
config.dev = !isProd

const main = async ({ project, schemas, hooks, ctx }) => {
	const PORT = 8000
	const server = express()

	const store = new Store(project)
	await store.init()

	server.use(cors())
	server.use(bodyParser.urlencoded({ extended: true }))
	server.use(bodyParser.json())

	server.use((req, res, next) => {
		req.ctx = ctx
		next()
	})

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
		const totalUsage = await store.getMediaUsage()
		if (totalUsage + req.files[0].size > process.env.MAX_STORAGE) {
			return res.status(400).json({
				success: 0,
				message: `Not enough storage`
			})
		}
		const response = await store.upload(req.files[0])
		res.json({
			success: 1,
			...response
		})
	})

	server.get('/api', (req, res) => {
		res.json({
			success: 1,
			data: 'ok'
		})
	})

	server.get('/api/stats/medias', async (req, res) => {
		const totalUsage = await store.getMediaUsage()
		return res.json({
			success: 1,
			data: totalUsage
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

	server.delete('/api/medias/:key', async (req, res) => {
		try {
			const data = await store.deleteFile(req.params.key)
			return res.json({
				success: 1,
				data: data
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

	server.post('/api/login', (req, res) => {
		if (req.body.password !== process.env.ROOT_KEY) {
			return res.status(401).json({
				success: 0,
				message: 'unathorized'
			})
		}
		res.json({
			success: 1,
			data: process.env.ROOT_KEY
		})
	})

	server.get('/api/collections/:collection', auth, async (req, res) => {
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

	server.get("/api/collections/download/:collection", auth, async (req, res) => {
		try {
			const collectionResult = await store.get(
				project.name,
				req.params.collection,
				req.query
			);

			const { data } = collectionResult;

			res.statusCode = 200;
			res.setHeader("Content-Type", "application/xlsx");
			res.setHeader(
				"Content-Disposition",
				`attachment; filename=${req.params.collection}collection.xlsx`
			);

			const workbook = new Excel.stream.xlsx.WorkbookWriter({
				stream: res,
				useStyles: true,
			});

			const worksheet = workbook.addWorksheet(`List${req.params.collection}`);
			worksheet.columns = generateColumn(data);
			restyleHeader(worksheet);
			
			data.forEach(row => {
				const row_data = [];
				const rowKeys = Object.keys(row);
				rowKeys.forEach((key) => {
					if (Array.isArray(row[key])) {
						let stringData = "";
						row[key].forEach((element, index) => {
							if (index !== row[key].length - 1) {
								stringData += `${element},`
							}
							else {
								stringData += `${element}`
							}
						})
						row_data.push(stringData);
					}
					else {
						row_data.push(row[key])
					}
				})
				worksheet.addRow(row_data).commit()
			})

			await worksheet.commit();
			await workbook.commit();

			return res.end();
		} catch (err) {
			console.log(err);
			return res.json({
				success: 0,
				errors: {
				message: "err",
				},
			});
		}
	});
	
	server.put('/api/collections/:collection/:id', auth, async (req, res) => {
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
			if (inputField) {
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
			}
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

	server.post('/api/collections/:collection', auth, async (req, res) => {
		const schema = schemas.find(schema => schema.name.toLowerCase() === req.params.collection)
		const hook = hooks.find(hook => hook.name.toLowerCase() === req.params.collection)
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
		if (validationErrors.length > 0) {
			return res.status(400).json({
				success: 0,
				errors: {
					validation: validationErrors
				}
			})
		}

		input.createdAt = new Date().toISOString()
		input.updatedAt = new Date().toISOString()
		// save to database
		const newData = await store.client.db(project.name).collection(String(req.params.collection)).insertOne(input)
		// call after save
		if (hook && typeof hook.afterCreate === 'function') {
			await hook.afterCreate(ctx, input)
		}
		res.json({
			success: 1,
			data: newData.ops[0]
		})
	})

	server.delete('/api/collections/:collection/:id', auth, async (req, res) => {
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