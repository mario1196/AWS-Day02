import express from 'express'
import * as database from './database.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.get('/', async (req, res) => {
  const notes = await database.getNotes()
  res.render('index.ejs', {notes: notes})
})

app.post('/createNote', async (req, res) => {
  const {title, content} = req.body
  await database.addNote(title, content)
  res.redirect('/')
})

app.post('/deleteNote', async (req, res) => {
  const {id} = req.body
  await database.deleteNote(id)
  res.redirect('/')
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('Server running on port ', port)
})