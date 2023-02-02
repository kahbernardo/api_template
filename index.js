const express = require('express')

const server = express()

server.use(express.json())
//query params = ?param=param
//route params = /param/2
//Request Body = {a:a, b:b}

const cursos = ["Node", "JavaScript","React"]

server.get('/cursos', (req,res)=>{
       
        return res.json(cursos)
        
    })

server.get('/curso/:index', (req,res)=>{
const {index} = req.params;
    return res.json(cursos[index])
})

server.post('/cursos', (req,res)=>{
    const {name} = req.body;
    cursos.push(name);
        return res.json(cursos)
    })

server.put('/cursos/:index', (req,res)=>{
    const {index} = req.params;
    const {name} = req.body;
    
    cursos[index]=name;
    
        return res.json(cursos)
})
    

    

server.listen(3000)