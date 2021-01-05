module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }
    
        return age
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        const hours = date.getHours()
        const minutes = date.getMinutes()

        return {
            day: `${day}/${month}`,
            month,
            year,
            hours: `${hours}h${minutes}`,
            minutes,
            iso: `${day}/${month}/${year}`,
            birthday: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }

    },

    formatPrice(price){
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price/100);
      }
}

