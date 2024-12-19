import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  DeleteButton,
  TextInput,
} from 'react-admin';

const filters = [
  <TextInput source="title" label="عنوان الشريحة" alwaysOn />,
];

export default function HeroSlideList() {
  return (
    <List
      filters={filters}
      sort={{ field: 'order_index', order: 'ASC' }}
      perPage={10}
      title="الشرائح الرئيسية"
    >
      <Datagrid>
        <TextField source="id" />
        <ImageField source="image" title="الصورة" />
        <TextField source="title" label="العنوان" />
        <TextField source="subtitle" label="العنوان الفرعي" />
        <TextField source="order_index" label="الترتيب" />
        <EditButton label="تعديل" />
        <DeleteButton label="حذف" />
      </Datagrid>
    </List>
  );
} 