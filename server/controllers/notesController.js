const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NOTES_PER_PAGE = 6;

const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { search, page = 1, limit = NOTES_PER_PAGE } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const whereClause = {
      authorId: userId,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const totalNotes = await prisma.note.count({
      where: whereClause,
    });

    const notes = await prisma.note.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'desc' },
      skip,
      take: limitNum,
    });

    const totalPages = Math.ceil(totalNotes / limitNum);

    res.json({
      notes,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalNotes,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
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
