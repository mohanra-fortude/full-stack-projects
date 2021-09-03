import React from "react";
import UserService from "../services/UserService";
import { withStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import { flexbox } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Link } from "react-router-dom";
import axios from "axios";
import StorageService from "../services/StorageService";

const drawerWidth = 100;

const styles = (theme: Theme) => ({
  root: {
    width: "25vw",
  },
  card: {
    width: "36vw",
  },
  profile_detail: {
    display: "flex",
    width: "55vw",
  },
  field: {
    width: "45vw",
    display: "flex",
    justifyContent: "space-between",
  },
  info: {
    display: "flex",
    //flexDirection: "column",
    // justifyContent: "center",
    //  justifyContent: "space-around",
    width: "69vw",
    height: "100vh",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

type State = {
  createdAt: Date; //don't use prodInfo: ProductType..later you can't access individuals after setState
  userEmail: string;
  userId: string;
  userName: string;
};

class Profile extends React.Component<any, any> {
  state: State = {
    createdAt: new Date(),
    userEmail: "",
    userId: "",
    userName: "",
  };

  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      console.log(data);
      this.setState({
        createdAt: data.createdAt,
        userEmail: data.userEmail,
        userId: data.userId,
        userName: data.userName,
      });
    } catch (e) {
      console.log(e.response.data);
    }
  }

  extractFirstLetter(name: string) {
    let na: string = name.substring(0, 1);
    return na.toUpperCase();
  }

  delete = () => {
    console.log("inside delete", this.state.userId);
    console.log(history);
    let id = history.state.state.id;
    return StorageService.getData("token").then((token) =>
      axios
        .delete(`http://localhost:5000/address/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          console.log(`deleted successfully address of ${this.state.userName}`);
        })
    );
  };

  render() {
    const { classes, window, theme } = this.props;
    return (
      <div className={classes.profile_detail}>
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {this.extractFirstLetter(this.state.userName)}
                </Avatar>
              }
              title={"Hello  " + this.state.userName}
            />
          </Card>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button onClick={() => {}}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="MY ORDERS" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="ACCOUNT SETTINGS" />
            </ListItem>
            <ListItem button>
              <ListItemText secondary="Profile Information" />
            </ListItem>
            <ListItem button>
              <ListItemText secondary="Manage Addresse" />
            </ListItem>
            <ListItem button>
              <ListItemText secondary="PAN card information" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary="MY STUFFS" />
            </ListItem>
          </List>
        </div>
        {/* 
        <div className="row">
          <div className="col">1 of 2</div>
          <div className="col">2 of 2</div>
        </div> */}
        <div className={classes.outer}>
          <Card className={classes.info}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Personal Information
              </Typography>
              <hr />

              <div className={classes.field}>
                <Typography variant="h6" component="h6" color="textSecondary">
                  Name
                </Typography>
                <Typography variant="h6" component="h6" color="textSecondary">
                  {this.state.userName}
                </Typography>
              </div>
              <div className={classes.field}>
                <Typography variant="h6" component="h6" color="textSecondary">
                  Email Address
                </Typography>
                <Typography variant="h6" component="h6" color="textSecondary">
                  {this.state.userEmail}
                </Typography>
              </div>

              <div className={classes.field}>
                <div>
                  <Typography variant="h6" component="h6" color="textSecondary">
                    Address
                  </Typography>
                </div>
                <div>
                  <Link to={"/user/collect-address"}>
                    <button>Add address</button>
                  </Link>
                  <button onClick={() => this.delete()}>Remove Address</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
