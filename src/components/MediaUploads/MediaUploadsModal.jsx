import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './MediaUploadsModal.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Upload } from 'antd';
import { FiInfo } from "react-icons/fi";
import uploadimage from '../../Images/upload-button.png'
import Modalcomp from '../../helpers/ModalComp/Modalcomp';
import UploadMedia from './UploadMedia';
import axios from 'axios';
import { message } from 'antd';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import ValidationLibrary from "../../helpers/ValidationLibrary/validationfunction";

export default class MediaUploadsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fileUrl: "",
      mediaupload_hc: {
        'media_title': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
        'media_description': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null,
        },
      },
      'mediaupload_active': false,
      'upload_browser': {},
    }
  }


  componentDidMount() {
    console.log(this.props,"asdfjklasdfjaskldj")
    const { editData, editopenModal } = this.props;
    console.log(editData, "edit_da")
    if (editopenModal === true) {
      this.state.editId = editData.id
      this.state.mediaupload_hc.media_title.value = editData.media_title
      this.state.media_filename = editData.media_filename
      this.state.mediaupload_hc.media_description.value = editData.media_description
      this.state.mediaupload_active = editData.is_active === 1 ? true : false
    }
    this.setState({})
    console.log(this.state.media_filename, "media_filename")
  }



  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  changeDynamic = (data, key) => {
    var mediaupload_hc = this.state.mediaupload_hc;
    var errorcheck = ValidationLibrary.checkValidation(data, mediaupload_hc[key].validation);
    mediaupload_hc[key].value = data;
    mediaupload_hc[key].error = !errorcheck.state;
    mediaupload_hc[key].errmsg = errorcheck.msg;
    this.setState({ mediaupload_hc });
  }
  // VALIDATION
  checkValidation = () => {
    var mediaupload_hc = this.state.mediaupload_hc;
    var medicineKeys = Object.keys(mediaupload_hc);
    // console.log(medicineKeys);
    for (var i in medicineKeys) {
      var errorcheck = ValidationLibrary.checkValidation(mediaupload_hc[medicineKeys[i]].value, mediaupload_hc[medicineKeys[i]].validation);
      // console.log(errorcheck);
      mediaupload_hc[medicineKeys[i]].error = !errorcheck.state;
      mediaupload_hc[medicineKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = medicineKeys.filter((obj) =>
      mediaupload_hc[obj].error == true);
    // console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.onSubmitData()
    }
    this.setState({ mediaupload_hc })
  }

  onSubmitData = () => {
    this.mediaUploadFormData()
    // if (this.props.editopenModal != true) {
    //   this.mediaUploadFormData()   // Insert and update with image Api Call
    // } else {
    //   this.mediaUploadData()   // Update without image Api Call
    // }
    this.props.closemodal()
  }

  mediaUploadFormData = () => {
    console.log("Checking FIle Url",this.state.fileUrl)
    var formData = new FormData();
    formData.append('imageArray', this.state.fileUrl)
    formData.set("mediatype", this.props.editopenModal === true ? this.props.editData.media_type : this.state.fileType.split("/")[0]);
    formData.set("mediasortorder", 1)
    formData.set("mediavendorId", 2)
    formData.set("activeflag", 1)
    formData.set("createdby", 1)
    formData.set("created_on", dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"))
    formData.set("modifiedby", 1)
    formData.set("modifiedon", 1)
    formData.set("ipaddress", "192.144.23")
    formData.set("mediatitle", this.state.mediaupload_hc.media_title.value)
    formData.set("mediadescription", this.state.mediaupload_hc.media_description.value)
    formData.set("isactive", this.state.mediaupload_active == true ? 1 : 0)

    if(this.props.editopenModal != true){
      this.mediaupload_hcAddApi(formData) // Add Api
    }

    if(this.props.editopenModal === true && this.state.fileUrl !== ""){
      formData.set("id", this.props.editData.id)
      this.mediaupload_hcUpdateApi(formData)  // Update Api with image Call
    }
    if(this.props.editopenModal === true && this.state.fileUrl === ""){
      this.mediaUploadData()
    }
  }

  mediaUploadData = () => {
    var mediaUploadData={
      id:this.props.editData.id,
      imageArray:"",
      mediatype:this.props.editData.media_type,
      mediasortorder:1,
      mediavendorId:2,
      activeflag:1,
      createdby:1,
      created_on:dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"),
      modifiedby:1,
      modifiedon:1,
      ipaddress:"192.144.23",
      mediatitle:this.state.mediaupload_hc.media_title.value,
      mediadescription:this.state.mediaupload_hc.media_description.value,
      isactive:this.state.mediaupload_active == true ? 1 : 0
    }
    this.mediaupload_hcUpdateApi(mediaUploadData) // Update Api without image Call
  }

  // POST API FOR ADD MEDIA
  mediaupload_hcAddApi = (formData) => {
    var self=this
    axios({
      method: 'POST',
      url: apiurl + '/insertMediaUpload',
      data:
      formData
    }).then((response) => {
        console.log(response, "post_check_response")
        message.success('Media Uploaded Successfully');
        self.props.getTableData();
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
      // this.props.getTableData(); //Props from MediaUploadsMaster.jsx
  }
  // for put api
  mediaupload_hcUpdateApi = (mediaUploadData) => {
    var self=this
    axios({
      method: 'PUT',
      url: apiurl + '/editMediaUpload',
      data:
      mediaUploadData
    })
      .then((response) => {
        console.log(response, "response_checkingg")
        message.success('Media Updated Successfully');
        self.props.getTableData();
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
      // this.props.getTableData(); // Props from MediaUploadsMaster.jsx

  }
  
  // For checkbox api 
  dealActiveCheck = (e) => {
    // console.log(e.target.checked, "mediaupload_checkbox")
    this.setState({
      mediaupload_active: e.target.checked
    })
  }
  // for upload broswer
  handleChange = (e) => {
    console.log("sdfjsdhfjdshflsdf", e.target.files[0])
    this.setState({
      file: e.target.files[0]
    })
  };
  uploadFile = (e) => {
    
    console.log("sdfjsdhfjdshflsdf", e.target.files[0])
    var fileUrl=e.target.files[0];
    // fileUrl.name=e.target.files[0].name.split(" ").join('_')
    console.log("sdfjsdhfjdshflsdf", fileUrl)

    // fileUrl.name=e.target.files[0].name.split(" ").join('_')
    this.setState({
      fileUrl: e.target.files[0],
      fileType:e.target.files[0].type

    })
  }
  render() {
    console.log(this.state.fileUrl, "statevalue")
    return (
      <>
        <div className={`lab_mediauploads ${this.state.open === true && "d-none"}`}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className="media_title_head">
                <Labelbox
                  type="text"
                  labelname="Media Title"
                  changeData={(data) => this.changeDynamic(data, 'media_title')}
                  value={this.state.mediaupload_hc.media_title.value}
                  error={this.state.mediaupload_hc.media_title.error}
                  errmsg={this.state.mediaupload_hc.media_title.errmsg} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="clinicmedia_upload">Upload<span><FiInfo className="info_icon" onClick={this.handleOpen} /></span></div>
              <div className="labupload_container">
              </div>
              <input type="file" className="" onChange={this.uploadFile} />
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="labmedia_checkbox">
                <Labelbox
                  type="textarea"
                  labelname="Description"
                  changeData={(data) => this.changeDynamic(data, 'media_description')}
                  value={this.state.mediaupload_hc.media_description.value}
                  error={this.state.mediaupload_hc.media_description.error}
                  errmsg={this.state.mediaupload_hc.media_description.errmsg} />
              </div>
              <div className="media_checkbox_container"><Checkbox checked={this.state.mediaupload_active} onChange={(e) => this.dealActiveCheck(e)} /><span className="lab_active">Active</span></div>
              <div className="labmediabutton-container"><Button className="lab_Upload">Cancel</Button><Button className="labcancel-form" onClick={this.checkValidation}>
                {this.props.editopenModal === true ? "update" : "upload"}
              </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <Modalcomp clrgreen title="Upload Instructions" visible={this.state.open} closemodal={this.handleClose}>
          <UploadMedia />
        </Modalcomp>
      </>
    )
  }
}