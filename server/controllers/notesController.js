const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNotes = async (req, res) => {
  const { search, filter, sort, page = 1, limit = 10 } = req.query;
  const where = { authorId: req.user.userId };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  try {
    const notes = await prisma.note.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: {
        createdAt: 'desc', // Default sort
      },
    });
    const totalNotes = await prisma.note.count({ where });
    res.json({
      notes,
      totalPages: Math.ceil(totalNotes / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        authorId: req.user.userId,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await prisma.note.updateMany({
      where: { id: parseInt(id), authorId: req.user.userId },
      data: { title, content },
    });
    if (note.count === 0) {
      return res.status(404).json({ error: 'Note not found or not authorized' });
    }
    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.note.deleteMany({
      where: { id: parseInt(id), authorId: req.user.userId },
    });
    if (note.count === 0) {
      return res.status(404).json({ error: 'Note not found or not authorized' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
