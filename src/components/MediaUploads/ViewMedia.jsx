// import React, { Component } from 'react'
// import Grid from '@material-ui/core/Grid'
// import Labelbox from '../../helpers/labelbox/labelbox'
// import Button from '@material-ui/core/Button';
// import Dialog from "@material-ui/core/Dialog";
// import './ViewMedia.css'
// import Profile from '../../Images/11.jpg' ;
// import CloseIcon from '@material-ui/icons/Close';
// const styles = {};
// export default class ViewMedia extends Component {
//     render() {
//         const styles = "";
//         const { classes, onClose, cancel, selectedValue, ...other } = this.props;

//         return (
//             <>

//             {/* <Dialog
//             onClose={this.handleClose}
//             aria-labelledby="simple-dialog-title"
//             {...other}
//             className="profile_modal"
//             > */}
//             {/* <CloseIcon className="on_close" onClick={this.props.onClose}/> */}
//             <div>
//                 <Grid container>
//                     <Grid item xs={12} md={6} className="media_title_container">
//                     <Labelbox type="text" labelname="Media Title" />
//                     <p className="media_active">Active</p>
//                     </Grid>
//                     <Grid item xs={12} md={6} style={{display:"flex",justifyContent:"flex-end"}}>
//                     <div className="mediauploads_img_edit">
//                     <img src={Profile} className="view_media_img"/>
//                     </div>
//                     </Grid>
//                 </Grid>
//             </div>
//             {/* </Dialog> */}
//             </>
//         )
//     }
// }

import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ViewMedia.css";
import uploadimage from "../../Images/upload-button.png";
import View from "../../Images/11.jpg";
import Stepper from "../AdvertisementBooking/Stepper";
// import { Player } from 'video-react';

export default class ViewMedia extends Component {
  state={
    type:""
  }
  render() {
    const {viewData,viewopenModal} = this.props
    console.log(viewData,"viewwww_datattata")
     return (
      <div>
        {/* {" "} */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
         <div style={{ fontSize: "14px" }}>{this.props.viewData.media_title}</div>
         <p className="media_active">
           {this.props.viewData.is_active == 1 ?"Active" : "Non Active"}
           </p>
        </div>
        <Grid container>
          <Grid item xs={12} md={6} className="media_title_container">
            <div className="profile_media_div">
              {/* <img src={View} className="diet_profile_media" /> */}
              {/* <img src={this.props.viewData.media_filename} className="img_uploader_edit" /> */}
           
              <video src = {this.props.viewData.media_filename} type="video/mp4" controls className="img_uploader_edit"/>
              
              {/* <img src={this.props.viewData.media_filename} className="img_uploader_edit" />  */}
    

            </div>
          </Grid>
          <Grid item xs={12} md={6} className="media_title_container">
            <Stepper />
          </Grid>
        </Grid>
      </div>
    );
  }
}
