import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock, Plus, X, Save, Edit2, Trash2 } from 'lucide-react';
import { SHEET_LINKS, SheetLink } from '../lib/constants';

export const SheetsDirectory: React.FC = () => {
  const [sheets, setSheets] = useState<SheetLink[]>(SHEET_LINKS);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');

  // Load all sheets from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fb_sheets_data');
    if (saved) {
      try {
        const loadedSheets = JSON.parse(saved);
        if (loadedSheets && loadedSheets.length > 0) {
          setSheets(loadedSheets);
        }
      } catch (e) {
        console.error('Failed to parse sheets', e);
      }
    }
  }, []);

  const saveToStorage = (updatedSheets: SheetLink[]) => {
    setSheets(updatedSheets);
    localStorage.setItem('fb_sheets_data', JSON.stringify(updatedSheets));
  };

  const handleAddSheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSheet: SheetLink = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      url: newUrl.trim() || undefined,
      isActive: !!newUrl.trim(),
    };

    saveToStorage([...sheets, newSheet]);
    setNewTitle('');
    setNewUrl('');
    setIsAdding(false);
  };

  const startEditing = (sheet: SheetLink) => {
    setEditingId(sheet.id);
    setEditTitle(sheet.title);
    setEditUrl(sheet.url || '');
  };

  const handleSaveEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const updatedSheets = sheets.map(sheet => {
      if (sheet.id === id) {
        return {
          ...sheet,
          title: editTitle.trim(),
          url: editUrl.trim() || undefined,
          isActive: !!editUrl.trim()
        };
      }
      return sheet;
    });

    saveToStorage(updatedSheets);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الرابط؟')) {
      const updatedSheets = sheets.filter(s => s.id !== id);
      saveToStorage(updatedSheets);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8" dir="rtl">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6 px-2">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-[#003B3C] mb-2 font-['Lama_Sans']">
            F.B Company
          </h1>
          <p className="text-slate-500 text-lg font-['Lama_Sans']">
            كل الشيتات والروابط في مكان واحد
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 bg-[#003B3C] hover:bg-[#002C2D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span className="hidden sm:inline">
            {isAdding ? 'إلغاء' : 'إضافة رابط جديد'}
          </span>
        </button>
      </div>

      {/* Divider with green accent */}
      <div className="h-1 w-full bg-[#52B788] mb-8 rounded-full"></div>

      {/* Add New Form */}
      {isAdding && (
        <form 
          onSubmit={handleAddSheet}
          className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 shadow-sm animate-in fade-in slide-in-from-top-4"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">إضافة شيت جديد</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">اسم الشيت / الرابط <span className="text-red-500">*</span></label>
              <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="مثال: شيت الحضور والانصراف" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#52B788]/50 focus:border-[#52B788]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">الرابط (URL)</label>
              <input type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-left font-sans focus:outline-none focus:ring-2 focus:ring-[#52B788]/50 focus:border-[#52B788]" dir="ltr" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors">إلغاء</button>
            <button type="submit" disabled={!newTitle.trim()} className="flex items-center gap-1.5 px-4 py-2 bg-[#52B788] hover:bg-[#40916c] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><Save className="w-4 h-4" />حفظ الرابط</button>
          </div>
        </form>
      )}

      {/* Links List */}
      <div className="flex flex-col gap-3">
        {sheets.map((link) => (
          <div
            key={link.id}
            className={`
              group relative bg-white rounded-xl p-5 shadow-sm border transition-all
              ${link.isActive ? 'border-slate-200 hover:border-[#52B788] hover:shadow-md' : 'border-slate-100 opacity-90'}
            `}
          >
            {/* Active Indicator Line (Right side in RTL) */}
            {link.isActive && <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-[#52B788] rounded-r-xl" />}

            {editingId === link.id ? (
              <form onSubmit={(e) => handleSaveEdit(e, link.id)} className="animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#52B788]/50" />
                  </div>
                  <div>
                    <input type="url" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-left font-sans focus:outline-none focus:ring-2 focus:ring-[#52B788]/50" dir="ltr" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg">إلغاء</button>
                  <button type="submit" disabled={!editTitle.trim()} className="px-3 py-1.5 bg-[#52B788] text-white text-xs font-medium rounded-lg">حفظ التعديل</button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center pr-3">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[17px] font-bold text-[#1f2937]">{link.title}</h3>
                  {link.isActive ? (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#52B788] hover:text-[#40916c] hover:underline flex items-center gap-1 font-medium transition-colors" dir="ltr">
                      {link.url}
                    </a>
                  ) : (
                    <p className="text-[13px] text-slate-400 flex items-center gap-1.5">
                      اللينك لسه هيتضاف
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Actions (visible on hover) */}
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button onClick={() => startEditing(link)} className="p-1.5 text-slate-400 hover:text-[#52B788] hover:bg-[#52B788]/10 rounded-md transition-colors" title="تعديل">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(link.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="حذف">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-slate-300 mr-2 border-r border-slate-200 pr-4">
                    {link.isActive ? <ExternalLink className="w-5 h-5 text-[#52B788]/70" /> : <Clock className="w-5 h-5 opacity-50" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

