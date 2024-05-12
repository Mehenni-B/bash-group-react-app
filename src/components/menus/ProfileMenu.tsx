import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { ProfileSVG } from '../../assets/svg/_index';
import { Typography } from '@mui/material';

const ProfileMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Button
            id="profile-button"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <ProfileSVG />
        </Button>
        <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'profile-button',
            }}
        >
            <Link to={'/profile'}>
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        حساب
                    </Typography>
                </MenuItem>
            </Link>
            <Link to={'/settings'}>
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        إعدادات
                    </Typography>
                </MenuItem>
            </Link>
            <Link to={'/logout'}>
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        تسجيل الخروج
                    </Typography>
                </MenuItem>
            </Link>
        </Menu>
    </>
}

export default ProfileMenu;