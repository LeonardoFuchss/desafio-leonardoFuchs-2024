
class RecintosZoo {

    constructor() { /* Construtor que inicializa a lista de recintos */
        this.recintos = [
            { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "macaco", quantidade: 3}]}, 
            { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: []}, 
            { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "gazela", quantidade: 1}]}, 
            { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: []}, 
            { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "leão", quantidade: 1}]}, 
        ];

        this.animaisInfo = {
            leão: { tamanho: 3, biomas: ['savana'], carnivoro: true},
            leopardo: { tamanho: 2, biomas: ['savana'], carnivoro: true},
            crocodilo: { tamanho: 3, biomas: ['rio'], carnivoro: true},
            macaco: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false},
            gazela: { tamanho: 2, biomas: ['savana'], carnivoro: false},
            hipopotamo: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false}
        };
    }
    analisaRecintos(animal, quantidade) {
        /* validando se o animal existe no zoologico */
        const infoAnimal = this.animaisInfo[animal.toLowerCase()];
        if (!infoAnimal) {
            return { erro: "Animal inválido"}
        }
       /* validando a quantidade */
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida!"}
        }
        /* extraindo informações dos animais */
        const { tamanho, biomas, carnivoro } = infoAnimal;
        /* criando array de recintos que são viáveis */
        const recintosViaveis = [];

        if (animal.toLowerCase() === 'crocodilo') {
            const recinto4 = this.recintos.find(r => r.numero === 4);
            let espacoOcupado = 0;
    
            recinto4.animais.forEach(an => {
                const infoEspecie = this.animaisInfo[an.especie.toLowerCase()];
                espacoOcupado += infoEspecie.tamanho * an.quantidade;
            });
        }

        /* Itera sobre cada recinto para verificar se ele é adequado para o animal */
        this.recintos.forEach((recinto) => {
            let espacoOcupado = 0; /* controle do espaço ocupado no recinto */
            let carnivoroPresente = false; /* flag para verificar se há carnívoros no recinto */
            let mesmoTipoCarnivoro = true; /* verifica se o carnivoro presente é da mesma espécie */

        /* verifica os animais que já estão no recinto */
        recinto.animais.forEach((an) => {

        const { especie, quantidade: qtd } = an;
        const infoEspecie = this.animaisInfo[especie.toLowerCase()]
        espacoOcupado += infoEspecie.tamanho * qtd; /* calcula o espaço ocupado pelos animais */
       
        /* se houver carnívoro, verifica se é da mesma espécie */
        if (infoEspecie.carnivoro) {
            carnivoroPresente = true;
            if (especie.toLowerCase() !== animal.toLowerCase()) {
                mesmoTipoCarnivoro = false; /* se for outro carnívoro, o recinto não será viável */
            }
        }
    });
  
   /* verifica o campo necessário */
    const campoNecessario = tamanho * quantidade;
    const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
    const espacoComExtra = campoNecessario + (recinto.animais.length > 0 ? 1 : 0);

    /* regra para verificar bioma adequado */
    const biomaAdequado = biomas.some(bioma => recinto.bioma.includes(bioma));
    /* verificação de carnívoros */
    const carnivoroOk = !(carnivoro && carnivoroPresente && !mesmoTipoCarnivoro);
    /* verifica espaço suficiente */
    const espacoSuficiente = espacoComExtra <= espacoDisponivel;
    /* verificação de hipopotamo e macacos */
    const hipopotamoOk = animal.toLowerCase() === 'hipopotamo' && recinto.bioma === 'savana e rio'
    const macacoOk = animal.toLowerCase() === 'macaco' && recinto.animais.length > 0;

    if (biomaAdequado && carnivoroOk && espacoSuficiente) {
        if (animal.toLowerCase() === 'hipopotamo' && !hipopotamoOk) return;
        if (animal.toLowerCase() === 'macaco' && !macacoOk) return;
    

        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoComExtra} total: ${recinto.tamanhoTotal})`)
        
     }
   });
   
   if (recintosViaveis.length === 0) {
    return { erro: "Não há recinto viável"}
   }
  /* Ordena a lista de recintos viáveis pelo número do recinto */
  recintosViaveis.sort((a, b) => a.numero - b.numero);

  /* Retorna apenas a descrição dos recintos viáveis */
  return {recintosViaveis}
  }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos("macaco", 2));
console.log(zoo.analisaRecintos("unicórnio", 1))
console.log(zoo.analisaRecintos("hipopotamo", 3))