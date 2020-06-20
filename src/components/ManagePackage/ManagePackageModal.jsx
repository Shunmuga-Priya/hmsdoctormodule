import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ManagePackageModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Upload } from "antd";
import { Tag } from "antd";
import AddIcon from "@material-ui/icons/Add";
export default class ManagePackageMaster extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  log = e => {
    console.log(e);
  };

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} className="package_container">
                <Labelbox type="text" labelname="Package Name" />
                <Labelbox type="textarea" labelname="Description1" />
              </Grid>
              <Grid item xs={12} md={6} className="package_container">
                <Labelbox type="text" labelname="Package Fee(KWD)" />
                <Labelbox type="textarea" labelname="Description2" />
              </Grid>
              <div className="instruction_area">
                <Labelbox type="textarea" labelname="Instruction" />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} className="package_containerthird">
            <div className="add_test_container">
              <div className="add_div">
                <div className="add_test">
                  <Labelbox type="text" labelname="Add Test" />
                </div>
                <AddIcon className="test_add" />
              </div>
              <div>
                <Tag closable onClose={this.log}>
                  Ehocardiogram
                </Tag>
              </div>
            </div>
          </Grid>
          <div className="clinicbutton-container">
            <Button className="clinicCancel">Cancel</Button>
            <Button
              className="clinicSubmit"
              onClick={() => this.props.closemodal(false)}
            >
              Submit
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}
