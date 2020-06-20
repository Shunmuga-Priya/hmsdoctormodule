import React, { Component } from "react";
import CancelledTable from "./CancelledTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input, Select, Icon } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import dateFormat from "dateformat";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
const current_date = dateFormat(new Date(), "dd mmm yyyy");
export default class CancelledDashboard extends Component {
  render() {
    const { Option } = Select;
    const { Search } = Input;
    // console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div>
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">CANCELLED APPOINTMENTS</div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ButtonGroup
                className="clinic_group_details"
                size="small"
                aria-label="small outlined button group"
              >
                <Button className="clinic_details">This Week</Button>
                <Button className="clinic_details">This Month</Button>
                <Button className="clinic_details">This Year</Button>
              </ButtonGroup>

              <Moment format="DD-MMM-YYYY" className="mr-5"></Moment>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{ width: 150 }}
                className="mr-2 ml-2"
              />
              <div className="icon_head">
                <ReactSVG
                  src={pdf}
                  style={{ marginRight: "15px", marginLeft: "15px" }}
                />
                <ReactSVG src={excel} style={{ marginRight: "15px" }} />
                <ReactSVG src={print} />
              </div>
            </div>
          </div>
          <CancelledTable />
        </Paper>
      </div>
    );
  }
}
