import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import "./ListView.css";
import Patient from "../../Images/11.jpg";
import Axios from "axios"
const styles = {};

export default class AppointmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };

  render() {
    
    const {viewdata}=this.props
    console.log(viewdata,"props")

    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (

      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        className="profile_modal"
      >
        <CloseIcon className="on_close" onClick={this.props.onClose} />
        <div className="img_outline">
          <img src={viewdata[0].patientImage} className="appointment" />
        </div>
        <div className="doctor_dashboard_view">
          <div className="doctor_details_container">
            <div className="doctor_detailsdiv">

            <h3 className="appointment_name">{viewdata[0].PatientName}</h3>
              <p className="appointment_age">{viewdata[0].age}</p>
            <p className="appointment__details">Appointment Details</p> 

              <div className="appointment__detailsdiv">
                <p className="appointment__details">Date</p>
                <p className="appointment_date">{viewdata[0].Date}</p>
              </div>
              <div className="appointment__detailsdiv">
                <p className="appointment__details_info">Time</p>
                <p className="appointment_date">{viewdata[0].Time}</p>
              </div>
              <div className="appointment__detailsdiv">
                <p className="appointment__details_info">Package</p>
                <p className="appointment_date">{viewdata[0].hc_package_name}</p>
              </div>

              <Divider className="dividerlist_root" />
            </div>
          </div>
        </div>
      </Dialog>

      // </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(AppointmentView);
