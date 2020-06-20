import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ManagePackageModal from "./ManagePackageModal";

import "./ManagePackageTable.css";
import HealthPremiumModal from "./HealthPremiumModal";

class ManagePackage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openview: false,
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
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
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "package", label: "Package Name" },
            { id: "fee", label: "Fee(KWD)" },
            { id: "date", label: "Created Date" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              package: "Good Health Premium",
              fee: "400",
              date: "18 Sep 2019",
            }),
            this.createData({
              package: "Health Premium",
              fee: "400",
              date: "18 Sep 2019",
            }),
            this.createData({
              package: "Good Health Premium",
              fee: "500",
              date: "17 Sep 2019",
            }),
            this.createData({
              package: "Good Health Premium",
              fee: "450",
              date: "09 Dec 2019",
            }),
            this.createData({
              package: "Health Premium",
              fee: "600",
              date: "09 Dec 2019",
            }),
            this.createData({
              package: "Health Premium",
              fee: "380",
              date: "08 Dec 2019",
            }),
          ]}
          tableicon_align={"cell_eye"}
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e) => this.modelopen(e)}
        />
        {/* <div className="docrevenue_total">
          <div className="totalkwd">
            <p className="grand_total">Grand Total</p>
            <span className="grand_total">:</span>
            <p className="revtotal_amt">4800 KWD</p>
          </div>
        </div> */}
        {/* 
        <Modalcomp
          visible={this.state.openview}
          title={"PACKAGE DETAILS"}
          closemodal={e => this.closemodal(e)}
          // xswidth={"xs"}
        >
          <HealthPremiumModal />
        </Modalcomp> */}

        <Modalcomp
          visible={this.state.editopen}
          title={"Add Package"}
          closemodal={(e) => this.closemodal(e)}
        >
          <ManagePackageModal
            visible={this.state.open}
            closemodal={this.handleClickclose}
          />
        </Modalcomp>
      </div>
    );
  }
}

export default ManagePackage;
