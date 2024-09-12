
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

        const infoAnimal = this.animaisInfo[animal.toLowerCase()];
        if (!infoAnimal) {
            return { erro: "Animal inválido"}
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida!"}
        }
        /* extraindo informações dos animais */
        const { tamanho, biomas, carnivoro } = infoAnimal;
        /* criando array de recintos que são viáveis */
        const recintosViaveis = [];

        /* Itera sobre cada recinto para verificar se ele é adequado para o animal */
        this.recintos.forEach((recinto) => {
            let espacoOcupado = 0;
            let carnivoroPresente = false;
            let mesmoTipoCarnivoro = true;

        
        recintos.animais.forEach((an) => {

        const { especie, quantidade: qtd } = an;
        const infoEspecie = this.animaisInfo[especie.toLowerCase()]
        espacoOcupado += infoEspecie.tamanho * qtd;
       
        if (infoEspecie.carnivoro) {
            carnivoroPresente = true;
            if (especie.toLowerCase() !== animal.toLowerCase()) {
                mesmoTipoCarnivoro = false;
            }
        }
    });
  

    const campoNecessario = tamanho * quantidade;
    const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
    const espacoComExtra = espacoNecessario + (recinto.animais.length > 0 ? 1 : 0);

    const biomaAdequado = biomas.includes(recinto.bioma)

    const carnivoroOk = !(carnivoro && carnivoroPresente && !mesmoTipoCarnivoro);
    const espacoSuficiente = espacoComExtra <= espacoDisponivel;
    const hipopotamoOk = animal.toLowerCase() === 'hipopotamo' && recinto.bioma === 'savana e rio'
    const macacoOk = animal.toLowerCase() === 'macaco' && recinto.animais.length > 0;

    if (biomaAdequado && carnivoroOk && espacoSuficiente) {
        if (animal.toLowerCase() === 'hipopotamo' && !hipopotamoOk) return;
        if (animal.toLowerCase() === 'macaco' && !macacoOk) return;

        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoComExtra} total: ${recinto.tamanhoTotal})`)
     }
   });
  }
}

export { RecintosZoo as RecintosZoo };
