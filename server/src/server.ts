import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
const app = express();

// controla quais domínios acessem seu site
app.use(cors());

app.use(express.json());
app.use(routes);

//conseguir ver as imagens estáticas que estão dentro de uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333);
// Rota: endereço completo da requisição
// Recurso: qual entidade estamos acessando no sistema

// GET: buscar uma ou mais informações no backend
// POST: criar uma nova informação
// PUT: atualizar uma infomração existente 
// DELETE: deletar uma informação do backend


// Request Param: parâmetros que vem na própria rota que identificam  o recurso
// Query Param: parâmetros que vem na própria rota (geralmente opcionais) para filtros e paginação
// Request Body: parâmetros para criação e atualização de informações




