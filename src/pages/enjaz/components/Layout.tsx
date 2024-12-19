import { Layout as RaLayout, LayoutProps } from 'react-admin';
import { AppBar } from './AppBar';

export const Layout = (props: LayoutProps) => (
  <RaLayout
    {...props}
    appBar={AppBar}
    sx={{
      '& .RaLayout-content': {
        padding: 2,
      },
    }}
  />
); 