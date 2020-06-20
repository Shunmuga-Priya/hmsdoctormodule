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
import {message } from 'antd';
import { apiurl } from "../../App";
import dateformat from 'dateformat';
import ValidationLibrary from "../../helpers/ValidationLibrary/validationfunction";
var fileListData=[];

// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     alert("file")
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList,"fileeeeeeee");
//     }
//     if (info.file.status === 'done') {
//       console.log("asdfjkasdfjsd",info.fileList)
//       message.success(`${info.file.name} file uploaded successfully`);
//       fileListData=info.fileList;
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   progress: {
//     strokeColor: {
//       '0%': '#108EE9',
//       '100%': '#87D068',
//     },
//     strokeWidth: 3,
//     format: percent => `${parseFloat(percent.toFixed(2))}%`,
//   },
// };

export default class MediaUploadsModal extends Component {
    constructor(props){
        super(props)
        this.state={
          fileList:[],
          // selectedFile: "",
          file:[],
            open:false,
            imageurl:"",
            mediaupload_hc: {
              'media_title': {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
              'media_description':{
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null,
              },
      },
      'mediaupload_active':false,
      'upload_browser':{},
}
}
    handleOpen=()=>
    {
        this.setState({open:true})
    }
    handleClose=()=>
    {
        this.setState({open:false})
    }

    changeDynamic = (data, key) => {
      if (key === 'profile_pic') {
        this.handleChange(data)
    }
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
      var mediaupload_hcApiData = {
  
        // mediatype:"image",
        // mediasortorder:1,
        // mediavendorId:2,
        // activeflag:1,
        // createdby:1,
        // created_on: dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"),
        // modifiedby:1,
        // modifiedon:1,
        // ipaddress:"192.144.23",
        // mediatitle: this.state.mediaupload_hc.media_title.value,
        // mediadescription:this.state.mediaupload_hc.media_description.value,
        // imageArray:this.state.imageurl,
        // isactive:this.state.mediaupload_active == true ? 1:0

        mediatype:"image",
        mediasortorder:1,
        mediavendorId:2,
        activeflag:1,
        createdby:1,
        created_on: dateformat(new Date(), "yyyy-mm-dd hh:MM:ss"),
        modifiedby:1,
        modifiedon:1,
        ipaddress:"192.144.23",
        mediatitle: this.state.mediaupload_hc.media_title.value,
        mediadescription:this.state.mediaupload_hc.media_description.value,
        imageArray:this.state.imageurl,
        // imageArray:this.state.selectedFile,
        isactive:this.state.mediaupload_active == true ? 1:0
      }
      if(this.props.editData){
        this.mediauploadUpload_Api(mediaupload_hcApiData)   // Update Api Call
      }else{
        this.mediaupload_hcAddApi(mediaupload_hcApiData)   // Insert Api Call
      }
      this.props.closemodal()
    }

    // POST API FOR ADD MEDIA
    mediaupload_hcAddApi = (mediaupload_hcApiData) => {
      axios({
        method: 'POST',
        url: apiurl + '/insertMediaUpload',
        data: {
          ...mediaupload_hcApiData
        }
      })
      .then((response) => {
        console.log(response)
        this.props.getTableData()
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }

    mediauploadUpload_Api =(mediaupload_hcApiData)=>{
      axios({
        method:'PUT',
        url:apiurl+'/editMediaUpload',
        data:{
          id:this.props.editData.id,
          ...mediaupload_hcApiData
        }
      })
      .then((response) => {
        console.log(response)
        this.props.getTableData()
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }

    componentDidMount(){
      alert("editdtata")
      const {editData, editopenModal} = this.props
      console.log(editData,"oiuytr")
      if(editopenModal === true){
        this.state.editId= editData.id
        this.state.mediaupload_hc.media_title.value = editData.media_title
        this.state.mediaupload_hc.media_description.value = editData.media_description
        this.state.mediaupload_active = editData.is_active === 1 ? true : false
      }

      this.setState({})
}

  

  // For checkbox api 
  dealActiveCheck = (e) => {
    // console.log(e.target.checked, "mediaupload_checkbox")
    this.setState({
      mediaupload_active: e.target.checked
    })
  }

  // for upload broswer
  handleChange = info => {
    alert("ranjith")
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList,"infoupload");
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  };
    uploadFile=(e)=>{
      let files = e.target.files
      let reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload=(e)=>{
        console.log(e.target.result,"imgurlresult")
        this.setState({imageurl:e.target.result})
      }
    }
    // FILE CHANGE FUNCTION

    // onFileChange = (e) => {
    //   alert("uploads")
    //   console.log("sdfjsdhfjdshflsdf",e.target.files[0])
    //   this.setState({
    //     file:e.target.files[0]
    //   })
    // }

    render() {

      // const {viewData ,viewopenMod/al} =this.props
  
      console.log(this.state.mediaupload_hc.media_description.value,"dateeee")
      console.log(this.state,"statevalue")
      
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        headers: {
          authorization: 'authorization-text',
        },
    }
        return (
            <>
            <div className={`lab_mediauploads ${this.state.open === true && "d-none"}`}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
             <div className="media_title_head">
                 <Labelbox
                 type="text" 
                 labelname="Media Title"
                 changeData={(data) => this.changeDynamic(data,'media_title')}
                 value={this.state.mediaupload_hc.media_title.value}
                 error={this.state.mediaupload_hc.media_title.error}
                 errmsg={this.state.mediaupload_hc.media_title.errmsg}/>
            </div>
             </Grid>
             <Grid item xs={12} md={6}>
             <div className="clinicmedia_upload">Upload<span><FiInfo className="info_icon" onClick={this.handleOpen}/></span></div>
             {/* <div className="labupload_container">
               <Upload {...props} className="upload-field"> 
             <div className="labmedia_button"> <Button className="clinicButton-container">
             Browse File<div className="uploadimage-container">
               <img className="uploadimage" src={uploadimage}/>
               </div>
             </Button>
             </div>
             </Upload>
             </div> */}
             <input  type="file" className="" onChange={(e)=>this.uploadFile(e)}  />
         </Grid>
         <Grid item xs={12} md={12}>
         <div className="labmedia_checkbox">
           <Labelbox
            type="textarea"
             labelname="Description"
             changeData={(data) => this.changeDynamic(data,'media_description')}
             value={this.state.mediaupload_hc.media_description.value}
             error={this.state.mediaupload_hc.media_description.error}
             errmsg={this.state.mediaupload_hc.media_description.errmsg}/>
             </div>
         <div className="media_checkbox_container"><Checkbox checked = {this.state.mediaupload_active} onChange={(e) => this.dealActiveCheck(e)}/><span className="lab_active">Active</span></div>
        <div className="labmediabutton-container">
          <Button className="lab_Upload">Cancel</Button>
          <Button className="labcancel-form"  onClick={this.checkValidation}>
          {
            this.props.editopenModal ===  true ? "Update" : "Upload"
          }
        </Button></div>
        </Grid> 
           </Grid>
           </div>
         <Modalcomp clrgreen title="Upload Instructions" visible={this.state.open} closemodal={this.handleClose}>
             <UploadMedia/>
         </Modalcomp>
         </>
        )
    }
}



