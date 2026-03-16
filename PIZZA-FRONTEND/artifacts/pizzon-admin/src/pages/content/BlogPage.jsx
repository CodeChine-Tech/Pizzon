import { useState, useEffect } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

const STORAGE = 'pizzon-admin-blog';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      const d = JSON.parse(raw);
      return Array.isArray(d) ? d : [];
    }
  } catch (_) {}
  return [];
}

function PostThumb({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
        No img
      </div>
    );
  }
  return (
    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
      <img src={src} alt="" className="w-full h-full object-cover" onError={() => setFailed(true)} />
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(posts)); } catch (_) {}
  }, [posts]);

  const addPost = (post) => {
    setPosts((p) => [{ id: Date.now(), ...post }, ...p]);
    setAddOpen(false);
    showToast('Post added');
  };

  const updatePost = (id, data) => {
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('Post updated');
  };

  const removePost = (p) => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    setPosts((prev) => prev.filter((x) => x.id !== p.id));
    showToast('Post removed');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Blog" description="Manage blog posts shown on the website." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Posts</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Add Post</button>
        </div>
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center text-3xl mb-4">📝</div>
            <p className="text-gray-600 font-medium">No posts yet</p>
            <p className="text-gray-500 text-sm mt-1">Click &quot;Add Post&quot; to create your first post.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Add Post</button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {posts.map((p) => (
              <li key={p.id} className="p-4 flex items-center gap-4">
                <PostThumb src={p.image} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.category} · {p.date} {p.author ? `· ${p.author}` : ''}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button type="button" onClick={() => setEditing(p)} className="text-sm font-medium" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removePost(p)} className="text-sm font-medium text-gray-500 hover:text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {addOpen && <PostModal onClose={() => setAddOpen(false)} onSave={addPost} />}
      {editing && <PostModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updatePost(editing.id, data)} isEdit />}
    </div>
  );
}

function PostModal({ item, onClose, onSave, isEdit }) {
  const [title, setTitle] = useState(item?.title ?? '');
  const [category, setCategory] = useState(item?.category ?? 'News');
  const [date, setDate] = useState(item?.date ?? new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState(item?.author ?? '');
  const [image, setImage] = useState(item?.image ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), category, date, author: author.trim() || 'Admin', image: image.trim() || null });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured image URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="form-input" placeholder="https://..." />
            {image && (
              <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                <img src={image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-input" />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 text-sm">Cancel</button>
            <button type="submit" className="flex-1 btn-primary">{isEdit ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </>
  );
}
