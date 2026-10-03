import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, Category } from '../../types';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Tag, 
  FolderPlus
} from 'lucide-react';

export const AdminTaxonomyManager: React.FC = () => {
  const { 
    departments, 
    categories, 
    services,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    createCategory,
    updateCategory,
    deleteCategory
  } = useApp();

  // New Department Form State
  const [showAddDept, setShowAddDept] = useState(false);
  const [newDeptNameAr, setNewDeptNameAr] = useState('');
  const [newDeptNameEn, setNewDeptNameEn] = useState('');
  const [newDeptDescAr, setNewDeptDescAr] = useState('');

  // Editing Department State
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [editDeptNameAr, setEditDeptNameAr] = useState('');
  const [editDeptNameEn, setEditDeptNameEn] = useState('');
  const [editDeptDescAr, setEditDeptDescAr] = useState('');

  // Adding Category to a Department
  const [addingCatForDept, setAddingCatForDept] = useState<string | null>(null);
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');

  // Editing Category State
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatNameAr, setEditCatNameAr] = useState('');

  // Delete Confirmation State
  const [confirmDeleteDeptId, setConfirmDeleteDeptId] = useState<string | null>(null);
  const [confirmDeleteCatId, setConfirmDeleteCatId] = useState<string | null>(null);

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptNameAr.trim()) return;
    const slug = (newDeptNameEn || newDeptNameAr).toLowerCase().replace(/\s+/g, '-');
    createDepartment({
      slug,
      name_ar: newDeptNameAr.trim(),
      name_en: newDeptNameEn.trim() || newDeptNameAr.trim(),
      description_ar: newDeptDescAr.trim() || 'قسم متخصص للطباعة والتنفيذ الفني المتكامل.',
      icon_name: 'Layers',
      sort_order: departments.length + 1,
      featured: true,
    });
    setNewDeptNameAr('');
    setNewDeptNameEn('');
    setNewDeptDescAr('');
    setShowAddDept(false);
  };

  const startEditDept = (dept: Department) => {
    setEditingDeptId(dept.id);
    setEditDeptNameAr(dept.name_ar);
    setEditDeptNameEn(dept.name_en);
    setEditDeptDescAr(dept.description_ar);
  };

  const handleSaveDept = (id: string) => {
    if (!editDeptNameAr.trim()) return;
    updateDepartment(id, {
      name_ar: editDeptNameAr.trim(),
      name_en: editDeptNameEn.trim(),
      description_ar: editDeptDescAr.trim(),
    });
    setEditingDeptId(null);
  };

  const handleAddCategory = (deptId: string) => {
    if (!newCatNameAr.trim()) return;
    const deptCats = categories.filter(c => c.department_id === deptId);
    createCategory({
      department_id: deptId,
      slug: (newCatNameEn || newCatNameAr).toLowerCase().replace(/\s+/g, '-'),
      name_ar: newCatNameAr.trim(),
      name_en: newCatNameEn.trim() || newCatNameAr.trim(),
      description_ar: newCatNameAr.trim(),
      sort_order: deptCats.length + 1,
    });
    setNewCatNameAr('');
    setNewCatNameEn('');
    setAddingCatForDept(null);
  };

  const startEditCat = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditCatNameAr(cat.name_ar);
  };

  const handleSaveCat = (id: string) => {
    if (!editCatNameAr.trim()) return;
    updateCategory(id, { name_ar: editCatNameAr.trim() });
    setEditingCatId(null);
  };

  return (
    <div className="space-y-6 text-right pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDFA] dark:bg-[#1C1A1A] p-4 sm:p-5 rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F]">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-[#171616] dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B9142D]" />
            <span>إدارة هيكل الأقسام والتصنيفات (Taxonomy CMS)</span>
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-0.5">
            إضافة وتعديل وحذف الأقسام الرئيسية ({departments.length}) والتصنيفات الفرعية ({categories.length}) المرتبطة بالمتجر والخدمات مباشرة
          </p>
        </div>

        <button
          onClick={() => setShowAddDept(!showAddDept)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B9142D] hover:bg-[#990F24] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <FolderPlus className="w-4 h-4" />
          <span>إضافة قسم رئيسي جديد</span>
        </button>
      </div>

      {/* Add New Department Form */}
      {showAddDept && (
        <form 
          onSubmit={handleAddDepartment}
          className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border-2 border-[#B9142D]/30 p-5 space-y-4 shadow-md animate-in fade-in"
        >
          <div className="flex items-center justify-between border-b border-[#E7E0D3] dark:border-[#332F2F] pb-3">
            <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-[#B9142D]" />
              <span>إضافة قسم إنتاج أو خدمات جديد</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddDept(false)}
              className="text-[#78716C] hover:text-[#171616] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="block font-bold text-[#44403C] dark:text-[#D6D3D1]">اسم القسم (عربي) *</label>
              <input
                type="text"
                required
                value={newDeptNameAr}
                onChange={(e) => setNewDeptNameAr(e.target.value)}
                placeholder="مثال: طباعة الأوفست والتغليف"
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F]"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#44403C] dark:text-[#D6D3D1]">الاسم الإنجليزي (اختياري)</label>
              <input
                type="text"
                dir="ltr"
                value={newDeptNameEn}
                onChange={(e) => setNewDeptNameEn(e.target.value)}
                placeholder="e.g. Offset Printing & Packaging"
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F]"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="block font-bold text-[#44403C] dark:text-[#D6D3D1]">وصف القسم</label>
              <input
                type="text"
                value={newDeptDescAr}
                onChange={(e) => setNewDeptDescAr(e.target.value)}
                placeholder="وصف مختصر يظهر للعملاء في بطاقة القسم..."
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddDept(false)}
              className="px-4 py-2 rounded-xl border border-[#E7E0D3] dark:border-[#332F2F] text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#B9142D] hover:bg-[#990F24] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              حفظ القسم الجديد
            </button>
          </div>
        </form>
      )}

      {/* Departments List */}
      <div className="space-y-3">
        {departments.map((dept) => {
          const deptCats = categories.filter((c) => c.department_id === dept.id);
          const deptServices = services.filter((s) => s.department_id === dept.id);
          const isEditingDept = editingDeptId === dept.id;

          return (
            <div
              key={dept.id}
              className="bg-[#FFFDFA] dark:bg-[#1C1A1A] rounded-2xl border border-[#E7E0D3] dark:border-[#332F2F] p-4 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F5F1E9] dark:border-[#252222]">
                {isEditingDept ? (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <input
                      type="text"
                      value={editDeptNameAr}
                      onChange={(e) => setEditDeptNameAr(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] dark:bg-[#252222] border border-[#B9142D] font-bold"
                      placeholder="اسم القسم بالعربي"
                    />
                    <input
                      type="text"
                      dir="ltr"
                      value={editDeptNameEn}
                      onChange={(e) => setEditDeptNameEn(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] dark:bg-[#252222] border border-[#E7E0D3] dark:border-[#332F2F]"
                      placeholder="English Name"
                    />
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSaveDept(dept.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>حفظ</span>
                      </button>
                      <button
                        onClick={() => setEditingDeptId(null)}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-xs font-bold cursor-pointer"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FDE8EA] dark:bg-[#3D1217] flex items-center justify-center text-[#B9142D] font-bold text-sm shrink-0">
                      {dept.sort_order}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-[#171616] dark:text-white">
                        {dept.name_ar}
                      </h3>
                      <div className="text-[10px] text-[#78716C]">{dept.name_en}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-bold text-[#B9142D] bg-[#FDE8EA] dark:bg-[#3D1217] px-2.5 py-1 rounded-lg">
                    {deptServices.length} خدمات
                  </span>

                  <button
                    onClick={() => startEditDept(dept)}
                    className="p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-[#252222] hover:bg-amber-500/10 text-[#57534E] dark:text-[#A8A29E] hover:text-amber-600 border border-[#E7E0D3] dark:border-[#332F2F] transition-colors cursor-pointer"
                    title="تعديل القسم"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {confirmDeleteDeptId === dept.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          deleteDepartment(dept.id);
                          setConfirmDeleteDeptId(null);
                        }}
                        className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold cursor-pointer"
                      >
                        تأكيد الحذف
                      </button>
                      <button
                        onClick={() => setConfirmDeleteDeptId(null)}
                        className="px-2 py-1 rounded-lg bg-stone-200 dark:bg-stone-800 text-[10px] cursor-pointer"
                      >
                        تراجع
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteDeptId(dept.id)}
                      className="p-1.5 rounded-lg bg-[#FAF7F2] dark:bg-[#252222] hover:bg-red-500/10 text-[#57534E] dark:text-[#A8A29E] hover:text-red-600 border border-[#E7E0D3] dark:border-[#332F2F] transition-colors cursor-pointer"
                      title="حذف القسم"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[11px] text-[#78716C] flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#B9142D]" />
                    <span>التصنيفات الفرعية المعتمدة ({deptCats.length}):</span>
                  </div>
                  <button
                    onClick={() => {
                      setAddingCatForDept(addingCatForDept === dept.id ? null : dept.id);
                      setNewCatNameAr('');
                      setNewCatNameEn('');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B9142D] hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة تصنيف فرعي</span>
                  </button>
                </div>

                {addingCatForDept === dept.id && (
                  <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#252222] border border-[#B9142D]/30 animate-in fade-in">
                    <input
                      type="text"
                      value={newCatNameAr}
                      onChange={(e) => setNewCatNameAr(e.target.value)}
                      placeholder="اسم التصنيف الفرعي بالعربي..."
                      className="flex-1 min-w-[160px] px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] text-xs"
                    />
                    <input
                      type="text"
                      dir="ltr"
                      value={newCatNameEn}
                      onChange={(e) => setNewCatNameEn(e.target.value)}
                      placeholder="English Name (optional)"
                      className="w-40 px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1C1A1A] border border-[#E7E0D3] dark:border-[#332F2F] text-xs"
                    />
                    <button
                      onClick={() => handleAddCategory(dept.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#B9142D] text-white font-bold text-xs cursor-pointer"
                    >
                      إضافة
                    </button>
                    <button
                      onClick={() => setAddingCatForDept(null)}
                      className="px-2.5 py-1.5 rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] text-xs cursor-pointer"
                    >
                      إلغاء
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {deptCats.map((cat) => (
                    <div
                      key={cat.id}
                      className="group bg-[#FAF7F2] dark:bg-[#252222] text-[#44403C] dark:text-[#D6D3D1] px-2.5 py-1 rounded-lg border border-[#E7E0D3] dark:border-[#332F2F] text-[11px] flex items-center gap-1.5"
                    >
                      {editingCatId === cat.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={editCatNameAr}
                            onChange={(e) => setEditCatNameAr(e.target.value)}
                            className="w-28 px-1.5 py-0.5 rounded bg-white dark:bg-[#1C1A1A] border border-[#B9142D] text-[11px]"
                          />
                          <button
                            onClick={() => handleSaveCat(cat.id)}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingCatId(null)}
                            className="text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span>{cat.name_ar}</span>
                          <button
                            onClick={() => startEditCat(cat)}
                            className="opacity-60 hover:opacity-100 text-amber-600 transition-opacity cursor-pointer"
                            title="تعديل التصنيف"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          {confirmDeleteCatId === cat.id ? (
                            <button
                              onClick={() => {
                                deleteCategory(cat.id);
                                setConfirmDeleteCatId(null);
                              }}
                              className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                            >
                              حذف؟
                            </button>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteCatId(cat.id)}
                              className="opacity-60 hover:opacity-100 text-red-500 transition-opacity cursor-pointer"
                              title="حذف التصنيف"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
