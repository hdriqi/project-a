import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const main = () => {
	const PORT = 8000
	const server = express()
	
	server.use(cors())
	server.use(bodyParser.urlencoded({ extended: true }))
	server.use(bodyParser.json())
	
	server.get('/', (req, res) => {
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