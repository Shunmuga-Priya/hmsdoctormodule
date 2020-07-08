import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./CancelledTable.css";
import axios from "axios";
import dateFormat from 'dateformat'
import Moment from 'react-moment';
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
  componentDidMount(){
   this.props.DayDataApi()
  }
  render() {
    console.log(this.state.CancelGetData,"dfggh")
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
          
          rowdata={this.props.wk_mh_yr_Data && this.props.wk_mh_yr_Data}
          tableicon_align={"cell_eye"}
          VisibilityIcon="close"
          DeleteIcon="close"
          EditIcon="close"
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          props_loading={this.props.props_loading}
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
