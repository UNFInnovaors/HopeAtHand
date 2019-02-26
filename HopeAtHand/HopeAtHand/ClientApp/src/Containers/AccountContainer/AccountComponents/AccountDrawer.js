import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import FavoriteLessons from './Favorites/FavoriteLessons';
import FavoritePoems from './Favorites/FavoritePoems';
import FavoriteArt from './Favorites/FavoriteArt';
import FavoriteWriting from './Favorites/FavoriteWriting';
import { Typography } from '@material-ui/core';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItemText>
                <Typography variant="h4" align="center">Account Management</Typography>
            </ListItemText>
            <Divider/>
            <ListItem>
                <FavoriteLessons lessons={this.props.favorites.lessonplans}/>
            </ListItem>
            <ListItem>
                <FavoritePoems poems={this.props.favorites.poem}/>
            </ListItem>
            <ListItem>
                <FavoriteArt art={this.props.favorites.art}/>
            </ListItem>
            <ListItem>
                <FavoriteWriting writing={this.props.favorites.writing}/>
            </ListItem>
        </List>
        <Divider />
        <List>
         
        </List>
      </div>
    );

    return (
      <div>
        <IconButton  color="secondary" style={{  margin: '8px' }} onClick={this.toggleDrawer('right', true)}>
                  <AccountCircle color="secondary" style={{}} onClick={this.toggleDrawer('right', true)} />
        </IconButton>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);

/*        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </Drawer>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            {fullList}
          </div>
        </Drawer>*/
