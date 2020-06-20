import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Trainee from '../../Images/11.jpg';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import './popupbox.css'
const styles = {
    
  };
export default class Trainereyeview extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={cancel:null}
  }
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
    render() {
      
          
      const { classes, onClose,cancel, selectedValue, ...other } = this.props;
     
  return (
    <div className="trainee_popup_details">
    <Dialog  onClose={this.handleClose} aria-labelledby="simple-dialog-title"  {...other}>
       <Grid container>
       <Grid item xs={12} md={5}>
         <div className="trainee_image_container"><div className="trainee_image_div"><img  className="trainee_image" src={Trainee}/></div></div>
       </Grid>
            <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
                     <div className="addtrainees_details">
                       <div>
                            <h3>Abdul Khaafid</h3>
                            <div className="age_details"><p>26Years/Male</p><p>76/kgs/5'10"</p><p>AI Jumaira</p></div></div>
                            <div><p className="details_mode">Mode</p><h3>Center</h3> </div>
                       </div>  
                    <Divider/>
                <div className="package_container">
                <div className="package_details_container">
                   <div className="package_details"><div><p>Package</p></div><div><p>:</p></div></div>
                    <div className="package_details_list"><p>Tennis Pro</p></div>
                 </div>  
                </div>


                   <div className="package_container">
                <div className="package_details_container">
                   <div className="package_details"><div><p>Cast</p></div><div><p>:</p></div></div>
                    <div className="package_details_list"><p>230KWD</p></div>
                 </div>  
                </div>


                   <div className="package_container">
                <div className="package_details_container">
                   <div className="package_details"><div><p>Start Date</p></div><div><p>:</p></div></div>
                    <div className="package_details_list"><p>05 Nov 2019</p></div>
                 </div>  
                </div>


                   <div className="package_container">
                <div className="package_details_container">
                   <div className="package_details"><div><p>End Date</p></div><div><p>:</p></div></div>
                    <div className="package_details_list"><p>06 Feb 2010</p></div>
                 </div>  
                </div>
                    <div className="package_cancel_details"><Button className="package-cancel_button"  onClick={this.props.onClose}>Cancel</Button></div>
            </Grid>
       </Grid>
    </Dialog>
    </div>
  );
} 
}
const Trainer_viewWrapped = withStyles(styles)(Trainereyeview);

// export default function SimpleDialogDemo(props) {
//   const [open, setOpen] = React.useState(props);


//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = value => {
//     setOpen(false);
   
//   };

//   return (
//     <div>
    
//       <SimpleDialog  open={open} onClose={handleClose}>
      
//       </SimpleDialog>
//     </div>
//   );
// }
