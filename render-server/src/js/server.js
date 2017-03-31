import http from 'http'
import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import cors from 'cors'
import {renderJson, renderHtml} from 'setup/renderServer'
import router from 'setup/router'
import renderServiceRouter from 'setup/renderServiceRouter'
import {NODE_ENV, PORT} from 'config/server'

import morgan from 'morgan'

const app = express()

// Express configuration and middlewares
if (NODE_ENV !== 'production') {
  app.use(cors())
}
app.use(express.static('dist/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('combined'))

app.use(renderHtml)
app.use('*', renderServiceRouter)

// Turn it into an HTTP server
const server = http.createServer(app)

server.on('error', (e) => {
  if (e.code == 'EADDRINUSE') {
    fs.unlinkSync(PORT);
    server.listen(PORT);
  }
})

server.listen(PORT)
// eslint-disable-next-line no-console
console.log(`Server is listening on ${PORT}`)
