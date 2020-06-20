import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./CancelledTable.css";

class CancelledTable extends React.Component {
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
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "package", label: "Package" },
            { id: "bookeddate", label: "Booked Date" },

            { id: "date", label: "Cancelled Date" },
            { id: "time", label: "Time" },
          ]}
          rowdata={[
            this.createData({
              customer: "ABDUL-KHAAFID",
              package: "Good Health Premium Package",
              bookeddate: "17 Dec 2019",

              date: "18 Dec 2019",
              time: "09:00 AM",
            }),
            this.createData({
              customer: "AHMED",
              package: "Health Premium Package",
              bookeddate: "17 Dec 2019",

              date: "18 Dec 2019",
              time: "09:30 AM",
            }),
            this.createData({
              customer: "IRFAN",
              package: "Health Premium ",
              bookeddate: "16 Dec 2019",

              date: "17 Dec 2019",
              time: "09:45 AM",
            }),
            this.createData({
              customer: "ZAINAB",
              package: "Good Health Premium Package",
              bookeddate: "16 Dec 2019",

              date: "17 Dec 2019",
              time: "10:05 AM",
            }),
            this.createData({
              customer: "SAMREEN",
              package: "Premium Package",
              bookeddate: "15 Dec 2019",

              date: "16 Dec 2019",
              time: "10:47 AM",
            }),
            this.createData({
              customer: "RASHID",
              package: "Gold Premium Package",
              bookeddate: "14 Dec 2019",

              date: "15 Dec 2019",
              time: "11:15 AM",
            }),
          ]}
          tableicon_align={"cell_eye"}
          VisibilityIcon="close"
          DeleteIcon="close"
          EditIcon="close"
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

        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default CancelledTable;
