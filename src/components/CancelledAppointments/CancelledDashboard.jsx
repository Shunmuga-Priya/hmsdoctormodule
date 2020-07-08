import React, { Component } from "react";
import CancelledTable from "./CancelledTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input, Select, Icon } from "antd";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import dateFormat from "dateformat";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactExport from 'react-data-export';
import { MdFormatListBulleted } from "react-icons/md";
import PrintData from "./printdata";
import ReactToPrint from "react-to-print";

const current_date = dateFormat(new Date(), "dd mmm yyyy");
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class CancelledDashboard extends Component {
  constructor(props){
    super(props)
    this.state=
      {
      WeekData:[],props_loading:true,
      wk_mh_yr_Data:[],
      yearData:[],
      weekenable:true,
      monthenable:false,
      yearenable:false,
      CurrentData:3
    }
  }
  DayDataApi=()=>{
    var self = this
    axios({
        method: 'POST',
        url: 'http://52.200.251.222:8158/api/v1/patient/gethealthcheckupcancelledappointment',
        data:{
          "hc_vendorId":"15",
          "week":false,
          "month":false,
          "year":false,
          "searchContent":"false",
          "name":"",
          "date":this.state.CurrentData,
          "limit":10,
          "pageno":1
        }
    }).then((response) => {
      var  wk_mh_yr_Data=[]
      console.log(response,"canceldata")
        response.data.data[0].details.map((val) => {
          wk_mh_yr_Data.push({CustomerName:val.PatientName,Packagename:val.hc_package_name,Date:dateFormat(val.Date,"dd mmm yyyy"),CancelDate: dateFormat(val.CancelDate,"dd mmm yyyy"),Time:val.CancelTime,id:val.Hc_packageId})
        })
        self.setState({
          wk_mh_yr_Data,
          props_loading: false,
            // TotalData:response.data.data[0].details
        })
      
    }).catch((error) => {
        alert(JSON.stringify(error))
    })
  }
  WeekDataApi=()=>{
    var self = this
    axios({
        method: 'POST',
        url: 'http://52.200.251.222:8158/api/v1/patient/gethealthcheckupcancelledappointment',
        data:{
          "hc_vendorId":"15",
          "week":true,
          "month":false,
          "year":false,
          "searchContent":"false",
          "name":"",
          "date":"",
          "limit":10,
          "pageno":1
        }
    }).then((response) => {
      var  wk_mh_yr_Data=[]
      console.log(response,"weekdata")
        response.data.data[0].details.map((val) => {
          wk_mh_yr_Data.push({CustomerName:val.PatientName,Packagename:val.hc_package_name,Date:dateFormat(val.Date,"dd mmm yyyy"),CancelDate: dateFormat(val.CancelDate,"dd mmm yyyy"),Time:val.CancelTime,id:val.Hc_packageId})
        })
        self.setState({
          wk_mh_yr_Data,
          props_loading: false,
         
            // TotalData:response.data.data[0].details
        })
      
    }).catch((error) => {
        alert(JSON.stringify(error))
    })

}
MonthDataApi=()=>{
    var self = this
    axios({
        method: 'POST',
        url: 'http://52.200.251.222:8158/api/v1/patient/gethealthcheckupcancelledappointment',
        data:{
          "hc_vendorId":"15",
          "week":false,
          "month":true,
          "year":false,
          "searchContent":"false",
          "name":"",
          "date":"",
          "limit":10,
          "pageno":1
        }
    }).then((response) => {
      var  wk_mh_yr_Data=[]
        response.data.data[0].details.map((val) => {
          wk_mh_yr_Data.push({CustomerName:val.PatientName,Packagename:val.hc_package_name,Date:dateFormat(val.Date,"dd mmm yyyy"),CancelDate: dateFormat(val.CancelDate,"dd mmm yyyy"),Time:val.CancelTime,id:val.Hc_packageId})
        })
        self.setState({
          wk_mh_yr_Data,
          props_loading: false,
         
            // TotalData:response.data.data[0].details
        })
      
    }).catch((error) => {
        alert(JSON.stringify(error))
    })
}
yearDataApi=()=>{
  var self = this
  axios({
      method: 'POST',
      url: 'http://52.200.251.222:8158/api/v1/patient/gethealthcheckupcancelledappointment',
      data:{
        "hc_vendorId":"15",
        "week":false,
        "month":false,
        "year":true,
        "searchContent":"false",
        "name":"",
        "date":"",
        "limit":10,
        "pageno":1
      }
  }).then((response) => {
    var  wk_mh_yr_Data=[]
      response.data.data[0].details.map((val) => {
        wk_mh_yr_Data.push({CustomerName:val.PatientName,Packagename:val.hc_package_name,Date:dateFormat(val.Date,"dd mmm yyyy"),CancelDate: dateFormat(val.CancelDate,"dd mmm yyyy"),Time:val.CancelTime,id:val.Hc_packageId})
      })
      self.setState({
        wk_mh_yr_Data,
        props_loading: false,
      })
    
  }).catch((error) => {
      alert(JSON.stringify(error))
  })
}

generatepdf=()=>{
  alert("data")
  const doc = new jsPDF("a3")
  var bodydata  = []
  this.state.wk_mh_yr_Data.map((data,index)=>{
    console.log(data,"dataaa")
    bodydata.push([index+1,data.CustomerName,data.Packagename,data.Date,data.CancelDate,data.Time])
  })
  doc.autoTable({
    beforePageContent: function(data) {
      doc.text("Uploaded Details", 15, 23); // 15,13 for css
      },
    margin: { top: 30 },
    showHead:"everyPage",
    theme:"grid",
    head: [['S.No', 'Customer', 'Package','Booked Date','Cancelled Date','Time']],
    body:bodydata,
  })
  doc.save('UploadDeatails.pdf') 
}

  render() {
    const { Option } = Select;
    const { Search } = Input;

    var multiDataSetbody = []
    this.state.wk_mh_yr_Data.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.CustomerName},
        {value:xldata.Packagename},
        {value:xldata.Date},
        {value:xldata.CancelDate},
        {value:xldata.Time}])
      }
      else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.CustomerName,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.Packagename,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.Date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.CancelDate,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
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
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">CANCELLED APPOINTMENTS</div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <ButtonGroup
                className="clinic_group_details"
                size="small"
                aria-label="small outlined button group"
              >
                <Button className="clinic_details" onClick={this.WeekDataApi}>This Week</Button>
                <Button className="clinic_details" onClick={this.MonthDataApi}>This Month</Button>
                <Button className="clinic_details" onClick={this.yearDataApi}>This Year</Button>
              </ButtonGroup>

              <Moment format="DD-MMM-YYYY" className="mr-5"></Moment>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{ width: 150 }}
                className="mr-2 ml-2"
              />
              <div className="icon_head">
                  <ReactSVG   
                    onClick={this.generatepdf}
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
                    <PrintData printTableData={this.state.wk_mh_yr_Data} ref={el => (this.componentRef = el)} />
                  </div>
              </div>
            </div>
          </div>
          <CancelledTable 
          wk_mh_yr_Data={this.state.wk_mh_yr_Data}
          props_loading={this.state.props_loading}
          monthData={this.state.monthData}
          yearData={this.state.yearData}
          DayDataApi={this.DayDataApi}
          />
        </Paper>
      </div>
    );
  }
}
