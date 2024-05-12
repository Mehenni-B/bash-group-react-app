import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LogoSM } from '../_index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UserViewModel } from '../../view-models/_index';
import { ProfileMenu, NotificationsMenu } from '../menus/_index';

const geusstNavItems = [['/login', 'الرئيسية'], ['/login', 'خدماتنا'], ['/login', 'المقالات'], ['/login', 'نبذة عن الشركة'], ['/login', 'الأسئلة الشائعة']];
const loggedInNavItems = [['/', 'الرئيسية'], ['/services', 'خدماتنا'], ['/order/list', 'طلباتي'], ['/contact', 'دعم العملاء']];

const Navbar: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.current);
  const [requestFetched, setRequestFetched] = useState(Boolean(currentUser));
  const [navItems, setNavItems] = useState(geusstNavItems);
  const [mobileOpen, setMobileOpen] = useState(false);
  const getCurrentUser = (new UserViewModel()).getCurrent;

  useEffect(() => {
    if (currentUser)
      return;

    const fetchCurrentUser = async () => {
      const response = await getCurrentUser();
      if (response || !response)
        setRequestFetched(true);
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    currentUser ? setNavItems(loggedInNavItems) : setNavItems(geusstNavItems);
  }, [currentUser]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <LogoSM dir='vertical' />
      <Divider />
      <List>
        {navItems.map((item, key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={item[0]}>
                <ListItemText primary={item[1]} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ bgcolor: "white", boxShadow: 0 }}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            <IconButton color="default" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { lg: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2 }}>
              <LogoSM />
            </Box>
            {requestFetched && <>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                {navItems.map((item, key) => <Link to={item[0]}><Button key={key} sx={{ color: '#333' }}>{item[1]}</Button></Link>)}
              </Box>
              <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2 }}>
                {currentUser ? <>
                  <NotificationsMenu />
                  <ProfileMenu />
                </> : <>
                  <Link to={'/contact'}>
                    <Button variant="outlined" sx={{ borderRadius: 6, py: 2, px: 4 }}>تواصل معنا</Button>
                  </Link>
                  <Link to={'/login'}>
                    <Button variant="contained" sx={{ borderRadius: 6, py: 2, px: 4 }} color="secondary">تسجيل الدخول</Button>
                  </Link>
                </>}
              </Box>
            </>}
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;