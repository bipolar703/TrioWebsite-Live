import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useProductCategories } from '../../hooks/useProductCategories';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/common/ImageUpload';
import { Product } from '../../types/product';
import { ProductCategory } from '../../types/productCategory';
import { Eye, Plus, Edit2, Trash2 } from 'lucide-react';

interface ProductsTabProps {
  handlePreview: (type: 'product', data: any) => void;
}

export default function ProductsTab({ handlePreview }: ProductsTabProps) {
  // Products state and hooks
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading: productsLoading,
  } = useProducts();

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading: categoriesLoading,
  } = useProductCategories();

  // State for managing forms
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'created_at' | 'updated_at'>>({
    category_id: 0,
    name: '',
    description: '',
    features: '',
    specifications: '',
    image: '',
    slug: '',
    order_index: 0
  });

  const [newCategory, setNewCategory] = useState<Omit<ProductCategory, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    description: '',
    image: '',
    slug: '',
    order_index: 0
  });

  // Category handlers
  const handleAddCategory = async () => {
    try {
      await addCategory(newCategory);
      setNewCategory({
        name: '',
        description: '',
        image: '',
        slug: '',
        order_index: categories.length
      });
      toast.success('تمت إضافة القسم بنجاح');
      setShowCategoryForm(false);
    } catch (error) {
      toast.error('فشل في إضافة القسم');
    }
  };

  const handleUpdateCategory = async (category: ProductCategory) => {
    try {
      await updateCategory(category.id, category);
      setEditingCategory(null);
      toast.success('تم تحديث القسم بنجاح');
    } catch (error) {
      toast.error('فشل في تحديث القسم');
    }
  };

  const handleRemoveCategory = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع المنتجات المرتبطة به.')) {
      try {
        await deleteCategory(id);
        toast.success('تم حذف القسم بنجاح');
      } catch (error) {
        toast.error('فشل في حذف القسم');
      }
    }
  };

  // Product handlers
  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct);
      setNewProduct({
        category_id: 0,
        name: '',
        description: '',
        features: '',
        specifications: '',
        image: '',
        slug: '',
        order_index: products.length
      });
      toast.success('تمت إضافة المنتج بنجاح');
    } catch (error) {
      toast.error('فشل في إضافة المنتج');
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      await updateProduct(product.id, product);
      setEditingProduct(null);
      toast.success('تم تحديث المنتج بنجاح');
    } catch (error) {
      toast.error('فشل في تحديث المنتج');
    }
  };

  const handleRemoveProduct = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id);
        toast.success('تم حذف المنتج بنجاح');
      } catch (error) {
        toast.error('فشل في حذف المنتج');
      }
    }
  };

  // Render category form
  const renderCategoryForm = () => (
    <div className="space-y-4">
      <ImageUpload
        uploadPath="uploads/images/categories"
        onUploadSuccess={(url) => {
          if (editingCategory) {
            setEditingCategory({ ...editingCategory, image: url });
          } else {
            setNewCategory({ ...newCategory, image: url });
          }
        }}
        onUploadError={(error) => toast.error(error)}
      />
      
      <input
        type="text"
        placeholder="اسم القسم"
        value={editingCategory ? editingCategory.name : newCategory.name}
        onChange={(e) => {
          if (editingCategory) {
            setEditingCategory({ ...editingCategory, name: e.target.value });
          } else {
            setNewCategory({ ...newCategory, name: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <textarea
        placeholder="وصف القسم"
        value={editingCategory ? editingCategory.description : newCategory.description}
        onChange={(e) => {
          if (editingCategory) {
            setEditingCategory({ ...editingCategory, description: e.target.value });
          } else {
            setNewCategory({ ...newCategory, description: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
        rows={3}
      />
      
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (editingCategory) {
              handleUpdateCategory(editingCategory);
            } else {
              handleAddCategory();
            }
          }}
          disabled={
            (editingCategory ? !editingCategory.name
            : !newCategory.name)
          }
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {editingCategory ? 'تحديث القسم' : 'إضافة القسم'}
        </button>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowCategoryForm(false);
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          إلغاء
        </button>
      </div>
    </div>
  );

  // Render product form
  const renderProductForm = () => (
    <div className="space-y-4">
      <ImageUpload
        uploadPath="uploads/images/products"
        onUploadSuccess={(url) => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, image: url });
          } else {
            setNewProduct({ ...newProduct, image: url });
          }
        }}
        onUploadError={(error) => toast.error(error)}
      />
      
      <select
        value={editingProduct ? editingProduct.category_id : newProduct.category_id}
        onChange={(e) => {
          const categoryId = parseInt(e.target.value, 10);
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, category_id: categoryId });
          } else {
            setNewProduct({ ...newProduct, category_id: categoryId });
          }
        }}
        className="w-full p-2 border rounded"
      >
        <option value="0">اختر القسم</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      <input
        type="text"
        placeholder="اسم المنتج"
        value={editingProduct ? editingProduct.name : newProduct.name}
        onChange={(e) => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, name: e.target.value });
          } else {
            setNewProduct({ ...newProduct, name: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
      />
      
      <textarea
        placeholder="وصف المنتج"
        value={editingProduct ? editingProduct.description : newProduct.description}
        onChange={(e) => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, description: e.target.value });
          } else {
            setNewProduct({ ...newProduct, description: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
        rows={3}
      />
      
      <textarea
        placeholder="مميزات المنتج"
        value={editingProduct ? editingProduct.features : newProduct.features}
        onChange={(e) => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, features: e.target.value });
          } else {
            setNewProduct({ ...newProduct, features: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
        rows={3}
      />
      
      <textarea
        placeholder="مواصفات المنتج"
        value={editingProduct ? editingProduct.specifications : newProduct.specifications}
        onChange={(e) => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, specifications: e.target.value });
          } else {
            setNewProduct({ ...newProduct, specifications: e.target.value });
          }
        }}
        className="w-full p-2 border rounded"
        rows={3}
      />
      
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (editingProduct) {
              handleUpdateProduct(editingProduct);
            } else {
              handleAddProduct();
            }
          }}
          disabled={
            (editingProduct ? !editingProduct.name || !editingProduct.category_id
            : !newProduct.name || !newProduct.category_id)
          }
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج'}
        </button>
        {editingProduct && (
          <button
            onClick={() => setEditingProduct(null)}
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
        <h2 className="text-2xl font-bold">إدارة المنتجات والأقسام</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryForm(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <Plus size={20} />
            قسم جديد
          </button>
          <button
            onClick={() => handlePreview('product', editingProduct || newProduct)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <Eye size={20} />
            معاينة
          </button>
        </div>
      </div>
      
      {/* Categories Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">الأقسام</h3>
        </div>
        
        {showCategoryForm && (
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">
              {editingCategory ? 'تعديل القسم' : 'إضافة قسم جديد'}
            </h4>
            {renderCategoryForm()}
          </div>
        )}
        
        {categoriesLoading ? (
          <div className="text-center py-4">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="border rounded p-4">
                <div className="space-y-4">
                  {category.image && (
                    <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded" />
                  )}
                  <div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={16} />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleRemoveCategory(category.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
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
      
      {/* Products Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">المنتجات</h3>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-4">
            {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h4>
          {renderProductForm()}
        </div>
        
        {productsLoading ? (
          <div className="text-center py-4">جاري التحميل...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded p-4">
                <div className="space-y-4">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {categories.find(c => c.id === product.category_id)?.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={16} />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
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
