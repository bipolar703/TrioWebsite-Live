import React, { useState } from 'react';
import { useHeroSlides } from '../../hooks/useHeroSlides';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/common/ImageUpload';
import { HeroSlide } from '../../types/heroSlide';
import { Eye } from 'lucide-react';

interface HeroSlidesTabProps {
  handlePreview: (type: 'hero-slide', data: any) => void;
}

export default function HeroSlidesTab({ handlePreview }: HeroSlidesTabProps) {
  const {
    heroSlides,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    loading: heroSlidesLoading,
  } = useHeroSlides();

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [newHeroSlide, setNewHeroSlide] = useState<Omit<HeroSlide, 'id' | 'created_at' | 'updated_at'>>({
    image: '',
    title: '',
    subtitle: '',
    left_button_text: '',
    left_button_link: '',
    right_button_text: '',
    right_button_link: '',
    order_index: 0
  });

  const handleAddHeroSlide = async () => {
    try {
      await addHeroSlide(newHeroSlide);
      setNewHeroSlide({
        image: '',
        title: '',
        subtitle: '',
        left_button_text: '',
        left_button_link: '',
        right_button_text: '',
        right_button_link: '',
        order_index: heroSlides.length
      });
      toast.success('تمت إضافة الشريحة بنجاح');
    } catch (error) {
      toast.error('فشل في إضافة الشريحة');
    }
  };

  const handleUpdateHeroSlide = async (slide: HeroSlide) => {
    try {
      await updateHeroSlide(slide.id, slide);
      setEditingSlide(null);
      toast.success('تم تحديث الشريحة بنجاح');
    } catch (error) {
      toast.error('فشل في تحديث الشريحة');
    }
  };

  const handleRemoveHeroSlide = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الشريحة؟')) {
      try {
        await deleteHeroSlide(id);
        toast.success('تم حذف الشريحة بنجاح');
      } catch (error) {
        toast.error('فشل في حذف الشريحة');
      }
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <ImageUpload
        uploadPath="uploads/images/hero-slides"
        onUploadSuccess={(url) => {
          if (editingSlide) {
            setEditingSlide({ ...editingSlide, image: url });
          } else {
            setNewHeroSlide({ ...newHeroSlide, image: url });
          }
        }}
        onUploadError={(error) => toast.error(error)}
      />
      
      <input
        type="text"
        placeholder="العنوان"
        value={editingSlide ? editingSlide.title : newHeroSlide.title}
        onChange={(e) => {
          if (editingSlide) {
            setEditingSlide({ ...editingSlide, title: e.target.value });
          } else {
            setNewHeroSlide({ ...newHeroSlide, title: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <textarea
        placeholder="الوصف"
        value={editingSlide ? editingSlide.subtitle : newHeroSlide.subtitle}
        onChange={(e) => {
          if (editingSlide) {
            setEditingSlide({ ...editingSlide, subtitle: e.target.value });
          } else {
            setNewHeroSlide({ ...newHeroSlide, subtitle: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
        rows={3}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="نص الزر الأيسر"
            value={editingSlide ? editingSlide.left_button_text : newHeroSlide.left_button_text}
            onChange={(e) => {
              if (editingSlide) {
                setEditingSlide({ ...editingSlide, left_button_text: e.target.value });
              } else {
                setNewHeroSlide({ ...newHeroSlide, left_button_text: e.target.value });
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="رابط الزر الأيسر"
            value={editingSlide ? editingSlide.left_button_link : newHeroSlide.left_button_link}
            onChange={(e) => {
              if (editingSlide) {
                setEditingSlide({ ...editingSlide, left_button_link: e.target.value });
              } else {
                setNewHeroSlide({ ...newHeroSlide, left_button_link: e.target.value });
              }
            }}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="نص الزر الأيمن"
            value={editingSlide ? editingSlide.right_button_text : newHeroSlide.right_button_text}
            onChange={(e) => {
              if (editingSlide) {
                setEditingSlide({ ...editingSlide, right_button_text: e.target.value });
              } else {
                setNewHeroSlide({ ...newHeroSlide, right_button_text: e.target.value });
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="رابط الزر الأيمن"
            value={editingSlide ? editingSlide.right_button_link : newHeroSlide.right_button_link}
            onChange={(e) => {
              if (editingSlide) {
                setEditingSlide({ ...editingSlide, right_button_link: e.target.value });
              } else {
                setNewHeroSlide({ ...newHeroSlide, right_button_link: e.target.value });
              }
            }}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (editingSlide) {
              handleUpdateHeroSlide(editingSlide);
            } else {
              handleAddHeroSlide();
            }
          }}
          disabled={
            (editingSlide ? !editingSlide.image || !editingSlide.title || !editingSlide.subtitle
            : !newHeroSlide.image || !newHeroSlide.title || !newHeroSlide.subtitle)
          }
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {editingSlide ? 'تحديث الشريحة' : 'إضافة الشريحة'}
        </button>
        {editingSlide && (
          <button
            onClick={() => setEditingSlide(null)}
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
        <h2 className="text-2xl font-bold">إدارة شرائح العرض</h2>
        <button
          onClick={() => handlePreview('hero-slide', editingSlide || newHeroSlide)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <Eye size={20} />
          معاينة
        </button>
      </div>
      
      {/* Add/Edit Hero Slide Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
          {editingSlide ? 'تعديل الشريحة' : 'إضافة شريحة جديدة'}
        </h3>
        {renderForm()}
      </div>
      
      {/* Existing Hero Slides List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">الشرائح الحالية</h3>
        {heroSlidesLoading ? (
          <div className="text-center py-4">جاري التحميل...</div>
        ) : (
          <div className="space-y-4">
            {heroSlides.map((slide) => (
              <div key={slide.id} className="border rounded p-4">
                <div className="flex items-start gap-4">
                  <img src={slide.image} alt={slide.title} className="w-32 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{slide.title}</h4>
                    <p className="text-sm text-gray-600">{slide.subtitle}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => setEditingSlide(slide)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleRemoveHeroSlide(slide.id)}
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