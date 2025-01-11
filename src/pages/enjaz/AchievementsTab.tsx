import React, { useState } from 'react';
import { useAchievements } from '../../hooks/useAchievements';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/common/ImageUpload';
import { Achievement } from '../../types/achievement';
import { Eye } from 'lucide-react';

interface AchievementsTabProps {
  handlePreview: (type: 'achievement', data: any) => void;
}

export default function AchievementsTab({ handlePreview }: AchievementsTabProps) {
  const {
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    loading: achievementsLoading,
  } = useAchievements();

  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [newAchievement, setNewAchievement] = useState<Omit<Achievement, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    description: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    order_index: 0
  });

  const handleAddAchievement = async () => {
    try {
      await addAchievement(newAchievement);
      setNewAchievement({
        title: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        order_index: achievements.length
      });
      toast.success('تمت إضافة الإنجاز بنجاح');
    } catch (error) {
      toast.error('فشل في إضافة الإنجاز');
    }
  };

  const handleUpdateAchievement = async (achievement: Achievement) => {
    try {
      await updateAchievement(achievement.id, achievement);
      setEditingAchievement(null);
      toast.success('تم تحديث الإنجاز بنجاح');
    } catch (error) {
      toast.error('فشل في تحديث الإنجاز');
    }
  };

  const handleRemoveAchievement = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإنجاز؟')) {
      try {
        await deleteAchievement(id);
        toast.success('تم حذف الإنجاز بنجاح');
      } catch (error) {
        toast.error('فشل في حذف الإنجاز');
      }
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <ImageUpload
        uploadPath="uploads/images/achievements"
        onUploadSuccess={(url) => {
          if (editingAchievement) {
            setEditingAchievement({ ...editingAchievement, image: url });
          } else {
            setNewAchievement({ ...newAchievement, image: url });
          }
        }}
        onUploadError={(error) => toast.error(error)}
      />
      
      <input
        type="text"
        placeholder="عنوان الإنجاز"
        value={editingAchievement ? editingAchievement.title : newAchievement.title}
        onChange={(e) => {
          if (editingAchievement) {
            setEditingAchievement({ ...editingAchievement, title: e.target.value });
          } else {
            setNewAchievement({ ...newAchievement, title: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <textarea
        placeholder="وصف الإنجاز"
        value={editingAchievement ? editingAchievement.description : newAchievement.description}
        onChange={(e) => {
          if (editingAchievement) {
            setEditingAchievement({ ...editingAchievement, description: e.target.value });
          } else {
            setNewAchievement({ ...newAchievement, description: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
        rows={3}
      />
      
      <input
        type="date"
        value={editingAchievement ? editingAchievement.date : newAchievement.date}
        onChange={(e) => {
          if (editingAchievement) {
            setEditingAchievement({ ...editingAchievement, date: e.target.value });
          } else {
            setNewAchievement({ ...newAchievement, date: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (editingAchievement) {
              handleUpdateAchievement(editingAchievement);
            } else {
              handleAddAchievement();
            }
          }}
          disabled={
            (editingAchievement ? !editingAchievement.image || !editingAchievement.title || !editingAchievement.description
            : !newAchievement.image || !newAchievement.title || !newAchievement.description)
          }
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {editingAchievement ? 'تحديث الإنجاز' : 'إضافة الإنجاز'}
        </button>
        {editingAchievement && (
          <button
            onClick={() => setEditingAchievement(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            إلغاء
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الإنجازات</h2>
        <button
          onClick={() => handlePreview('achievement', editingAchievement || newAchievement)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <Eye size={20} />
          معاينة
        </button>
      </div>
      
      {/* Add/Edit Achievement Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
          {editingAchievement ? 'تعديل الإنجاز' : 'إضافة إنجاز جديد'}
        </h3>
        {renderForm()}
      </div>
      
      {/* Existing Achievements List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">الإنجازات الحالية</h3>
        {achievementsLoading ? (
          <div className="text-center py-4">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border rounded p-4">
                <div className="space-y-4">
                  <img src={achievement.image} alt={achievement.title} className="w-full h-48 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <p className="text-sm text-gray-500 mt-2">تاريخ الإنجاز: {achievement.date}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setEditingAchievement(achievement)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleRemoveAchievement(achievement.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 