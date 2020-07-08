import React from "react";
import { message } from 'antd';
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ViewMedia from "./ViewMedia";
import MediaUploadsModal from "./MediaUploadsModal";
import order from "../../Images/order.svg";
import "./MediaUploadsTable.css";
import ReactSVG from "react-svg";
import axios from 'axios';
import { apiurl } from "../../App";
import DeleteMedia from '../../helpers/ModalComp/deleteModal';

class MediaUploadsTable extends React.Component {
  state = {
    openview: false,
    deleteopen: false,
    tableData: [],
    editData: "",
    viewData: "",
    workflow: false
  };

  componentWillReceiveProps() {
    this.setState({
      tableData: this.props.tableData,
      totalData: this.props.totalData
    })
  }
  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};
    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data, id) => {
    // alert(id)
    console.log(data, "edit_id")
    if (data === "view") {
      console.log(data, "view_data")
      this.setState({ workflow: true })
      this.setState({
        viewData: this.state.totalData[0].details.find(val => val.id === id)
      })
    }
    else if (data === "edit") {
      this.setState({ editopen: true })
      this.setState({
        editData: this.state.totalData[0].details.find(val => val.id === id)
      })
      console.log(this.state.editData, "dataaa_idd")
    }
    console.log(this.state.viewData, "viewwwww")
  }
  closemodal = () => {
    this.setState({ openview: false, editopen: false, workflow: false });
  };



  closemodal = () => {
    this.setState({ openview: false, editopen: false, deleteopen: false, workflow: false })
  }

  deleteopen = (type, id) => {
    console.log(id, "iddd")
    this.setState({
      deleteopen: true,
      iddata: id
    })
    console.log(id, "type")
  }

  deleterow = () => {
    this.setState({ props_loading: true })

    var self = this
    axios({
      method: 'delete',
      url: apiurl + '/deleteMediaUpload',
      data: {
        "id": this.state.iddata,
      }
    })
      .then(function (response) {
        // alert("Deleted")
        message.error('Media Deleted Successfully');
        self.props.getTableData();
      })
      .catch(function (error) {
      });

    this.setState({ props_loading: false })
  }
  render() {
    const img_var = <ReactSVG src={order} />;
    return (
      <div>
        <Tablecomponent
          heading={[
            //  {id:"order", label:"Order"},
            { id: "", label: "S.No" },
            { id: "title", label: "Media Title" },
            { id: "type", label: "Media Type" },
            { id: "uploaded", label: "Uploaded On" },
            { id: "status", label: "Status" },
            { id: "", label: "Action" },
          ]}

          rowdata={this.state.tableData}
          tableicon_align={"cell_eye"}
          deleteopen={this.deleteopen}
          UploadIcon="close"
          GrandTotal="close"
          modelopen={(e, id) => this.modelopen(e, id)}
        />
        <Modalcomp visible={this.state.workflow} title={"VIEW MEDIA"} viewData={this.state.viewData} closemodal={(e) => this.closemodal(e)}>
          <ViewMedia viewData={this.state.viewData} viewopenModal={this.state.workflow && true} closemodal={this.closemodal} />
        </Modalcomp>
        <Modalcomp visible={this.state.editopen} editData={this.state.editData} title={"EDIT MEDIA UPLOADS"} closemodal={(e) => this.closemodal(e)} >
          <MediaUploadsModal getTableData={() => this.props.getTableData()} closemodal={this.closemodal} editData={this.state.editData} editopenModal={this.state.editopen && true} />
        </Modalcomp>

        <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} xswidth={"xs"}>
          <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
        </Modalcomp>
      </div>
    );
  }
}
export default MediaUploadsTable;