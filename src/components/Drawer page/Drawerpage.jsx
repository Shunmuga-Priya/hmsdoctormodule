import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/1.jpg";
import Badge from "@material-ui/core/Badge";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import home_svg from "../../Images/home_svg.svg";
import queue_svg from "../../Images/queue_svg.svg";
import schedule_svg from "../../Images/schedule_svg.svg";
import advertise_svg from "../../Images/advertise_svg.svg";
import revenue_svg from "../../Images/revenue_svg.svg";
import upload_svg from "../../Images/upload_svg.svg";
import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList
} from "@material-ui/core";
import { Link } from "react-router-dom";
import calendar_svg from "../../Images/calendar_svg.svg";
import ReactSVG from "react-svg";
import Profilepage from "../LabProfile/Profilepage";
import Report from "../../Images/report.svg";
import ProfileLogout from "../../components/ProfileLogout/ProfileLogout";

import cancelledappointments from "../../Images/cancelledappointments.svg";
import appointmentlist from "../../Images/appointmentlist.svg";
import advertisementbooking from "../../Images/advertisementbooking.svg";
import uploadresult from "../../Images/uploadresult.svg";
import deals from "../../Images/deals.svg";
import managetest from "../../Images/managetest.svg";
import revenue from "../../Images/revenue.svg";
import report from "../../Images/report.svg";
import profile from "../../Images/profile.svg";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashboardMaster from "../../components/Dashboard/DashboardMaster";
import AppointmentMaster from "../../components/AppointmentsHistory/AppointmentMaster";
import RevenueMaster from "../../components/Revenue/RevenueMaster";
import CancelledDashboard from "../../components/CancelledAppointments/CancelledDashboard";
import ManagePackageMaster from "../../components/ManagePackage/ManagePackageMaster";
import MediaUploadsMaster from "../../components/MediaUploads/MediaUploadsMaster";
import UploadMaster from "../../components/UploadResult/UploadMaster";
import Advertisement from "../../components/AdvertisementBooking/AdvertisementMaster";
import Deals from "../../components/Deals/DealsMaster";
import Cancelpayment from "../../components/CancelPayment/CancelPayment";
import Paymentreceived from "../../components/PaymentReceived/PaymentReceived";
import ProfileComp from "../../components/LabProfile/ProfileComp";

const drawerWidth = 260;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    fontsize: 3
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
const Trainer_viewWrapped = withStyles(styles)(Profilepage);
class MiniDrawer extends React.Component {
  state = {
    open: false,
    opening: false,
    logout: false,
    viewmodal: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  clicking = () => {
    this.setState({ opening: true });
  };
  Labhandleclose = value => {
    this.setState({ opening: false });
  };
  logoutOpen = () => {
    this.setState({ logout: true });
  };
  logoutClose = () => {
    this.setState({ logout: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true, profilecompopen: true });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false });
  };
  render() {
    const { classes, theme, children } = this.props;

    return (
      <div className="trainer_drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  {/* <div>
           <i class="fa fa-commenting-o chat" aria-hidden="true"></i>
            </div> */}
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.margin}
                  >
                    <div className="notification-icon">
                      {" "}
                      <img className="notification" src={bell} />
                    </div>
                  </Badge>
                  <Dropdown.Toggle
                    variant="my_style"
                    id="dropdown-basic"
                    onClick={this.logoutOpen}
                  >
                    My Profile
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu className="dropdown-menu">
    <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
  </Dropdown.Menu> */}
                  {this.state.logout === true && (
                    <div>
                      <ProfileLogout
                        open={this.state.logout}
                        onClose={this.logoutClose}
                      />
                    </div>
                  )}
                </Dropdown>

                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                    <large className="date">04-09-2019 10.00am</large>
                  </div>
                </div>
              </div>
              <Avatar
                className="Avatar-image"
                onClick={this.clicking}
                alt="avatar-missing"
                src={avatar}
                className={classes.avatar}
              />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <MenuList className="appbar_sideicons">
              <MenuItem component={Link} to="/Home/dashboard">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={home_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/Appointments">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={appointmentlist} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Appointment List" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/uploadresults">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={uploadresult} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Upload Result" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/cancel">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={cancelledappointments} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Cancelled Appointments" />
              </MenuItem>
              <MenuItem component={Link} to="/Home/advertise">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={advertisementbooking} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Advertisement Booking" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/deals">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={deals} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Deals" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/revenue">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={revenue} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/ManagePackage">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={managetest} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Package" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/mediauploads">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={upload_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Media Uploads" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/profile">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={profile} onClick={this.viewmodalOpen} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>

              {/* <MenuItem >
                <ListItemIcon>
                  <div className="icon-container"><div><ReactSVG src={Report} /></div></div>
                </ListItemIcon>
                <ListItemText primary="Report" />
            </MenuItem> */}

              <MenuItem>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={report} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Cancel Payment" />
              </MenuItem>

              {/* <MenuItem component={Link} to="/Home/Paymentreceived">
              <ListItemIcon >
              <div className="icon-container"><ReactSVG src={report} /></div>
              </ListItemIcon>
              <ListItemText primary="Payment Received" />
            </MenuItem>  */}
            </MenuList>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Route
              path={`${this.props.match.path}/dashboard`}
              component={DashboardMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/Appointments`}
              component={AppointmentMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/revenue`}
              component={RevenueMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancel`}
              component={CancelledDashboard}
              exact
            />
            <Route
              path={`${this.props.match.path}/ManagePackage`}
              component={ManagePackageMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/mediauploads`}
              component={MediaUploadsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/uploadresults`}
              component={UploadMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/advertise`}
              component={Advertisement}
              exact
            />
            <Route
              path={`${this.props.match.path}/deals`}
              component={Deals}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelpayment`}
              component={Cancelpayment}
              exact
            />
            <Route
              path={`${this.props.match.path}/paymentreceived`}
              component={Paymentreceived}
              exact
            />
            <Route
              path={`${this.props.match.path}/profile`}
              component={ProfileComp}
              exact
            />

            <div>
              {children}
              {/* <Trainer_viewWrapped
                open={this.state.opening}
                onClose={this.Labhandleclose}
              /> */}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
