// import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
// import { Paper } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// // import Stepper from "../AdvertisementBooking/Stepper";
// import Stepper from "../StepperStatus/Stepper";
// import Workflow from "../../Images/workflow.svg";
// import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import DeleteMedia from "./DeleteMedia";
// import { apiurl } from "../../App";
// import axios from 'axios';
// import "./DealList.css";

// var moment = require('moment');

// export default class DealList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//      name: "",
//      open: false,
//      openstepper:[],
//      dyndeallist:[],
//      dyndealAlllist:[], 
//     };
//   }

//   handleOpen = (id) => {
//     this.setState({ open: true,currentDeleteId:id });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   componentDidMount(){
//     this.getlistdata()
//   }
//   componentWillReceiveProps(){
//     if(this.props.afteredit){
//     this.getlistdata()
//     }
//   }
  
//   // GET  FUNCTION
//   =()=>{
//     var self = this
//     axios({
//         method: 'POST',
//         url: apiurl + "Common/getsingle_deals",
//         data:{
//           "vendor_id":"2", 
//           "limit":10, 
//           "pageno":1
//         } 
//     })
//     .then((response) => {
//       console.log(response.data.data,"response_data")
//       var dyndeallist= []
//       var dyndealAlllist= []

//       response.data.data[0].details.map((listdata)=>{
//         dyndealAlllist.push(listdata)
//         dyndeallist.push(
//           <>
//                     <Grid item xs={12} md={12}>
//               <Paper style={{ marginBottom: "10px" }}>
//                 <div className="aligndeallistdata">
//                   <div>
//                     <span>Service Type</span>
//                     <div>{listdata.deal_service_type_id.includes(",")?"ALL":listdata.deal_service_type_id}</div>
//                   </div>
//                   <div>
//                     <span> Start Date</span>
//                     <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
//                   </div>
//                   <div>
//                     <span>End Date</span>
//                     <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
//                   </div>
//                   <div>
//                     <span>Amount</span>
//                     <div>{listdata.deal_amount}</div>
//                   </div>
//                 </div>
//                 <div className="aligndeallistdataRow2">
//                   <div className={"listTitleWidth"}>
//                     <span>Title</span>
//                 <div>{listdata.deal_title}</div>
//                   </div>
//                   <div>
//                     <span>Deal</span>
//                 <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
//                   </div>
//                 </div>
//                 <div className="iconsdiv">
//                   <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} />
//                   <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
//                   <DeleteIcon
//                     className="delete_icon_div"
//                     onClick={()=>this.handleOpen(listdata.id)}
//                   />
//                 </div>
//                 <div>
//                 {this.state.openstepper.includes(listdata.id) && <Stepper /> }
//                 </div>
  
//               </Paper>
  
//             </Grid>
//           </>
//         )
//       })

//       self.setState({dyndeallist:dyndeallist,dyndealAlllist:dyndealAlllist})
      
//     })
//   }

//   openstepper = (id) => {

//     if(this.state.openstepper.find((removeid)=>{return removeid===id})){
//       this.state.openstepper.splice(this.state.openstepper.findIndex((findindex)=>{return findindex===id}),1)
//       this.recallForOpen()
//     }else{
//       this.state.openstepper.push(id)
//       this.recallForOpen()
//     }
//     this.setState({})

//   }

//   recallForOpen=()=>{
//     var dyndeallist= []

//     this.state.dyndealAlllist.map((listdata)=>{
//       dyndeallist.push(
//         <>
//                   <Grid item xs={12} md={12}>
//             <Paper style={{ marginBottom: "10px" }}>
//               <div className="aligndeallistdata">
//                 <div >
//                   <span>Service Type</span>
//                   <div>{listdata.deal_service_type_id.includes(",")?"ALL":listdata.deal_service_type_id}</div>
//                 </div>
//                 <div>
//                   <span> Start Date</span>
//                   <div>{moment(listdata.deal_valid_from).format('DD-MM-YYYY')}</div>
//                 </div>
//                 <div>
//                   <span>End Date</span>
//                   <div>{moment(listdata.deal_valid_to).format('DD-MM-YYYY')}</div>
//                 </div>
//                 <div>
//                   <span>Amount</span>
//                   <div>{listdata.deal_amount}</div>
//                 </div>
//               </div>
//               <div className="aligndeallistdataRow2">
//                 <div className={"listTitleWidth"}>
//                   <span>Title</span>
//               <div>{listdata.deal_title}</div>
//                 </div>
//                 <div>
//                   <span>Deal</span>
//               <div className="view">{listdata.deal_active==1?"Active":"Inactive"}</div>
//                 </div>
//               </div>
//               <div className="iconsdiv">
//                 <img src={Workflow} alt="error" onClick={()=>this.openstepper(listdata.id)} />
//                 <EditIcon className="edit_icon_div" onClick={()=>this.props.changeTab(listdata)}/>
//                 <DeleteIcon
//                   className="delete_icon_div"
//                   onClick={()=>this.handleOpen(listdata.id)}
//                 />
//               </div>
//               <div>
//               {this.state.openstepper.includes(listdata.id) && <Stepper /> }
//               </div>

//             </Paper>

//           </Grid>
//         </>
//       )
//     })

//     this.setState({dyndeallist:dyndeallist})
    
//   }

//   // DELETE FUNCTION
//   deleteDealLIst=()=>{
//     var self=this
//     axios({
//       method:'DELETE',
//       url: apiurl+'/deleteDeals',
//       data:{
//         "id":this.state.currentDeleteId
//       }
//     })
//     .then((response)=>{
//       self.setState({open: false})
//       self.getlistdata()
//     })
//   }

//   render() {
//     console.log(this.state.openstepper,"openstepper")

//     return (
//       <div className="deal_list_paper_maincontainer">
//         <Grid container>
//       {this.state.dyndeallist}
//         </Grid>
//         <Modalcomp
//           xswidth={"xs"}
//           clrchange="textclr"
//           title="Delete Media"
//           visible={this.state.open}
//           closemodal={this.handleClose}
//         >
//           <DeleteMedia deleteitem={this.deleteDealLIst} closeDeleteModel={this.handleClose}/>
//         </Modalcomp>
//       </div>
//     );
//   }
// }


// Arjun code
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import "./DealList.css";
import { Progress } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Stepper from "../StepperStatus/Stepper";
import Workflow from "../../Images//workflow.svg";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DeleteMedia from "./DeleteMedia";
import dateFormat from "dateformat";
import { Tabs } from "antd";
const data = [{ month: "Jan.", count: 69, city: "tokyo" }];
const scale = {
  month: { alias: "Month" },
  count: { alias: "Sales" },
};
export default class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", dealsList: [], open: false, del_id: "" };
  }
  handleOpen = (data) => {
    this.setState({ open: true, del_id: data });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillMount() {
    this.props.getDealsList();
  }
  render() {
    const { TabPane } = Tabs;
    return (
      <div>
        <div className="deal_list_paper_maincontainer">
          <Grid container>
            <Grid item xs={12} md={12}>
              {this.props.dealsList &&
                this.props.dealsList.length > 0 &&
                this.props.dealsList.map((val) => {
                  console.log("sdfkjsdhfjsdhfjshfjsdf", val);
                  return (
                    <Paper style={{ marginBottom: "3px" }}>
                      <Grid container>
                        <Grid item xs={12} md={12}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px",
                            }}
                          >
                            <div>
                              <b>Service Type</b>
                              <div>All</div>
                            </div>
                            <div>
                              <b> Start Date</b>
                              <div>
                                {dateFormat(val.deal_valid_from, "dd mmm yyyy")}
                              </div>
                            </div>
                            <div>
                              <b>End Date</b>
                              <div>
                                {dateFormat(val.deal_valid_to, "dd mmm yyyy")}
                              </div>
                            </div>
                            <div>
                              <b>Amount</b>
                              <div>
                                {" "}
                                {/* {val.deal_options === "Amount"
                                  ? Amount: ${val.deal_amount} KWD
                                  : Percentage: ${val.dealAmount} %} */}
                                  {val.deal_options === "Amount" ?  val.deal_amount + "KWD" : val.dealAmount + "%"}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: "flex", padding: "10px" }}>
                            <div style={{ marginRight: "5px" }}>
                              <b style={{ marginRight: "20px" }}>
                                {val.deal_title}
                              </b>
                              {/* <div>Flat 30 KWD off</div> */}
                            </div>
                            <div>
                              <b>Deal</b>
                              <div className="view">
                                {val.deal_active === 1
                                  ? "Active"
                                  : "Not Active"}
                              </div>
                            </div>
                          </div>
                          <div className="iconsdiv">
                            <img src={Workflow} alt="error" />
                            <EditIcon
                              className="edit_icon_div"
                              onClick={() => this.props.changeTab(val)}
                            />
                            <DeleteIcon
                              className="delete_icon_div"
                              onClick={() => this.handleOpen(val.id)}
                            />
                          </div>
                          <div>
                            <Stepper />
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })}
            </Grid>
          </Grid>
          <Modalcomp
            xswidth={"xs"}
            clrchange="textclr"
            title="Delete Media"
            visible={this.state.open}
            closemodal={this.handleClose}
          >
            <DeleteMedia
              delid={this.state.del_id}
              getDealsList={this.props.getDealsList}
              closemodal={this.handleClose}
              listName="deals"
              apiendpoint="deleteDeals"
            />
          </Modalcomp>
        </div>
      </div>
    );
  }
}