import express, { response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let categories = [
  { id: 101, name: "Work Projects" },
  { id: 102, name: "Personal Errands" },
  { id: 103, name: "Ideas & Brainstorm" },
];

let notes = [
  {
    id: 1,
    categoryId: 101,
    title: "Prep Q4 Meeting",
    content: "Review all quarterly reports...",
    timestamp: Date.now(),
  },
  {
    id: 2,
    categoryId: 102,
    title: "Buy Groceries",
    content: "Milk, eggs, bread, and dog food.",
    timestamp: Date.now() + 1,
  },
  {
    id: 3,
    categoryId: 103,
    title: "New App Concept",
    content: "A simple expense tracker...",
    timestamp: Date.now() + 2,
  },
];

let nextNoteId = notes.length + 1;

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.post("/api/categories", (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res
      .status(400)
      .json({ Error: "cant create a new category without a name" });
  }

  const catedId = categories.length + 100;
  let newCategory = {
    id: catedId++,
    name: name,
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.get("/api/notes", (req, res) => {
  const categoryQueryId = req.query.categoryId;
  let notesToSend = notes;

  if (categoryQueryId) {
    const targetId = parseInt(categoryQueryId, 10);

    notesToSend = notes.filter((note) => note.categoryId === targetId);

    // categ =

    if (isNaN(targetId)) {
      return res.status(400).json({ error: "category id must be a number" });
    }
  }

  res.json(notesToSend);
});

app.post("/api/notes", (req, res) => {
  const { title, content, categoryId: rawCategoryId } = req.body;

  if (!title || !content || !rawCategoryId) {
    return res
      .status(400)
      .json({ error: "Missing title, content, or categoryId." });
  }

  const categoryId = parseInt(rawCategoryId, 10);

  const categoryExists = categories.find((cat) => cat.id === categoryId);

  if (!categoryExists) {
    return res
      .status(400)
      .json({ error: `Category with ID ${categoryId} not found.` });
  }

  const newNote = {
    id: nextNoteId++,
    categoryId: categoryId,
    title: title,
    content: content,
    timestamp: Date.now(),
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

app.put("/api/categories/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const newName = req.body.name;
  if (!newName) {
    return res.status(400).json({ Error: "Did not receive any new name " });
  }

  let indexed = categories.findIndex((index) => index.id == noteId);

  if (indexed === -1) {
    return res.status(404).json({ Error: "Error; Not found" });
  }

  categories[indexed].name = newName;

  res.json(categories[indexed]);
});

app.put("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const updateNote = req.body;

  if (!updateNote) {
    return res.status(404).json({ Error: "You need to update something" });
  }

  const indexedNote = notes.findIndex((index) => index.id == noteId);
  if (indexedNote === -1) {
    return res.status(404).json({ Error: "Note not found" });
  }

  if (req.body.categoryId !== undefined) {
    const newCategoryId = parseInt(req.body.categoryId, 10);

    if (isNaN(newCategoryId)) {
      return res.status(400).json({ error: "categoryId must be a number." });
    }

    const categoryExists = categories.find((cat) => cat.id === newCategoryId);

    if (!categoryExists) {
      return res.status(400).json({
        error: `Invalid categoryId: ${newCategoryId}. Category does not exist.`,
      });
    }
  }

  const noteToUpdate = notes[indexedNote];

  if (req.body.title !== undefined) {
    noteToUpdate.title = req.body.title;
  }
  if (req.body.content !== undefined) {
    noteToUpdate.content = req.body.content;
  }
  if (req.body.categoryId !== undefined) {
    noteToUpdate.categoryId = parseInt(req.body.categoryId, 10);
  }

  noteToUpdate.timestamp = Date.now();

  res.json(noteToUpdate);
});

app.delete("/api/categories/:", (req, res) => {
  const categoryId = parseInt(req.params.id);

  const indexedCategory = categories.findIndex(
    (category) => category.id == categoryId
  );

  if(!categoryId){
    return res.status(404).json({ Error: "Category not found"})
  }

  const categdelete = categories[indexedCategory]

  categdelete

});

app.get("/", (req, res) => {
  res.send("Hello from the Note App API!");
});

app.listen(PORT, () => [console.log(`server running on port ${PORT}`)]);
