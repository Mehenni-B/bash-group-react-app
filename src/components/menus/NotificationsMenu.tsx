import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NotificationsSVG } from '../../assets/svg/_index';
import { Typography } from '@mui/material';

const NotificationsMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <div>
            <Button
                id="notifications-button"
                aria-controls={open ? 'notifications-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <NotificationsSVG />
            </Button>
            <Menu
                id="notifications-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'notifications-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        تم تحديث الملف الشخصي الخاص بك بنجاح
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        تم قبول طلبك بنجاح، شكرًا لثقتك بنا
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        تم استلام الدفعة الجديدة من الطلبات، تحقق منها الآن.
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography sx={{ textAlign: "end", width: "100%" }}>
                        لديك رسالة جديدة في صندوق الوارد، تحقق منها على الفور.
                    </Typography>
                </MenuItem>
            </Menu>
        </div>
    </>
}

export default NotificationsMenu;