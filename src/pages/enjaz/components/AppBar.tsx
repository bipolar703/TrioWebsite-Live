import { AppBar as RaAppBar, AppBarProps, TitlePortal } from 'react-admin';
import { Box, Typography } from '@mui/material';

export const AppBar = (props: AppBarProps) => (
  <RaAppBar
    {...props}
    color="primary"
    elevation={1}
    sx={{
      '& .RaAppBar-title': {
        flex: 1,
        textAlign: 'right',
        direction: 'rtl',
      },
    }}
  >
    <TitlePortal />
    <Box flex={1} />
    <Typography variant="h6" color="inherit">
      لوحة التحكم
    </Typography>
  </RaAppBar>
); 