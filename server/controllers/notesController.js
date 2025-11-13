const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { search } = req.query;

    let notes;
    if (search) {
      notes = await prisma.note.findMany({
        where: {
          authorId: userId,
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        },
        orderBy: { updatedAt: 'desc' },
      });
    } else {
      notes = await prisma.note.findMany({
        where: { authorId: userId },
        orderBy: { updatedAt: 'desc' },
      });
    }

    res.json({ notes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

const createNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json({ note });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

const updateNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const note = await prisma.note.updateMany({
      where: {
        id: parseInt(id),
        authorId: userId,
      },
      data: {
        title,
        content,
      },
    });

    if (note.count === 0) {
      return res.status(404).json({ error: 'Note not found or unauthorized' });
    }

    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const note = await prisma.note.deleteMany({
      where: {
        id: parseInt(id),
        authorId: userId,
      },
    });

    if (note.count === 0) {
      return res.status(404).json({ error: 'Note not found or unauthorized' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
