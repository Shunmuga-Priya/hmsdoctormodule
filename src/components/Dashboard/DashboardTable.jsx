import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ListView from "./ListView";
import "./DashboardTable.css";

class DashboardTable extends React.Component {
  state = {
    openview: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  render() {
    return (
      <div>
        <div className="lab_dashboard_buttons_wrap">
          <Card
            component={NavLink}
            to="/Home/Appointments"
            className="lab_button5 lab_button_common_styles"
          >
            <p className="lab_button_text">Total Appointments</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">18</p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/ManagePackage"
            className="lab_button1 lab_button_common_styles"
          >
            <p className="lab_button_text">Manage Package</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">6</p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/cancel"
            className="lab_button3 lab_button_common_styles"
          >
            <p className="lab_button_text">Cancellation</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">5</p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/Revenue"
            className="lab_button2 lab_button_common_styles"
          >
            <p className="lab_button_text">Total Revenue(KWD)</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">2415</p>
            </div>
          </Card>
        </div>
        <div className="todaysappointment_edit">
          <p className="todays_appointment">
            <b>Today's Appointment</b>
          </p>{" "}
          <p>18 Dec 2019</p>
        </div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "package", label: "Package" },
            { id: "time", label: "Time" },
            { id: "charge", label: "Charge(KWD)" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              customer: "AAMINA",
              package: "Health Premium Package",
              time: "12:00 AM",
              charge: "800",
            }),
            this.createData({
              customer: "MOHAMED",
              package: "Heart Package",
              time: "13:00 AM",
              charge: "2400",
            }),
            this.createData({
              customer: "ABLA",
              package: "Liver Package",
              time: "09:00AM",
              charge: "1600",
            }),
          ]}
          // tableicon_align={"cell_eye"}

          DeleteIcon="close"
          EditIcon="close"
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e) => this.modelopen(e)}
        />
        <ListView open={this.state.openview} onClose={this.closemodal} />

        {/* 
        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp> */}

        <div className="page_button_container">
          <div>
            <Button
              component={NavLink}
              to="/Home/mediauploads"
              className="lab_dash_bottom_buttons lab_dash_bottom2"
            >
              Media Upload
            </Button>
            <Button
              component={NavLink}
              to="/Home/advertise"
              className="lab_dash_bottom_buttons lab_dash_bottom3"
            >
              Advertisement Booking
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardTable;
