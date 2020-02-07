import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  profileIcons: {
    alignItems: 'right'
  },

  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const Profile = ({ currentUser }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [score, setScore] = useState(0);
  const [tier, setTier] = useState("");
  const [email, setEmail] = useState("");
  const [showSettings, setShowSettings] = useState(false)

  const updateProfileState = () => {
    setUsername(currentUser.attributes.username);
    setFullName(currentUser.attributes.full_name);
    setScore(currentUser.attributes.score);
    setTier(currentUser.attributes.tier);
    setEmail(currentUser.attributes.email);
  };

  const clearProfileState = () => {
    setUsername("");
    setFullName("");
    setScore(0);
    setTier("");
    setEmail("");
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    return currentUser ? updateProfileState() : clearProfileState();
  });

  return (
    <div className={classes.div} >
      <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {username}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {fullName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {email}
        </Typography>
        <Typography variant="body2" component="p">
          {tier.charAt(0).toUpperCase() + tier.slice(1)}
          <br />
          {"Score: " + score}
        </Typography>
        <br />
        {showSettings ? (
          <div>
           <Button color="primary">Edit Profile</Button> 
           <Button color="secondary">Delete Account</Button>
          </div>
          ) :
          null
        }

      </CardContent>
      <div className={classes.profileIcons}>
      {!showSettings ?
      <SettingsApplicationsIcon onClick={handleSettingsClick} />
      :
      <HighlightOffIcon onClick={handleSettingsClick} />
      }
        
      </div>
    </Card>
    </div>
  );
};

export default Profile;
