class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            'cafe': { descricao: 'Café', valor: 3.00 },
            'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            'suco': { descricao: 'Suco Natural', valor: 6.20 },
            'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
            'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            'salgado': { descricao: 'Salgado', valor: 7.25 },
            'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotal = 0;
        let itensPrincipaisComprados = new Set();
        const extrasParaPrincipais = {
            'chantily': 'cafe',
            'queijo': 'sanduiche'
        };

        for (const itemQuantidade of itens) {
            const [codigo, quantidade] = itemQuantidade.split(',')

            if (!this.cardapio[codigo]) {
                return "Item inválido!"
            }

            const principal = extrasParaPrincipais[codigo] || codigo

            if (codigo === 'chantily' || codigo === 'queijo') {
                if (!itensPrincipaisComprados.has(principal)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            itensPrincipaisComprados.add(principal);

            valorTotal += this.cardapio[codigo].valor * quantidade;
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (valorTotal === 0) {
            return "Quantidade inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03;
        } else if (metodoDePagamento !== 'debito') {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
