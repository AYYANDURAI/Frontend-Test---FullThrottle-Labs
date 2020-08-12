import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Tables from './Tables';
import './User.css';

function User({ user }) {
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (users) => {
        setOpen(true);
        return setUserInfo(users);
    };
    return (
        <div className="user">
            <List className="users__list">
                <ListItem button className="users__listitem" alignItems="flex-start" onClick={() => handleOpen(user)}>
                    <ListItemAvatar>
                        <Avatar alt={user.real_name} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.real_name}
                        secondary={
                            <Typography
                                component="span"
                                variant="body2"
                                className="users__name"
                                color="textPrimary"
                            >
                                {user.tz}
                            </Typography>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
            <div className="modalOpen">
                <Modal className="modal" open={open}
                    onClose={handleClose}>
                    <Fade in={open}>
                        <Tables userInfo={userInfo} />
                    </Fade>
                </Modal>
            </div>
        </div >
    )
}

export default User;
