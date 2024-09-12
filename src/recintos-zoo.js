
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
    }

 }
 



export { RecintosZoo as RecintosZoo };
