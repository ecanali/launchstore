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
    },

    formatCpfCnpj(value) {
        // removes any non-numeric character
        value = value.replace(/\D/g, "")

        // limits 14 characters in the field
        if (value.length > 14)
            value = value.slice(0, -1)

        // check if it is CNPJ - 11.222.333/4444-55
        if (value.length > 11) {
            // 11.222333444455
            value = value.replace(/(\d{2})(\d)/, "$1.$2")
            // 11.222.333444455
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            // 11.222.333/444455
            value = value.replace(/(\d{3})(\d)/, "$1/$2")
            // 11.222.333/4444-55
            value = value.replace(/(\d{4})(\d)/, "$1-$2")
        } else {
            // check if it is CPF - 111.222.333-44
            // 111.22233344
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            // 111.222.33344
            value = value.replace(/(\d{3})(\d)/, "$1.$2")
            // 111.222.333-44
            value = value.replace(/(\d{3})(\d)/, "$1-$2")
        }

        return value
    },

    formatCep(value) {
        // removes any non-numeric character
        value = value.replace(/\D/g, "")

        // limits 8 characters in the field
        if (value.length > 8)
            value = value.slice(0, -1)

        // formats to CEP - 11111-111
        value = value.replace(/(\d{5})(\d)/, "$1-$2")

        return value
    }
}
