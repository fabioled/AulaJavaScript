document.getElementById('btnAddJogo').addEventListener('click', function(){
    //declarções de constantes com os Ids de elementos
    const cadastraJogo = document.getElementById('cadastraJogo');
    const listaJogos = document.getElementById('listaJogos');
    const jogo = cadastraJogo.value; 

    if (jogo.trim() !== "") {
        const li = document.createElement('li');
        const textNode = document.createTextNode(jogo);
        //li.textContent = jogo;
        li.appendChild(textNode);

        //Adicionando botão de editar
        const btnEditarJogo = document.createElement('button');
        btnEditarJogo.textContent = 'Alterar';
        btnEditarJogo.className = 'edit-btn';
        btnEditarJogo.onclick = function() { alteraJogo(li, textNode); };

        //Adicionado botão deletar
        const btnDelJogo = document.createElement('button');
        btnDelJogo.textContent = 'Deletar';
        btnDelJogo.className = 'delete-btn';
        btnDelJogo.onclick = function() { deletaJogos(this.parentNode); };

        li.appendChild(btnEditarJogo);
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
            const textNode = document.createElement(jogo);
            li.appendChild(textNode);

            //adicionando botão editar
            const btnEditarJogo = document.createElement('button');
            btnEditarJogo.textContent = 'Alterar';
            btnEditarJogo.className = 'edit-btn';
            btnEditarJogo.onclick = function() { alteraJogo(li, textNode); };

            //adicionando botão deletar
            const btnDelJogo = document.createElement('button');
            btnDelJogo.textContent = 'Deletar';
            btnDelJogo.className = 'delete-btn';
            btnDelJogo.onclick = function() { deletaJogos(this.parentNode); };

            li.appendChild(btnEditarJogo);
            li.appendChild(btnDelJogo);
            listaJogos.appendChild(li);
        });
    }

    function alteraJogo(li, textNode){
        const input = document.createElement('input');
        input.type='text';
        input.value = textNode.textContent;
        li.insertBefore(input, textNode);
        li.removeChild(textNode);

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                textNode.textContent = input.value;
                li.insertBefore(textNode, input);
                li.removeChild(input);                
                salvaJogos(); //salvar no local storage as alterações
            }
        })

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

    window.onload = carregarJogos;

});