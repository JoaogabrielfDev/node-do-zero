// import { createServer } from 'node:http'

// const server = createServer((request, response) => {

//     response.write('hellow word')
//     return response.end()

// })


// server.listen(3333) 

// POST Localhost:3333/videos
// DELETE localhost:3333/videos/1


//fastify e um microframework que permite incializar o server de forma simples
import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

// GET, POST, PUT (EDITAR), DELETE

// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/3

// Route paramter
//Request Body


server.post('/videos', (request, reply) => {

    const { title, description, duration } = request.body


    database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', (request) => {
    const search = request.query.search
    


    const videos = database.list(search)

    // console.log(videos)

    return videos
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration,
    })


    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})