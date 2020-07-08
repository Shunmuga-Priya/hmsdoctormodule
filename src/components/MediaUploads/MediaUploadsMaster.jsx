import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import MediaUploadsModal from "./MediaUploadsModal";
import MediaUploadsTable from "./MediaUploadsTable";
import { Input, Select, Icon, message } from 'antd';
import dateFormat from 'dateformat';
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import { apiurl } from "../../App";

export default class MediaUploadsMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tableData:[]
    };
  }

  componentWillMount(){
    this.getTableData();
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  // get table data
  getTableData = () => {
    var self = this
    axios({
      method: 'POST', //get api
      url: apiurl + '/mediauploaddetails',
      data: {
        doctorid: 2,
        limit: 100,
        offset: 1,
        pageno: 1
      }
    })

      .then((response) => {
        console.log(response.data.data[0].details, "res")
        // alert("get")
        var tableData = [];
        response.data.data[0].details.map((val) => {
          tableData.push({
            title: val.media_title, type: val.media_type, uploaded: dateFormat(val.created_on, "dd mmm yyyy"), status: val.is_active,
            id: val.id
          })
          console.log(val.id, "yyyyyyy")
        })
        self.setState({
          tableData: tableData,
          props_loading: false,
          totalData: response.data.data
        })
        self.setState({})
      })
      .catch((error) => {
        alert(JSON.stringify(error))
      })
  }

  render() {
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"))
    return (
      <div >
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">MEDIA UPLOADS</div>
            <img
              className="plus-icon"
              src={plus}
              className="mr-4 ml-7"
              style={{ width: 40 }}
              onClick={this.handleClickopen}
            />
          </div>

          <MediaUploadsTable tableData={this.state.tableData} totalData={this.state.totalData} getTableData={()=>this.getTableData()} />
        </Paper>
        <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"New Media Uploads"}
          >
            <MediaUploadsModal
              visible={this.state.open}
              closemodal={this.handleClickclose}
              getTableData={()=>this.getTableData()}
            />
          </Modalcomp>
        </div>
      </div>
    );
  }
}
