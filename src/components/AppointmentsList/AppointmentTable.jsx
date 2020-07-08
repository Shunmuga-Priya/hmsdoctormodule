import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ListView from "./ListView";
import "./AppointmentTable.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Moment from "react-moment";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import { Select } from "antd";
import ReactSVG from "react-svg";
import { Input } from "antd";
import apiurl from "../../App";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactExport from 'react-data-export';
import PrintData from "./printdata";
import ReactToPrint from "react-to-print";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


class AppointmentTable extends React.Component {
  state = {
    openview: false,
    appointlistData:[],
    getTableData:[],
    viewdata:[],
    viewdata_values:[],
    Search:null
  };
  // MODEL OPEN FUNC
  modelopen = (data,id) => {
    alert(id)
      if (data === "view") {   
        var viewdata = this.state.viewdata_values.filter((viewdata)=>{
          return viewdata.PatientId===id
       })
    
       console.log(viewdata,"viewDatata")
        this.setState({ 
          openview: true,
          viewdata:viewdata
         });
       
      } 
      console.log( viewdata,"dadadaddaa")
    
    };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
// TABLE DATA API
  getTableData =()=>{
    axios({
      method:"POST",
      url:"http://52.200.251.222:8158/api/v1/patient/gethealthCheckupappointmentlist",
      data:{
        hc_vendorId:"15",
        week:false,
        month:true,
        year:false,
        searchContent:"false",
        name:"",
        date:"",
        limit:10,
        pageno:1
      }
    })
    .then((response)=>{
      console.log(response.data.data[0].details,"res")
      var appointlistData =[];
      response.data.data[0].details.map((val)=>{
        appointlistData.push({customer:val.PatientName,package:val.hc_package_name,date:val.Date,
          time:val.Time,id:val.PatientId
        })
      })
      this.setState({
        appointlistData:appointlistData
      })
    })
  }
  // VIEW API
  viewdata =()=>{
    axios({
      method:"POST",
      url:"http://52.200.251.222:8158/api/v1/patient/viewpatienthealthcheckupappointment",
      data:{
        hc_vendorId:"15",
        patientId:"1"
      }
    })
    .then((response)=>{
      console.log(response.data.data[0],"view_data")
      var viewdata_values =[];
      response.data.data.map((val)=>{
        viewdata_values.push(val)
      })
      this.setState({
        viewdata_values:viewdata_values
      })
      console.log(viewdata_values,"viewdata_values")
    })
  }
// BOTH GET AND VIEW API's
  componentDidMount(){
    this.getTableData()
    this.viewdata()
  }
// Search Onchange Function
  SearchData=(e)=>{
    this.setState({
      Search:e.target.value
    })
    this.setState({})
  }
  generatepdf=()=>{
    const doc = new jsPDF("a3")
    var bodydata  = []
    this.state.viewdata_values.map((data,index)=>{
      console.log(this.state.viewdata_values,"dataaa")
      bodydata.push([index+1,data.PatientName,data.hc_package_name,data.Date,data.Time])
    })
    doc.autoTable({
      beforePageContent: function(data) {
        doc.text("Uploaded Details", 15, 23); // 15,13 for css
        },
      margin: { top: 30 },
      showHead:"everyPage",
      theme:"grid",
      head: [['S.No', 'Customer', 'Package','Date','Time']],
      body:bodydata,
    })
    doc.save('UploadDeatails.pdf') 
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
// SEARCH CONDITIONS
      const AppointlistData = this.state.appointlistData.filter((data)=>{
        console.log(data,"Search_data")
        if(this.state.Search=== null)
           return data

          else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.Search.toLowerCase())
          || (data.package != null && data.package.toLowerCase().includes(this.state.Search.toLowerCase()))
          || (data.time != null && data.time.toLowerCase().includes(this.state.Search.toLowerCase()))
          || (data.date != null && data.date.toLowerCase().includes(this.state.Search.toLowerCase()))
          ) {
            return data
        }   
        console.log(data,"return_value")
      })   
  // EXCEL FUNCTION
      var multiDataSetbody = []
      this.state.viewdata_values.map((xldata,index)=>{
        if(index%2!==0){
          multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
          {value:xldata.PatientName},
          {value:xldata.hc_package_name},
          {value:xldata.Date},
          {value:xldata.Time}])
        }else{
        multiDataSetbody.push([
          {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
          {value:xldata.PatientName,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
          {value:xldata.hc_package_name,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
          {value:xldata.Date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
          {value:xldata.Time,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
         ])
        }
      })
  
      const multiDataSet = [
        {
            columns: [
                {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
                {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
                {title: "Package", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
                {title: "Date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
                {title: "Time", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
  
            ],
            data: multiDataSetbody      
        }
    ];

    return (
      <div>

        <div className="dashboard_header">
          <div className="dashboard_title">APPOINTMENT LIST</div>
          <div
            style={{ fontSize: "14px", display: "flex", alignItems: "center" }}>
  {/* BUTTON GROUP */}
            <ButtonGroup
                className="clinic_group_details"
                size="small"
                aria-label="small outlined button group">
                <Button className="clinic_details">This Week</Button>
                <Button className="clinic_details">This Month</Button>
                <Button className="clinic_details">This Year</Button>
            </ButtonGroup>

            <Moment format="DD-MMM-YYYY" className="mr-5"></Moment>
            <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              onChange ={(e)=>this.SearchData(e)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
        
            <div className="icon_head">
                <ReactSVG    onClick={this.generatepdf}
                src={pdf} 
                style={{ marginRight: "15px", marginLeft: "15px" }}/>
                
                <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                      <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
                  </ExcelFile>

                <ReactToPrint
          trigger={() => <ReactSVG src={print} />}
          content={() => this.componentRef}
        />
           <div style={{ display: "none" }}>
            <PrintData printTableData={this.state.viewdata_values} ref={el => (this.componentRef = el)} /></div>
            </div>
          </div>
        </div>


        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "package", label: "Package" },
            { id: "date", label: "Date" },
            { id: "time", label: "Time" },
            { id: "", label: "Action" },
          ]}
          // rowdata={this.state.appointlistData && this.state.appointlistData} 
          rowdata={AppointlistData.length ===  0 ? []: AppointlistData } 
          DeleteIcon="close"
          EditIcon="close"
          UploadIcon="close"
          GrandTotal="close"
          Workflow="close"
          modelopen={(e,id) => this.modelopen(e,id)}
        />
        <Modalcomp visible={this.state.openview}   closemodal={e => this.closemodal(e)} xswidth={"xs"}>
              <ListView open={this.state.openview}  viewdata={this.state.viewdata}  onClose={this.closemodal} />
        </Modalcomp>
{/*     

        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e) => this.closemodal(e)} xswidth={"xs"}
        ></Modalcomp> */}
      </div>
    );
  }
}

export default AppointmentTable;

