const express = require('express')

const server = express()

server.use(express.json())
//query params = ?param=param
//route params = /param/2
//Request Body = {a:a, b:b}

const cursos = ["Node", "JavaScript","React"]

const checkCursos = (req, res, next) => {
  if (!req?.body?.name) {
    return res.status(400).json({ error: "Nome obrigatório" });
  }
  return next();
};

const checkIndexCurso = (req, res, next) => {
    
    const curso= cursos[req.params.index]
    if (!curso) {
      return res.status(400).json({ error: "O curso não existe" });
    }
    return next();
  };

server.use((req,res,next)=>{
    
    console.log(`Url:${req.url}`);
    return next();
})

server.get('/cursos', (req,res)=>{
       
        return res.json(cursos)
        
    })

server.get('/curso/:index',checkIndexCurso, (req,res)=>{
const {index} = req.params;
    return res.json(cursos[index])
})

server.post('/cursos',checkCursos, (req,res)=>{
    const {name} = req.body;
    
    cursos.push(name);
        return res.json(cursos)
    })

server.put('/cursos/:index',checkCursos,checkIndexCurso, (req,res)=>{
    const {index} = req.params;
    const {name} = req.body;
    
    cursos[index]=name;
    
        return res.json(cursos)
})

server.delete('/cursos/:index',checkIndexCurso, (req,res)=>{
    const {index} = req.params;
        
    cursos.splice(index,1)
    
        return res.json({message:"Curso deletado com sucesso"})
})
    

    

server.listen(3000)