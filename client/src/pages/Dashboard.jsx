import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, X, Plus, Search, FileText, Calendar, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';

const NOTES_PER_PAGE = 6;

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
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
    if (e) e.stopPropagation();
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
        toast.success('Note updated', {
          style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        });
      } else {
        await api.post('/notes', { title, content });
        toast.success('Note created', {
          style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        });
        setCurrentPage(1);
      }
      setShowModal(false);
      fetchNotes();
    } catch (error) {
      toast.error('Failed to save note', {
        style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
      console.error(error);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success('Note deleted', {
          style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        });
        fetchNotes();
        const remainingNotes = filteredNotes.length - 1;
        const maxPage = Math.ceil(remainingNotes / NOTES_PER_PAGE);
        if (currentPage > maxPage && maxPage > 0) {
          setCurrentPage(maxPage);
        }
      } catch (error) {
        toast.error('Failed to delete note', {
          style: { background: '#18181b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        });
        console.error(error);
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
  const startIndex = (currentPage - 1) * NOTES_PER_PAGE;
  const endIndex = startIndex + NOTES_PER_PAGE;
  const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-violet-400 mx-auto mb-4" />
          <p className="text-zinc-400">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/15 to-purple-600/10 rounded-full blur-[120px] animate-aurora-slow"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-600/15 to-blue-600/10 rounded-full blur-[100px] animate-aurora animation-delay-3000"></div>
        <div className="absolute top-[30%] left-[50%] w-[300px] h-[300px] bg-gradient-to-br from-emerald-600/10 to-teal-600/8 rounded-full blur-[80px] animate-pulse-glow animation-delay-5000"></div>
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-floating-particle"
            style={{
              left: `${15 + i * 15}%`,
              bottom: '-5%',
              animationDelay: `${i * 3}s`,
              animationDuration: `${18 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Welcome back, {user?.name || 'there'}
            </h1>
            <p className="text-zinc-400">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
            </p>
          </div>
          <button 
            onClick={handleCreateNote}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
          >
            <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
            <Plus size={18} className="relative" />
            <span className="relative">New Note</span>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-500" />
          </div>
          <input 
            type="text" 
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 hover:border-white/20 transition-all backdrop-blur-sm"
          />
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center mx-auto mb-6">
              <FileText size={28} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-zinc-400 mb-6 max-w-sm mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms.' 
                : 'Create your first note to get started.'}
            </p>
            {!searchTerm && (
              <button 
                onClick={handleCreateNote}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105"
              >
                <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
                <Plus size={18} className="relative" />
                <span className="relative">Create Note</span>
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedNotes.map((note, index) => (
                <div 
                  key={note.id} 
                  onClick={() => handleViewNote(note)}
                  className="group p-5 rounded-xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 backdrop-blur-sm border border-white/5 hover:border-violet-500/30 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg line-clamp-1 flex-1 pr-2 group-hover:text-violet-200 transition-colors">
                      {note.title}
                    </h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => handleEditNote(note, e)}
                        className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-violet-400/10 rounded-lg transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                    {note.content}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Calendar size={12} />
                    <span>
                      {new Date(note.updatedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 animate-fade-in-up">
                {/* Previous Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && goToPage(page)}
                      disabled={page === '...'}
                      className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                          : page === '...'
                          ? 'text-zinc-500 cursor-default'
                          : 'text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Page Info */}
                <span className="ml-4 text-sm text-zinc-500">
                  {startIndex + 1}-{Math.min(endIndex, filteredNotes.length)} of {filteredNotes.length}
                </span>
              </div>
            )}
          </>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  {editingNote ? 'Edit Note' : 'New Note'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveNote} className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Note title..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 hover:border-white/20 transition-all"
                  />
                </div>
                
                <div className="mb-6 flex-1">
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows="10"
                    placeholder="Write your note..."
                    className="w-full h-full min-h-[200px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 hover:border-white/20 transition-all resize-none"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingNote}
                    className="group relative px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 transition-all flex items-center gap-2 overflow-hidden hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
                    {savingNote ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span className="relative">Saving...</span>
                      </>
                    ) : (
                      <span className="relative">{editingNote ? 'Update' : 'Create'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && viewingNote && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold line-clamp-1 flex-1 pr-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  {viewingNote.title}
                </h2>
                <button 
                  onClick={() => setShowViewModal(false)} 
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {viewingNote.content}
                </p>
              </div>

              <div className="p-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Calendar size={14} />
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
                    className="px-5 py-2.5 text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleEditNote(viewingNote);
                    }}
                    className="group relative px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 overflow-hidden hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <span className="absolute inset-0 animate-shimmer-button opacity-0 group-hover:opacity-100"></span>
                    <Pencil size={16} className="relative" />
                    <span className="relative">Edit</span>
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
