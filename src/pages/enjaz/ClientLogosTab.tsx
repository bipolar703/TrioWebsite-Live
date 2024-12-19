import React, { useState } from 'react';
import { useClientLogos } from '../../hooks/useClientLogos';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/common/ImageUpload';
import { ClientLogo } from '../../types/clientLogo';
import { Eye } from 'lucide-react';

interface ClientLogosTabProps {
  handlePreview: (type: 'client-logo', data: any) => void;
}

export default function ClientLogosTab({ handlePreview }: ClientLogosTabProps) {
  const {
    clientLogos,
    addClientLogo,
    updateClientLogo,
    deleteClientLogo,
    loading: clientLogosLoading,
  } = useClientLogos();

  const [editingLogo, setEditingLogo] = useState<ClientLogo | null>(null);
  const [newLogo, setNewLogo] = useState<Omit<ClientLogo, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    image: '',
    url: '',
    order_index: 0
  });

  const handleAddLogo = async () => {
    try {
      await addClientLogo(newLogo);
      setNewLogo({
        name: '',
        image: '',
        url: '',
        order_index: clientLogos.length
      });
      toast.success('تمت إضافة الشعار بنجاح');
    } catch (error) {
      toast.error('فشل في إضافة الشعار');
    }
  };

  const handleUpdateLogo = async (logo: ClientLogo) => {
    try {
      await updateClientLogo(logo.id, logo);
      setEditingLogo(null);
      toast.success('تم تحديث الشعار بنجاح');
    } catch (error) {
      toast.error('فشل في تحديث الشعار');
    }
  };

  const handleRemoveLogo = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الشعار؟')) {
      try {
        await deleteClientLogo(id);
        toast.success('تم حذف الشعار بنجاح');
      } catch (error) {
        toast.error('فشل في حذف الشعار');
      }
    }
  };

  const renderForm = () => (
    <div className="space-y-4">
      <ImageUpload
        uploadPath="uploads/images/client-logos"
        onUploadSuccess={(url) => {
          if (editingLogo) {
            setEditingLogo({ ...editingLogo, image: url });
          } else {
            setNewLogo({ ...newLogo, image: url });
          }
        }}
        onUploadError={(error) => toast.error(error)}
      />
      
      <input
        type="text"
        placeholder="اسم العميل"
        value={editingLogo ? editingLogo.name : newLogo.name}
        onChange={(e) => {
          if (editingLogo) {
            setEditingLogo({ ...editingLogo, name: e.target.value });
          } else {
            setNewLogo({ ...newLogo, name: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <input
        type="url"
        placeholder="رابط الموقع (اختياري)"
        value={editingLogo ? editingLogo.url : newLogo.url}
        onChange={(e) => {
          if (editingLogo) {
            setEditingLogo({ ...editingLogo, url: e.target.value });
          } else {
            setNewLogo({ ...newLogo, url: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (editingLogo) {
              handleUpdateLogo(editingLogo);
            } else {
              handleAddLogo();
            }
          }}
          disabled={
            (editingLogo ? !editingLogo.image || !editingLogo.name
            : !newLogo.image || !newLogo.name)
          }
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {editingLogo ? 'تحديث الشعار' : 'إضافة الشعار'}
        </button>
        {editingLogo && (
          <button
            onClick={() => setEditingLogo(null)}
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
        <h2 className="text-2xl font-bold">إدارة شعارات العملاء</h2>
        <button
          onClick={() => handlePreview('client-logo', editingLogo || newLogo)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          <Eye size={20} />
          معاينة
        </button>
      </div>
      
      {/* Add/Edit Client Logo Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
          {editingLogo ? 'تعديل الشعار' : 'إضافة شعار جديد'}
        </h3>
        {renderForm()}
      </div>
      
      {/* Existing Client Logos List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">الشعارات الحالية</h3>
        {clientLogosLoading ? (
          <div className="text-center py-4">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clientLogos.map((logo) => (
              <div key={logo.id} className="border rounded p-4">
                <div className="space-y-4">
                  <img src={logo.image} alt={logo.name} className="w-full h-32 object-contain rounded" />
                  <div>
                    <h4 className="font-semibold text-center">{logo.name}</h4>
                    {logo.url && (
                      <a
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 block text-center mt-1"
                      >
                        زيارة الموقع
                      </a>
                    )}
                    <div className="mt-4 flex justify-center gap-2">
                      <button
                        onClick={() => setEditingLogo(logo)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleRemoveLogo(logo.id)}
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