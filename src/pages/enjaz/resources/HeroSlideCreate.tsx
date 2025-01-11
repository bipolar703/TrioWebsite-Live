import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  NumberInput,
  useNotify,
  useRedirect,
} from 'react-admin';

export default function HeroSlideCreate() {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify('تم إنشاء الشريحة بنجاح');
    redirect('list', 'hero-slides');
  };

  return (
    <Create mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <ImageInput 
          source="image" 
          label="الصورة" 
          accept={{
            'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
          }}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="title" label="العنوان" fullWidth />
        <TextInput source="subtitle" label="العنوان الفرعي" fullWidth multiline />
        <TextInput source="left_button_text" label="نص الزر الأيسر" />
        <TextInput source="left_button_link" label="رابط الزر الأيسر" />
        <TextInput source="right_button_text" label="نص الزر الأيمن" />
        <TextInput source="right_button_link" label="رابط الزر الأيمن" />
        <NumberInput source="order_index" label="الترتيب" min={0} defaultValue={0} />
      </SimpleForm>
    </Create>
  );
}
