import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ManagePackageModal from "./ManagePackageModal";
import "./ManagePackageTable.css";
import HealthPremiumModal from "./HealthPremiumModal";
import plus from "../../Images/plus.png";
import Moment from "react-moment";
import axios from 'axios';
import DeleteMedia from '../../helpers/TableComponent/DeleteMedia';
import { apiurl } from "../../App";
import dateFormat from 'dateformat';
import { Input, Select, Icon } from "antd";


class ManagePackage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        open: false,
        editopen:false,
        deleteopen:false,
        openview: false,
        tableData: [],
        search:null,
        props_loading:true,
        PackageData:[],
        tableData: [],
        insertOpen:false,
        editData:"",
    };
  }
  
  modelopen = (data,id) => {
    alert(id)
    if (data === "view") {
      this.setState({ openview: true });
    } 
    else if (data === "edit") {
      this.setState({ editopen: true,currenteditdata:id })
      this.setState({
          editData:this.state.totalData.find(val => val.hc_packageid === id)
      })
    }
  };

  insertModalOpen = () => {
    this.setState({
        insertOpen: true
    })
}
  closemodal = () => {
    this.setState({ openview: false, editopen: false,deleteopen: false, Deletemodalopen: false,insertOpen:false}) 
  };

  deleteopen = (type, id) => {
    alert(id)
    this.setState({
        deleteopen: true,
        iddata: id
    })
}

deleterow = () => { 
    var self = this
    axios({
        method: 'delete',
        url: apiurl + '/deletePackage',
        data: {
            "packageId":this.state.iddata,
        }
    })
        .then(function (response) {
            console.log(response, "deleteres")
            self.getTableData()
        })
        .catch(function (error) {
            console.log(error, "error");
        });
        this.setState({
          deleteopen: false
      })
}
  componentDidMount() {
    this.getTableData()
}

getTableData = () => {
    var PackageData = [];
    var self = this
    axios({
        method: 'POST',
        url: apiurl + '/getPackage',
        data:{
          "vendorId":"15"
        }
    }).then((response) => {
      console.log(response,"data")
        response.data.data.map((val) => {
            PackageData.push({package:val.hc_package_name, fee: val.hc_package_fee,date: dateFormat(val.hc_created_on,"dd mmm yyyy"),id:val.hc_packageid})
        })
        self.setState({
            PackageData,
            props_loading: false,
            totalData:response.data.data
        })
        console.log(this.state.totalData,"getdata")
    }).catch((error) => {
        alert(JSON.stringify(error))
    })

}
searchData = (e) => {
  this.setState({
    search: e.target.value
  })
  this.setState({})
}

  render() {
    const { Search } = Input;
    console.log(this.state.PackageData,"package_data")
    debugger;
    const searchdata = this.state.PackageData.filter((data) => {   
      console.log(data,"seachdata")
      if (this.state.search === null)
          return data
      else if (data.package !== null && data.package.toLowerCase().includes(this.state.search.toLowerCase()) 
      || (data.fee != null && data.fee.toString().includes(this.state.search.toString()))) {
          return data
        
      }
      console.log(data,"  ") 
  })
   
    return (
      <div>
        <div className="dashboard_header">
          <div className="dashboard_title">Manage Package</div>

          <div style={{ fontSize: "16px" }}>
            <Moment format="DD-MMM-YYYY" className="mr-4 ml-4"></Moment>
            <Search
              placeholder=" search "
              // onSearch={value => console.log(value)}
              style={{ width: 150 }}
              onChange={(e) => this.searchData(e)}
            />
            <img
              className="plus-icon"
              src={plus}
              style={{ width: 40 }}
              className="mr-4 ml-5"
              onClick={this.insertModalOpen} />
          </div>
        </div>
        
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "package", label: "Package Name" },
            { id: "fee", label: "Fee(KWD)" },
            { id: "date", label: "Created Date" },
            { id: "", label: "Action" },
          ]}
          // rowdata={this.state.PackageData && this.state.PackageData}
          rowdata={ searchdata.length ===  0 ? []: searchdata }
          tableicon_align={"cell_eye"}
          UploadIcon="close"
          GrandTotal="close"
          deleteopen={this.deleteopen}
          modelopen={(e,id) => this.modelopen(e,id)}
        />
         <Modalcomp clrchange="text_color" visible={this.state.insertOpen ? this.state.insertOpen : this.state.editopen} title={this.state.insertOpen === true ? "Add Service" : "Edit Service"} closemodal={(e) => this.closemodal(e)}
 >
           <ManagePackageModal
              btnProps={this.state.insertOpen}
              getTableData={this.getTableData}
              closemodal={() => this.closemodal()}
              editData={this.state.editData}
              currenteditdata={this.state.currenteditdata}
              editOpenModal={this.state.editopen && true}
           />
                    </Modalcomp>
        
                    <Modalcomp visible={this.state.deleteopen} title={"Delete"} closemodal={this.closemodal} customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                        <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}/>
                    </Modalcomp>
                    {/* {
                      name.filter(x=>x.match("e"))
                    } */}
      </div>
    );
  }
}

export default ManagePackage;

