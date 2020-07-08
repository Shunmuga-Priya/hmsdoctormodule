import React, { Component } from "react";
import { Select } from "antd";
import Moment from "react-moment";
import AppointmentTable from "./AppointmentTable";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import Paper from "@material-ui/core/Paper";
import { Input } from "antd";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class AppointmentMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      date: "rrr"
    };
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    return (
      <Paper>
  {/*   HEADING */}
        <div className="">

        </div>
        <AppointmentTable />
      </Paper>
    );
  }
}
export default AppointmentMaster;
