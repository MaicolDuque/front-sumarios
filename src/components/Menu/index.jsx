import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DraftsIcon from '@material-ui/icons/Drafts';
import FaceIcon from '@material-ui/icons/Face';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { useHistory, Link } from "react-router-dom";
import { ContextCreate } from '../../Auth/Context';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

export default function Menu({ window, mobileOpen, toggle }) {
  const { token } = useContext(ContextCreate);
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const container = window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ minHeight: '84px' }} />
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.rootList}
      >
        <ListItem button className={classes.listTitle}>
          <ListItemText primary="Sumarios" />
        </ListItem>
        <List component="div" disablePadding className={classes.listTitle}>
          <Link to="/summaries" style={{ textDecoration: "none" }}>
            <ListItem button className={classes.nested}  >
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText secondary="Mis sumarios" />
            </ListItem>
          </Link>
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              history.push("/search");
            }}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText secondary="Crear sumarios" />
          </ListItem>
          <Link to="/history" style={{ textDecoration: "none" }}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText secondary="Historial de envíos" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <ListItem button className={classes.listTitle}>
          <ListItemText primary="Contactos" />
        </ListItem>
        <List component="div" disablePadding className={classes.listTitle}>
          <ListItem button className={classes.nested}
            onClick={() => {
              history.push("/contact");
            }}>
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText secondary="Mis contactos" />
          </ListItem>
          <ListItem button className={classes.nested}
            onClick={() => {
              history.push("/contactList");
            }}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText secondary="Listas de contactos" />
          </ListItem>
        </List>
        <Divider />
        <ListItem button className={classes.listTitle}>
          <ListItemText primary="Perfil" />
        </ListItem>
        <List component="div" disablePadding className={classes.listTitle}>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText secondary="Información de perfil" />
          </ListItem>
        </List>
      </List>
    </div>
  );
  return (
    <>
      { token ?
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={() => toggle()}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        : null
      }
    </>
  )
}

Menu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};