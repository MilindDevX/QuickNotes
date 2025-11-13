import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, X, Plus, Search, FileText, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingNote, setViewingNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Failed to fetch notes', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [navigate]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
    setShowModal(true);
  };

  const handleViewNote = (note) => {
    setViewingNote(note);
    setShowViewModal(true);
  };

  const handleEditNote = (note, e) => {
    if (e) e.stopPropagation(); // Prevent view modal from opening
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowModal(true);
    setShowViewModal(false);
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    setSavingNote(true);
    try {
      if (editingNote) {
        await api.put(`/notes/${editingNote.id}`, { title, content });
        toast.success('Note updated successfully!', { icon: '✅' });
      } else {
        await api.post('/notes', { title, content });
        toast.success('Note created successfully!', { icon: '🎉' });
      }
      setShowModal(false);
      fetchNotes();
    } catch (error) {
      toast.error('Failed to save note');
      console.error(error);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success('Note deleted successfully!');
        fetchNotes();
      } catch (error) {
        toast.error('Failed to delete note');
        console.error(error);
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <span className="text-3xl">👋</span>
              </div>
              <p className="text-gray-600">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} in total
              </p>
            </div>
            <button 
              onClick={handleCreateNote}
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus size={20} />
              <span className="font-semibold">Create Note</span>
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search notes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all"
            />
          </div>
        </div>

        {/* Notes Grid or Empty State */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-blue-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms.' 
                  : "Start capturing your thoughts and ideas by creating your first note."}
              </p>
              {!searchTerm && (
                <button 
                  onClick={handleCreateNote}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Plus size={20} />
                  Create your first note
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <div 
                key={note.id} 
                onClick={() => handleViewNote(note)}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-gray-900 flex-1 pr-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <div className="flex space-x-2 flex-shrink-0">
                    <button 
                      onClick={(e) => handleEditNote(note, e)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit note"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete note"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                  {note.content.substring(0, 150)}{note.content.length > 150 ? '...' : ''}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200">
                  <Calendar size={14} />
                  <span>
                    {new Date(note.updatedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Create/Edit Note */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all animate-fade-in-up">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSaveNote} className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter a descriptive title..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows="12"
                    placeholder="Start writing your note here..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingNote}
                    className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingNote ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </span>
                    ) : (
                      editingNote ? 'Update Note' : 'Create Note'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Viewing Note */}
        {showViewModal && viewingNote && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all animate-fade-in-up max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {viewingNote.title}
                </h2>
                <button 
                  onClick={() => setShowViewModal(false)} 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                  {viewingNote.content}
                </p>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>
                    {new Date(viewingNote.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleEditNote(viewingNote);
                    }}
                    className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
                  >
                    <Pencil size={18} />
                    Edit Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
