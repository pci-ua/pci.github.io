
        {
            const a = new Date()
            document.querySelector(`#m${a.getMonth() + 1}-${a.getFullYear()}`).scrollIntoView({ behavior: 'smooth' })
        }