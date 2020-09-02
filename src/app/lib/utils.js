module.exports = {
    date(timestamp) {
        // pega a data mas em formato 'local'
        const date = new Date(timestamp)

        // yyyy (com UTC transformo para data em formato 'universal' = // IMPORTANTE fazer isso pra manipular depois)
        const year = date.getFullYear()

        // mm (mês é de 0 a 11, +1 pra fechar os 12)
        const month = `0${date.getMonth() + 1}`.slice(-2)

        // dd
        const day = `0${date.getDate()}`.slice(-2)

        const hour = date.getHours()
        const minutes = date.getMinutes()

        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },

    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL' //R$1.000,00
        }).format(price/100) //Dividir por 100 pq ele transforma 1,00 em 100 (tirando a vírgula pela Expressão Regular), então eu transformo de volta!
    }
}
