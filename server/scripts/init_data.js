import pool from '../config/db.js';

async function initData() {
  try {
    // Sample hero slides
    const heroSlides = [
      {
        title: 'مرحباً بكم في تريو ميكو',
        subtitle: 'شريككم الموثوق في حلول الغاز الصناعية',
        image: 'uploads/images/hero-slides/default-hero-1.jpg',
        left_button_text: 'تعرف علينا',
        left_button_link: '/about',
        right_button_text: 'منتجاتنا',
        right_button_link: '/products',
        order_index: 0
      },
      {
        title: 'حلول متكاملة',
        subtitle: 'نقدم حلولاً شاملة لاحتياجات الغاز الصناعي',
        image: 'uploads/images/hero-slides/default-hero-2.jpg',
        left_button_text: 'اتصل بنا',
        left_button_link: '/contact',
        right_button_text: 'خدماتنا',
        right_button_link: '/services',
        order_index: 1
      }
    ];

    // Insert hero slides
    for (const slide of heroSlides) {
      await pool.query(
        'INSERT INTO hero_slides (title, subtitle, image, left_button_text, left_button_link, right_button_text, right_button_link, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          slide.title,
          slide.subtitle,
          slide.image,
          slide.left_button_text,
          slide.left_button_link,
          slide.right_button_text,
          slide.right_button_link,
          slide.order_index
        ]
      );
    }

    // Sample product categories
    const categories = [
      {
        name: 'خزانات الغاز',
        description: 'خزانات غاز عالية الجودة بمختلف السعات',
        image: 'uploads/images/categories/gas-tanks.jpg',
        slug: 'gas-tanks',
        order_index: 0
      },
      {
        name: 'معدات السلامة',
        description: 'معدات وأجهزة السلامة للغاز',
        image: 'uploads/images/categories/safety-equipment.jpg',
        slug: 'safety-equipment',
        order_index: 1
      }
    ];

    // Insert categories
    for (const category of categories) {
      await pool.query(
        'INSERT INTO product_categories (name, description, image, slug, order_index) VALUES (?, ?, ?, ?, ?)',
        [category.name, category.description, category.image, category.slug, category.order_index]
      );
    }

    // Sample products
    const products = [
      {
        category_id: 1,
        name: 'خزان غاز 1000 لتر',
        description: 'خزان غاز سعة 1000 لتر مناسب للاستخدام المنزلي',
        features: 'مقاوم للصدأ، معتمد عالمياً',
        specifications: 'السعة: 1000 لتر، الارتفاع: 2 متر',
        image: 'uploads/images/products/tank-1000l.jpg',
        slug: 'tank-1000l',
        order_index: 0
      },
      {
        category_id: 2,
        name: 'كاشف تسرب الغاز',
        description: 'جهاز كشف تسرب الغاز عالي الدقة',
        features: 'إنذار صوتي ومرئي، حساسية عالية',
        specifications: 'يعمل بالبطارية، عمر البطارية: سنة كاملة',
        image: 'uploads/images/products/gas-detector.jpg',
        slug: 'gas-detector',
        order_index: 0
      }
    ];

    // Insert products
    for (const product of products) {
      await pool.query(
        'INSERT INTO products (category_id, name, description, features, specifications, image, slug, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          product.category_id,
          product.name,
          product.description,
          product.features,
          product.specifications,
          product.image,
          product.slug,
          product.order_index
        ]
      );
    }

    console.log('Sample data initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

initData(); 