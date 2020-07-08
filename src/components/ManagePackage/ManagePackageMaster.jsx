import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ManagePackageModal from "./ManagePackageModal";
import ManagePackageTable from "./ManagePackageTable";
import Moment from "react-moment";
import { Input, Select, Icon } from "antd";
import dateFormat from "dateformat";
import Paper from "@material-ui/core/Paper";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

export default class ManagePackageMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    return (
      <div>
        <Paper>
        {/* <div className="dashboard_header">
          <div className="dashboard_title">Manage Package</div>

          <div style={{ fontSize: "16px" }}>
            <Moment format="DD-MMM-YYYY" className="mr-4 ml-4"></Moment>
            <Search
              placeholder=" search "
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
            />
            <img
              className="plus-icon"
              src={plus}
              style={{ width: 40 }}
              className="mr-4 ml-5"
              // alt={"hi"}
              onClick={this.handleClickopen}
            />
          </div>
        </div> */}

        <ManagePackageTable />
        </Paper>
        {/* <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"Add Package"}
          >
            <ManagePackageModal
              visible={this.state.open}
              closemodal={this.handleClickclose}
            />
          </Modalcomp>
        </div> */}
      </div>
    );
  }
}
