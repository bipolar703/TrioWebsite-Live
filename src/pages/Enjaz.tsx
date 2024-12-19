import { useState, useRef } from 'react';
import { Upload, X, Loader2, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAchievements, Achievement } from '../hooks/useAchievements';
import { useAuth } from '../hooks/useAuth';
import { uploadImage } from '../services/achievements';

export default function Enjaz() {
  const {
    achievements,
    addAchievement,
    removeAchievement,
    updateAchievement
  } = useAchievements();
  
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  const { logout } = useAuth();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('يرجى اختيار صورة بتنسيق JPG أو PNG أو WebP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت');
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setNewAchievement(prev => ({ ...prev, image: imageUrl }));
      toast.success('تم رفع الصورة بنجاح');
    } catch (uploadError) {
      console.error('Error uploading image:', uploadError);
      toast.error('حدث خطأ أثناء رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAchievement.title.trim() || !newAchievement.description.trim() || !newAchievement.image) {
      toast.error('يرجى إكمال جميع الحقول المطلوبة');
      return;
    }

    try {
      if (editingId) {
        updateAchievement(editingId, newAchievement);
        toast.success('تم تحديث الإنجاز بنجاح');
        setEditingId(null);
      } else {
        addAchievement(newAchievement);
        toast.success('تم إضافة الإنجاز بنجاح');
      }

      setNewAchievement({
        title: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (saveError) {
      console.error('Error saving achievement:', saveError);
      toast.error('حدث خطأ أثناء حفظ الإنجاز');
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingId(achievement.id);
    setNewAchievement({
      title: achievement.title,
      description: achievement.description,
      image: achievement.image,
      date: achievement.date
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإنجاز؟')) {
      removeAchievement(id);
      toast.success('تم حذف الإنجاز بنجاح');
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
          >
            تسجيل الخروج
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {editingId ? 'تعديل الإنجاز' : 'إضافة إنجاز جديد'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                العنوان
              </label>
              <input
                id="title"
                type="text"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
                placeholder="أدخل عنوان الإنجاز"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                الوصف
              </label>
              <textarea
                id="description"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
                placeholder="أدخل وصف الإنجاز"
              />
            </div>

            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                الصورة
              </label>
              <input
                id="image-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                aria-label="اختر صورة للإنجاز"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                ) : newAchievement.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={newAchievement.image}
                      alt={newAchievement.title || "معاينة الصورة"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewAchievement(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      aria-label="حذف الصورة"
                      title="حذف الصورة"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">اضغط لرفع صورة</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingId ? 'تحديث الإنجاز' : 'إضافة الإنجاز'}
            </button>
          </form>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">قائمة الإنجازات</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
                <p className="text-gray-600 mt-2">{achievement.description}</p>
                <div className="mt-4 flex justify-end space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleEdit(achievement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    aria-label="تعديل الإنجاز"
                    title="تعديل"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    aria-label="حذف الإنجاز"
                    title="حذف"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 