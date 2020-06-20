import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import MediaUploadsModal from "./MediaUploadsModal";
import MediaUploadsTable from "./MediaUploadsTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Paper from "@material-ui/core/Paper";
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
export default class MediaUploadsMaster extends Component {
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
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
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
      
        <MediaUploadsTable />
        </Paper>
        <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"New Media Uploads"}
          >
            <MediaUploadsModal visible={this.state.open}
            closemodal={this.handleClickclose}/>
          </Modalcomp>
        </div>
      </div>
    );
  }
}
