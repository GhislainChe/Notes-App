import express from 'express';
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

let categories = [
    { id: 101, name: 'Work Projects' },
    { id: 102, name: 'Personal Errands' },
    { id: 103, name: 'Ideas & Brainstorm' }
];

let notes = [
    { id: 1, categoryId: 101, title: 'Prep Q4 Meeting', content: 'Review all quarterly reports...', timestamp: Date.now() },
    { id: 2, categoryId: 102, title: 'Buy Groceries', content: 'Milk, eggs, bread, and dog food.', timestamp: Date.now() + 1 },
    { id: 3, categoryId: 103, title: 'New App Concept', content: 'A simple expense tracker...', timestamp: Date.now() + 2 },
];

let nextNoteId = notes.length + 1;

app.get('/api/categories', (req, res) => {
    res.json(categories); 

});

app.get('/api/notes', (req, res) => {
    res.json(notes); 
});

app.get('/', (req, res) => {
    res.send('Hello from the Note App API!');
});

app.listen(PORT, () => [
    console.log(`server running on port ${PORT}`)
])