export const productCategories = [
  {
    id: 'gas-tanks',
    name: 'خزانات الغاز',
    image: '/src/images/products/gas-tanks/خزان غاز 7000 لتر.jpeg',
    description: 'خزانات غاز متعددة السعات للاستخدامات المنزلية والتجارية'
  },
  {
    id: 'safety',
    name: 'أنظمة السلامة',
    image: '/src/images/products/safety/كواشف تسريب غاز منزلية/كاشف-تسرب-غاز1.jpg',
    description: 'أجهزة كشف التسرب ولوحات التحكم وصمامات الأمان',
    subcategories: [
      { id: 'leak-detectors', name: 'كواشف تسريب الغاز' },
      { id: 'explosion-proof', name: 'كواشف ضد الإنفجار' },
      { id: 'auto-valves', name: 'صمامات قفل أوتوماتيكي' },
      { id: 'control-panels', name: 'لوحات تحكم' }
    ]
  },
  {
    id: 'measure-pressure',
    name: 'أجهزة القياس',
    image: '/src/images/products/measure-pressure/ساعات ضغط/ساعة-ضغط.jpg',
    description: 'عدادات وساعات قياس الضغط ومنظمات الغاز',
    subcategories: [
      { id: 'pressure-gauges', name: 'ساعات ضغط' },
      { id: 'gas-meters', name: 'عدادات استهلاك غاز' },
      { id: 'regulators', name: 'منظمات ضغط' }
    ]
  },
  {
    id: 'valves',
    name: 'المحابس',
    image: '/src/images/products/valves/محبس1.jpg',
    description: 'محابس تحكم وأمان عالية الجودة'
  },
  {
    id: 'fittings',
    name: 'التركيبات والأنابيب',
    image: '/src/images/products/fittings-pipes/1.jpg',
    description: 'وصلات وتركيبات نحاسية للغاز'
  },
  {
    id: 'connections',
    name: 'الوصلات والإكسسوارات',
    image: '/src/images/products/links-connections/اكسسوارات1.jpg',
    description: 'وصلات مرنة وإكسسوارات متنوعة'
  }
]; 