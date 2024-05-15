document.getElementById('btnAddJogo').addEventListener('click', function(){
    //declarções de constantes com os Ids de elementos
    const cadastraJogo = document.getElementById('cadastraJogo');
    const listaJogos = document.getElementById('listaJogos');
    const jogo = cadastraJogo.value; 

    if (jogo.trim() !== " ") {
        const li = document.createElement('li');
        li.textContent = jogo;

        //Adicionado botão deletar
        const btnDelJogo = document.createElement('button');
        btnDelJogo.textContent = 'Deletar';
        btnDelJogo.className = 'delete-btn';
        btnDelJogo.onclick = function() { deletaJogos(this.parentNode); };

        li.appendChild(btnDelJogo);

        listaJogos.appendChild(li);
        //salvar no localstorage
        salvaJogos();
        //limpar campo de entrada
        cadastraJogo.value = "";
    }

    function carregarJogos(){
        const jogos = JSON.parse(localStorage.getItem('jogos') || []);
        const listaJogos = document.getElementById('listaJogos');

        jogos.forEach(jogos => {
            const li = document.createElement('li');
            li.textContent = jogos;

            //adicionando botão deletar
            const btnDelJogo = document.createElement('button');
            btnDelJogo.textContent = 'Deletar';
            btnDelJogo.className = 'delete-btn';
            btnDelJogo.onclick = function() { deletaJogos(this.parentNode); };

            li.appendChild(btnDelJogo);
            listaJogos.appendChild(li);
        });
    }

    function salvaJogos(){
        const listaJogos = document.getElementById('listaJogos');
        let jogos = [];

        for (let i = 0; i < listaJogos.children.length; i++){
            jogos.push(listaJogos.children[i].textContent);
        }

        localStorage.setItem('jogos', JSON.stringify(jogos));
    }

    function deletaJogos(jogoItem) {
        //remover o item da lista
        jogoItem.remove();

        //atualiza localStorage
        salvaJogos();
    }

});