import { useState } from 'react';
import { Card, CardContent, Typography, Tab, Tabs, Box } from '@mui/material';
import { Title } from 'react-admin';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Card>
      <Title title="لوحة التحكم" />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          مرحباً بك في لوحة التحكم
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="admin tabs"
            textColor="primary"
            indicatorColor="primary"
            sx={{ '& .MuiTab-root': { fontSize: '1rem' } }}
          >
            <Tab label="الإنجازات" />
            <Tab label="الشرائح الرئيسية" />
            <Tab label="شعارات العملاء" />
            <Tab label="المنتجات والأقسام" />
            <Tab label="إعدادات الموقع" />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={0}>
          <Typography>قسم الإنجازات</Typography>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Typography>قسم الشرائح الرئيسية</Typography>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography>قسم شعارات العملاء</Typography>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Typography>قسم المنتجات والأقسام</Typography>
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <Typography>قسم إعدادات الموقع</Typography>
        </TabPanel>
      </CardContent>
    </Card>
  );
} 