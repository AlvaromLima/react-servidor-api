const {v4 : uuidv4} = require('uuid')

// Montando uma lista de tarefas 
let tarefas = [
    {id: '1', nome: 'Aprender React', concluida: true},
    {id: '2', nome: 'Estudar padrões de projetos', concluida: false},
    {id: '3', nome: 'Aprender JS', concluida: false},
    {id: '4', nome: 'Estudar React usando hooks', concluida: false},
    {id: '5', nome: 'Aprender Java', concluida: false},
    {id: '6', nome: 'Estudar C# Orientado a objeto', concluida: false},
    {id: '7', nome: 'Estudar C# do Básico ao Avançado', concluida: false},
    {id: '8', nome: 'Estudar Java WEB', concluida: false},
];

function listarTarefaId(req, res) {
    //obter a id fornecido pelo postman
    const id = req.params.id;
    //procurar na lista de tarefas acima o id fornecido pelo postman
    const tarefa = tarefas.filter(tarefa => tarefa.id === id);
    if (tarefa.length === 0){
        res.status(404).json( { erro: 'Tarefa não encontrada.' });
    }
    //Encontrou a tarefa e fica na posição 0
    res.json(tarefa[0]);
}

function listarTarefas(req, res) {
    //Obter parametros para listar no postman
    const pagina = req.query['pag'] || 1;
    const ordem = req.query['ordem']; // ASC, DESC
    const filtroTarefa = req.query['filtro-tarefa'];
    const itensPorPagina = req.query['itens-por-pagina'] || 3;

    //copiar a lista de tarefas para poder fazer um sort ou um filtro
    let tarefasRetornar = tarefas.slice(0);
    //Aplicar o filtro
    if (filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0);
    }
    //Ordenar os dados
    if (ordem === 'ASC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1 );
    } else if ( ordem === 'DESC' ) {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1 );
    }
    //Retornar os dados
    res.json({
        totalItens: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina -1 ) * itensPorPagina, itensPorPagina),
        pagina: pagina
    })

}

function cadastrarTarefa(req, res) {
    if ( !req.body['nome'] && !req.body['concluida']) {
        res.status(400).json( { erro: 'Requisição inválida.'});
    }
    const tarefa = {
        id: uuidv4(),
        nome: req.body['nome'],
        concluida: req.body['concluida']
    }
    tarefas.push(tarefa);
    res.json(tarefa);
}

function atualizarTarefa(req, res) {
    if ( !req.body['nome'] && !req.body['concluida']) {
        res.status(400).json( { erro: 'Requisição inválida.'});
    }
    //obter a id fornecido pelo postman
    const id = req.params.id;
    let tarefaAtualizada = false;
    //procurar na lista de tarefas acima o id fornecido pelo postman
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.nome = req.body['nome']
            tarefa.concluida = req.body['concluida']
            tarefaAtualizada = true;
        } 
        return tarefa;       
    });
    if (!tarefaAtualizada) {
        res.status(404).json({ erro: 'Tarefa não encontrada.'})
    }
    res.json({
        id: id,
        nome: req.body['nome'],
        concluida: req.body['concluida']
    });
}

function removerTarefa(req, res) {
    //obter a id fornecido pelo postman
    const id = req.params.id;
    const numTarefas = tarefas.length;
    //procurar na lista de tarefas acima o id fornecido pelo postman
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    if (numTarefas === tarefas.length){
        res.status(404).json( { erro: 'Tarefa não encontrada.' });
    }
    res.json({ msg: 'Tarefa removida com sucesso!'});
}

function concluirTarefa(req, res) {
    //obter a id fornecido pelo postman
    const id = req.params.id;
    let tarefaConcluida = false;
    //procurar na lista de tarefas acima o id fornecido pelo postman
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            tarefa.concluida = true;
            tarefaConcluida = true;
        } 
        return tarefa;       
    });
    if (!tarefaConcluida) {
        res.status(404).json({ erro: 'Tarefa não encontrada.'})
    }
    res.json({ msg: 'Tarefa concluída com sucesso!'});
}

module.exports = {
    listarTarefaId,
    listarTarefas,
    cadastrarTarefa,
    atualizarTarefa,
    removerTarefa,
    concluirTarefa
}
