//cd C:\Users\NOT\workspace\projetos_react\servidor-api
//npm init - criar um servidor api pelo node, cria um arquivo package.json
//dir
//Pasta de C:\Users\NOT\workspace\projetos_react\servidor-api
//29/04/2022  15:45    <DIR>          .
//29/04/2022  15:45    <DIR>          ..
//06/05/2022  16:02             1.572 index.js
//29/04/2022  15:43    <DIR>          node_modules
//29/04/2022  15:43            17.732 package-lock.json
//29/04/2022  15:43               354 package.json
//               3 arquivo(s)         19.658 bytes
//               3 pasta(s)   330.811.449.344 bytes disponíveis

//npm install express body-parser cors uuidv4 --save
//npm install --save express-fileupload

//Importar esses arquivos abaixo, ao invés do import do 'React' usamos o require do node.js
const express = require('express'); //Servidor api
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { 
    listarTarefaId, 
    listarTarefas, 
    cadastrarTarefa, 
    atualizarTarefa, 
    removerTarefa,
    concluirTarefa
} = require('./controllers/gerenciador-tarefas.js');

const { finalizarCompra, obterCidadesPorEstado } = require('./controllers/mini-ecommerce.js');
const upload = require('./controllers/upload.js'); 

//Criar um servidor(express) para acessar a API
const app = express();
const port = 3001;

//express sempre que ele receber uma requisição ele automaticamente vai aplicar essas regras do cors
//para liberar qq acesso de requisição e seguir nosso código
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload( {createParentPath: true }));

//modelar uma api restfull
//get(consultar), post(incluir), put(atualizar), delete(excluir)

//listar todas as tarefas - get
app.get('/gerenciador-tarefas', listarTarefas);
//listar uma tarefa por id - get
app.get('/gerenciador-tarefas/:id', listarTarefaId);
//cadastrar uma tarefa - post
app.post('/gerenciador-tarefas', cadastrarTarefa);
//atualizar uma tarefa - put
app.put('/gerenciador-tarefas/:id', atualizarTarefa);
//remover uma tarefa - delete
app.delete('/gerenciador-tarefas/:id', removerTarefa);
//concluir uma tarefa - put
app.put('/gerenciador-tarefas/:id/concluir', concluirTarefa);

// mini-ecommerce
app.post('/mini-ecommerce/checkout/finalizar-compra', finalizarCompra);
app.get('/mini-ecommerce/estado/:siglaEstado/cidades', obterCidadesPorEstado);

app.post('/upload', upload);

// Criar o servidor pelo express
app.listen(port, () => console.log(`Servidor inicializado na porta ${port}`));
// Para verificar se o servidor esta ok, basta digitar na pasta do projeto o seguinte comando :
// node index.js
// Deverá aparecer a mensagem que está acima na porta 3001
// Para desativar o servidor basta clicar control+C
