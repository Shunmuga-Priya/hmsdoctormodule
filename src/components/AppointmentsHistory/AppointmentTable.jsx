import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ListView from "./ListView";
import "./AppointmentTable.css";

class AppointmentTable extends React.Component {
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
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "", label: "Action" },
          ]}
          rowdata={[
            this.createData({
              customer: "AAMINA",
              package: "Good Health Premium Package",
              date: "18 Dec 2019",
              time: "09:00 AM",
            }),
            this.createData({
              customer: "MOHAMED",
              package: "Health Premium Package",
              date: "18 Dec 2019",
              time: "09:30 AM",
            }),
            this.createData({
              customer: "ABLA",
              package: "Health Premium ",
              date: "18 Dec 2019",
              time: "09:45 AM",
            }),
            this.createData({
              customer: "ZAINAB",
              package: "Good Health Premium Package",
              date: "18 Dec 2019",
              time: "10:05 AM",
            }),
            this.createData({
              customer: "SAMREEN",
              package: "Premium Package",
              date: "18 Dec 2019",
              time: "10:47 AM",
            }),
            this.createData({
              customer: "RASHID",
              package: "Gold Premium Package",
              date: "18 Dec 2019",
              time: "11:15 AM",
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
        {/* <Modalcomp
          visible={this.state.openview}
          closemodal={e => this.closemodal(e)}
          xswidth={"xs"}
        >
          <ListView />
        </Modalcomp> */}
        <ListView open={this.state.openview} onClose={this.closemodal} />

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

export default AppointmentTable;
