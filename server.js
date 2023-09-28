const express = require('express')
const path = require('path')
const multer = require('multer')
const { mergedpdfs } = require('./merge')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'))
})

app.post('/merge', upload.array('pdfs', 100), async (req, res, next) => {
    let arrayOfFiles = req.files

    let d;
    for (let i of arrayOfFiles) {
        d = await mergedpdfs(path.join(__dirname, i.path))
    }
    res.sendFile(path.join(__dirname, `/public/mergedFolder/${d}.pdf`), (err) => {
        console.log(err);
    })

    fs.readdir('./public/mergedFolder', (err, files) => {
        for (let file of files) {
            fs.unlink(path.join(__dirname, `/public/mergedFolder/${file}`), err => {
                if (err) {
                    console.log(err);
                }
            })

        }
    })
    fs.readdir('./uploads', (err, files) => {
        for (let file of files) {
            fs.unlink(path.join(__dirname, `/uploads/${file}`), err => {
                if (err) {
                    console.log(err);
                }
            })
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(`The error is coming on the port number which is :- ${port}`)
    } else {
        console.log(`Server is listening on the port number http://localhost:${port}`)
    }
})