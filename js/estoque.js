const estoque = document.getElementById("estoque");

function gerarEstrutura(carros){
    let estrutura = "";
    carros.map(carro => {
        estrutura += `
        <div class="card" style="width: 20rem;">
            <img src="img/${carro.nome_imagem}" class="card-img-top" alt="${carro.nome_imagem}" style="width: 100%; height: 200px;">
            <div class="card-body">
                <div class="text-start">
                    <h5 class="card-title">HYUNDAI HB20 - 2020</h5>
                    <span class="card-text descricao">1.0 UNIQUE 12V FLEX 4P MANUAL</span>
                    <span class="card-text descricao">2020/2021 | 15.000 km</span>
                </div>
                <div class="text-end">
                    <a href="#" class="btn btn-white border-dark ver-mais">VER MAIS</a>
                </div>
                <div class="text-start">
                    <span class="preco">R$ 77.000</span>
                </div>
            </div>
        </div>
        `;
    });
    return estrutura;
}

function carregarVeiculos() {
    estoque.innerHTML = gerarEstrutura(carros);
}

function carregarValores(){
    const marcas = document.querySelector("#marcas-container");
    const modelos = document.querySelector("#modelos-container");
    let marcas_carro = new Set(carros.map(carro => carro.marca));
    let modelos_carro = new Set(carros.map(carro => carro.modelo));
    
    marcas_carro.forEach(marca => {
        marcas.innerHTML += `<label class="d-block"><input class="marcas" type="checkbox" value="${marca}"> ${marca}</label>`;
    });
    modelos_carro.forEach(modelo => {
        modelos.innerHTML += `<label class="d-block"><input class="modelos" type="checkbox" value="${modelo}"> ${modelo}</label>`;
    });
}

document.querySelector("#pesquisa").addEventListener("click", function(){
    const pesquisa = document.getElementById("input-pesquisa").value;

    const lista_carros = carros.filter(function(carro){
        return carro.modelo == pesquisa || carro.marca == pesquisa;
    }) 
    
    if (lista_carros.length > 0){
        estoque.innerHTML = gerarEstrutura(lista_carros);
    } else {
        alert("Não encontramos nenhum veículo com esta marca ou modelo!");
    }
});

document.querySelector("#limpar-busca").addEventListener("click", function(){
    estoque.innerHTML = gerarEstrutura(carros);
});

document.querySelector("#aplicar-filtros").addEventListener("click", function(){
    var lista_marcas = [];
    var lista_modelos = [];
    let anoMin = document.getElementById("ano-minimo").value;
    let anoMax = document.getElementById("ano-maximo").value;
    let precoMin = document.getElementById("preco-minimo").value;
    let precoMax = document.getElementById("preco-maximo").value;


    for (let marca of document.querySelectorAll(".marcas")){
        marca.checked ? lista_marcas.push(marca.value) : null;
    }
    for (let modelo of document.querySelectorAll(".modelos")){
        modelo.checked ? lista_modelos.push(modelo.value) : null;
    }
    
    let filtro = carros.filter(function(carro){
        if (lista_marcas.length > 0){
            return lista_marcas.includes(carro.marca.trim());
        } else {
            return true;
        }
    }).filter(function(carro){
        if (lista_modelos.length > 0){
            return lista_modelos.includes(carro.modelo.trim());
        } else {
            return true;
        }
    }).filter(function(carro){
        if (anoMin || anoMax){
            if (anoMin && !anoMax){
                return carro.ano >= anoMin;
            } else if (!anoMin && anoMax){
                return carro.ano <= anoMax;
            } else {
                return carro.ano >= anoMin && carro.ano <= anoMax;
            }
        } else {
            return true;
        }
    }).filter(function(carro){
        if (precoMin || precoMax){
            if (precoMin && !precoMax){
                return carro.preco >= precoMin;
            } else if (!precoMin && precoMax){
                return carro.preco <= precoMax;
            } else {
                return carro.preco >= precoMin && carro.preco <= precoMax;
            }
        } else {
            return true;
        }
    });

    if (filtro.length > 0){
        estoque.innerHTML = gerarEstrutura(filtro);
    } else {
        alert("Nenhum carro encontrado")
    }
});

function modal(modelo){
    document.querySelector("#titulo-modal").innerHTML += " ao " + modelo;
    document.querySelector("#botao-enviar").setAttribute("rel", modelo);
}

document.querySelector("#botao-enviar").addEventListener("click", function(){
    let dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value
    }

    interesses.push(dados);
    alert("Interesse registrado com sucesso!")
});

document.querySelector("#limpar-filtros").addEventListener("click", function(){
    document.querySelectorAll(".marcas").forEach(input => input.checked = false);
    document.querySelectorAll(".modelos").forEach(input => input.checked = false);
    document.getElementById("ano-minimo").value = "";
    document.getElementById("ano-maximo").value = "";
    document.getElementById("preco-minimo").value = "";
    document.getElementById("preco-maximo").value = "";
    console.log(carros);
    estoque.innerHTML = gerarEstrutura(carros);
});

carregarVeiculos();
carregarValores();