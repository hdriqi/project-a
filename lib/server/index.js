import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Store from './Store'

const main = async () => {
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

	server.post('/api/collections/:id', (req, res) => {
		res.json({
			success: 1,
			data: 'ok'
		})
	})

	server.listen(PORT, () => {
		console.log(`Running on PORT ${PORT}`)
	})
}

export default main