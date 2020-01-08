import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import mrLogo from '../assets/motiveratelogo_v1.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  barColor: {
    backgroundColor: '#024b34c2'
  }
}));

export default function WelcomeNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
      <AppBar position="static" className={classes.barColor} >
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <img src={mrLogo} alt="motiverate logo" className="mrLogo" height="40px" width="60px"></img>
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MotiveRate
          </Typography>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}