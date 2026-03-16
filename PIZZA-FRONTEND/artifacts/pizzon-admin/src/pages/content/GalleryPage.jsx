import { useState, useEffect } from 'react';
import PageHeading from '../../components/PageHeading';
import { useToast } from '../../context/ToastContext';

const STORAGE = 'pizzon-admin-gallery';
function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) { const d = JSON.parse(raw); return Array.isArray(d) ? d : []; }
  } catch (_) {}
  return [];
}

function GalleryImage({ src, caption }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="aspect-square rounded-xl bg-gray-200 flex flex-col items-center justify-center text-gray-400 text-sm p-4">
        <span>No image</span>
        {caption && <span className="text-xs mt-1 truncate max-w-full">{caption}</span>}
      </div>
    );
  }
  return (
    <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
      <div className="aspect-square relative">
        <img src={src} alt={caption || ''} className="w-full h-full object-cover" onError={() => setFailed(true)} />
      </div>
      {caption && <p className="p-2 text-sm text-gray-600 bg-white border-t border-gray-100 truncate" title={caption}>{caption}</p>}
    </div>
  );
}

export default function GalleryPage() {
  const [images, setImages] = useState(load);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(images)); } catch (_) {}
  }, [images]);

  const addImage = (item) => {
    setImages((p) => [...p, { id: Date.now(), ...item }]);
    setAddOpen(false);
    showToast('Image added');
  };

  const updateImage = (id, data) => {
    setImages((p) => p.map((x) => (x.id === id ? { ...x, ...data } : x)));
    setEditing(null);
    showToast('Image updated');
  };

  const removeImage = (img) => {
    if (!window.confirm('Remove this image?')) return;
    setImages((p) => p.filter((x) => x.id !== img.id));
    showToast('Image removed');
  };

  return (
    <div>
      <PageHeading subtitle="Content" title="Gallery" description="Manage gallery images on the website. Add a caption for accessibility." />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">Images</h2>
          <button type="button" onClick={() => setAddOpen(true)} className="btn-primary text-sm py-2 px-4">Upload Image</button>
        </div>
        {images.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex w-20 h-20 rounded-2xl bg-gray-100 items-center justify-center text-4xl mb-4">🖼️</div>
            <p className="text-gray-600 font-medium">No images yet</p>
            <p className="text-gray-500 text-sm mt-1">Add images by URL and optional caption. Click &quot;Upload Image&quot;.</p>
            <button type="button" onClick={() => setAddOpen(true)} className="mt-4 btn-primary text-sm py-2 px-4">Upload Image</button>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <GalleryImage src={img.src} caption={img.caption} />
                <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" onClick={() => setEditing(img)} className="text-xs font-medium px-2 py-1 rounded bg-white/90 shadow" style={{ color: '#e8342e' }}>Edit</button>
                  <button type="button" onClick={() => removeImage(img)} className="text-xs font-medium px-2 py-1 rounded bg-white/90 shadow text-gray-600 hover:text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {addOpen && <ImageModal onClose={() => setAddOpen(false)} onSave={addImage} />}
      {editing && <ImageModal item={editing} onClose={() => setEditing(null)} onSave={(data) => updateImage(editing.id, data)} isEdit />}
    </div>
  );
}

function ImageModal({ item, onClose, onSave, isEdit }) {
  const [url, setUrl] = useState(item?.src ?? '');
  const [caption, setCaption] = useState(item?.caption ?? '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSave({ src: url.trim(), caption: caption.trim() || null });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 text-lg mb-4">{isEdit ? 'Edit' : 'Add'} Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="form-input" required placeholder="https://..." />
            {url && (
              <div className="mt-2 aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img src={url} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="form-input" placeholder="Optional description" />
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
