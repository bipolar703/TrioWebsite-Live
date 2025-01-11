export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  left_button_text: string;
  left_button_link: string;
  right_button_text: string;
  right_button_link: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}