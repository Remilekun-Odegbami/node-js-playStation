const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/playstation/games')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All games
// localhost:3000/games/ 
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/playstation/games'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/playStation', {
                title: 'All Games',
                name: 'Play Station Game List',
                data
            })
        })
})

// single-psgame 
// localhost:3000/playStation/:id 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/playstation/games/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-psgame', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error - Page not found',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

// localhost:3000/playStation/name
router.get('/playStation/:name', (req, res)=> {
    const name = req.params.name 
    const URL = 'https://api.sampleapis.com/playstation/games'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.name.length; i++) {
                if (PlayStation == data.name[i]) {
                    res.render('pages/playStation', {
                        title: name,
                        name: name,
                        data
                    })
                }
            }
        })

})

module.exports = router