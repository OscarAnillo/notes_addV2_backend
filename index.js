const express = require("express");
const app = express();

const PORT = process.env.PORT || 3005;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

//Middleware
app.use(express.json());
app.use(express.static("build"));

//Root
app.get("/", (req, res) => {
  res.send("<h1>Oscar Anillo</h1><p>Web UI Developer</p>");
});

//Show collection of notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//Show a singleton from collection
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id); //Converting to number
  const note = notes.find((item) => item.id === id); //Finds the element with the id
  if (note) {
    res.json(note);
  }
  res.status(404).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((item) => item.id)) : 0;
  return maxId + 1;
};

//Create a new item in the collection
app.post("/api/notes", (req, res) => {
  const note = req.body;
  if (!note.content) {
    return res.status(400).json({
      error: "Content is required",
    });
  }

  const newNoteBack = {
    id: generateId(),
    content: note.content,
    date: new Date(),
    import: note.important || false,
  };

  //console.log(newNoteBack);
  notes = notes.concat(newNoteBack);
  res.json(newNoteBack);
});

//Delete a singleton from collection
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id); //Converting to number
  notes = notes.filter((item) => item.id !== id);

  res.status(204).end();
});

//App listening
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
