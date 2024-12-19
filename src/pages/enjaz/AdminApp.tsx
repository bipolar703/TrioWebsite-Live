import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { dataProvider } from '../../providers/dataProvider';
import { authProvider } from '../../providers/authProvider';
import HeroSlideList from './resources/HeroSlideList';
import HeroSlideEdit from './resources/HeroSlideEdit';
import HeroSlideCreate from './resources/HeroSlideCreate';
import ProductList from './resources/ProductList';
import ProductEdit from './resources/ProductEdit';
import ProductCreate from './resources/ProductCreate';
import CategoryList from './resources/CategoryList';
import CategoryEdit from './resources/CategoryEdit';
import CategoryCreate from './resources/CategoryCreate';
import { Layout } from './components/Layout';
import Dashboard from './components/Dashboard';

export default function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={Layout}
      requireAuth
      basename="/enjaz"
      dashboard={Dashboard}
    >
      <Resource
        name="hero-slides"
        list={HeroSlideList}
        edit={HeroSlideEdit}
        create={HeroSlideCreate}
        options={{ label: 'الشرائح الرئيسية' }}
      />
      <Resource
        name="products"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        options={{ label: 'المنتجات' }}
      />
      <Resource
        name="product-categories"
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
        options={{ label: 'أقسام المنتجات' }}
      />
      <Resource
        name="achievements"
        list={ListGuesser}
        edit={EditGuesser}
        options={{ label: 'الإنجازات' }}
      />
      <Resource
        name="client-logos"
        list={ListGuesser}
        edit={EditGuesser}
        options={{ label: 'شعارات العملاء' }}
      />
    </Admin>
  );
}
