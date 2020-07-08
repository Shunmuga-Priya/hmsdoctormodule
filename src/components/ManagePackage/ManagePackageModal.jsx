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
import axios from "axios";
import dateformat from "dateformat";
import { apiurl } from "../../App";
import ValidationLibrary from "../../helpers/ValidationLibrary/validationfunction";
export default class ManagePackageMaster extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      PackageDetails: {
        'package_name': {
            'value': '',
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
        'package_fees': {
            'value': '',
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
        'description1': {
            'value': '',
            validation: [{ 'name': 'required' }],
            error: null,
            errmsg: null
        },
        'description2': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
      },
      'instruction': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
    },
  //   'test': {
  //     'value': '',
  //     validation: [{ 'name': 'required' }],
  //     error: null,
  //     errmsg: null
  // }
    },
   test:[],
    test_list:[],
    TestData:[],
    editdata:"",

     };
  }
  log = e => {
    console.log(e);
  };
  componentDidMount() {
// Assigning Edit Data
console.log(this.state.editdata,"totaldata")
const { editData,editOpenModal } = this.props;
if (editOpenModal != true) {
  this.GetPackageTest() 
}
console.log(this.props.editOpenModal,"edit")
if (editOpenModal === true) {
  this.state.editId=editData.id
  this.state.PackageDetails.package_name.value=editData.hc_package_name
  this.state.PackageDetails.package_fees.value=editData.hc_package_fee
  this.state.PackageDetails.description1.value =editData.hc_description_1
  this.state.PackageDetails.description2.value =editData.hc_description_2
  this.state.PackageDetails.instruction.value =editData.hc_instruction
  
  console.log(editData,"package")
  // this.setState({
  //   editdata:this.state.AllData.find(val=>val.id===id)
  // })
}
this.setState({})

}

InsertTest=()=>{
    var self=this
    var PackageTest={
      hcpackageId:3,
      hctest:this.state.test,
      hcmodifiedby:19,
    }
    axios({
      method: 'POST',
      url: apiurl + 'insertPackageTest',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data:{
        ...PackageTest,
      },
     
    }).then((response) => {
      console.log(response.data,"inserttest")
      self.GetPackageTest()
    }).catch((error) => {
      alert(JSON.stringify(error))
    })
    
    this.setState({
        test_list:[...this.state.test_list,this.stat.test]
        
    })
    this.setState({})
}
  // validation part
  checkValidation = () => {
        var PackageDetails = this.state.PackageDetails;
        var packageKeys = Object.keys(PackageDetails);
        console.log(packageKeys);
        for (var i in packageKeys) {
            var errorcheck = ValidationLibrary.checkValidation(PackageDetails[packageKeys[i]].value, PackageDetails[packageKeys[i]].validation);
            console.log(errorcheck);
            PackageDetails[packageKeys[i]].error = !errorcheck.state;
            PackageDetails[packageKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = packageKeys.filter((obj) =>
        PackageDetails[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            this.onSubmitData()
        }
        this.setState({ PackageDetails })
    }
    changeDynamic = (data, key) => { 
        var PackageDetails = this.state.PackageDetails;
        var errorcheck = ValidationLibrary.checkValidation(data, PackageDetails[key].validation);
        PackageDetails[key].value = data;
        PackageDetails[key].error = !errorcheck.state;
        PackageDetails[key].errmsg = errorcheck.msg;
        this.setState({ PackageDetails });
        this.setState({})
    }
    //end
    onSubmitData = () => {
       console.log(this.state.PackageDetails.package_fees,"package_fees")
      var PackageApiData = {
        hcpackagename:this.state.PackageDetails.package_name.value,
        hcpackagefee:this.state.PackageDetails.package_fees.value,
        hcdescription1:this.state.PackageDetails.description1.value,
        hcdescription2:this.state.PackageDetails.description2.value,
        hcinstruction:this.state.PackageDetails.instruction.value,
        hcvendorId: 15,
        createdby:19,
        test:this.state.test,
      }
      var UpdateApiData={
        hcpackagename:this.state.PackageDetails.package_name.value,
        hcpackagefee:this.state.PackageDetails.package_fees.value,
        // hcdescription1:this.state.PackageDetails.description1.value,
        // hcdescription2:this.state.PackageDetails.description2.value,
        // hcinstruction:this.state.PackageDetails.instruction.value,
      }
      if(this.props.editData){
        this.PackageUpdateApi()   // Update Api Call
      }else{
        this.PackageInsertApi(PackageApiData)
        // Insert Api Call
      }
      this.props.closemodal()
    }
  
    PackageInsertApi = (PackageApiData) => {
      axios({
        method: 'POST',
        url: apiurl + '/insertPackage',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          ...PackageApiData
        }
      }).then((response) => {
        console.log(response,"divya")
        this.props.getTableData()
       
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }

    PackageUpdateApi=()=>{
      alert(this.props.currenteditdata)
      axios({
        method: 'put',
        url: apiurl + 'editPackage',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          "id":this.props.currenteditdata,
          "hcpackagename":this.state.PackageDetails.package_name.value,
          "hcpackagefee":this.state.PackageDetails.package_fees.value,
          "hcdescription1":this.state.PackageDetails.description1.value,
          "hcdescription2":this.state.PackageDetails.description2.value,
          "hcinstruction":this.state.PackageDetails.instruction.value,
          
        }
      }).then((response) => {
        console.log(response,"editdata")
        this.props.getTableData()
        this.GetPackageTest()
       
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }

    GetPackageTest=()=>{
      var TestData=[]
      var self=this
        axios({
          method: 'post',
          url: apiurl + '/getPackageTest',
          data: {
              "packageId":"3"
          }
      })
      .then(function (response) {
          
      // self.setState({
      //   "description1":response.data.data.hc_description_1,
      //   "description2":response.data.data.hc_description_2,
      //   "instruction":response.data.data.hc_instruction,
      // })
      // console.log(this.state.PackageDetails.description2,"des")
      const TestData=response.data.data[0].hctest
     
      self.setState({
        TestData,
        TotalData:response.data.data
      })
    
    })
    .catch(function (error) {
        console.log(error, "error");
    })
   
    }

     DeleteApi=(id)=>  //  Deletepackage test
    {
    var iddata=id
    var self = this
    axios({
        method: 'delete',
        url: apiurl + '/deletePackageTest',
        data: {
            "hctestId":id
        }
    })
        .then(function (response) {
            console.log(response, "deleteres")
            this.GetPackageTest()
        })
        .catch(function (error) {
            console.log(error, "error");
        });
        this.setState({})
  }

  render() {
   console.log("testdata",this.state.TestData)
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} className="package_container">
                <Labelbox type="text" 
                labelname="Package Name"
                changeData={(data) => this.changeDynamic(data, 'package_name')}
                value={this.state.PackageDetails.package_name.value}
                error={this.state.PackageDetails.package_name.error}
                errmsg={this.state.PackageDetails.package_name.errmsg} 
                />
                <Labelbox type="textarea" 
                labelname="Description1"
                changeData={(data) => this.changeDynamic(data, 'description1')}
                value={this.state.PackageDetails.description1.value}
                error={this.state.PackageDetails.description1.error}
                errmsg={this.state.PackageDetails.description1.errmsg} 
                 />
              </Grid>
              <Grid item xs={12} md={6} className="package_container">
                <Labelbox type="number" 
                labelname="Package Fee(KWD)"
                changeData={(data) => this.changeDynamic(data, 'package_fees')}
                value={this.state.PackageDetails.package_fees.value}
                error={this.state.PackageDetails.package_fees.error}
                errmsg={this.state.PackageDetails.package_fees.errmsg} 

                />
                <Labelbox type="textarea" 
                labelname="Description2"
                 changeData={(data) => this.changeDynamic(data, 'description2')}
                value={this.state.PackageDetails.description2.value}
                error={this.state.PackageDetails.description2.error}
                errmsg={this.state.PackageDetails.description2.errmsg} 
                 />
              </Grid>
              <div className="instruction_area">
                <Labelbox type="textarea" 
                labelname="Instruction"
                changeData={(data) => this.changeDynamic(data, 'instruction')}
                value={this.state.PackageDetails.instruction.value}
                error={this.state.PackageDetails.instruction.error}
                errmsg={this.state.PackageDetails.instruction.errmsg} 
                 />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} className="package_containerthird">
            <div className="add_test_container">
              <div className="add_div">
                <div className="add_test">
                  <Labelbox type="text" 
                  labelname="Add Test"
                  changeData={(data) => this.changeDynamic(data, 'test')}
                  // value={this.state.PackageDetails.test.value}
                  // error={this.state.PackageDetails.test.error}
                  // errmsg={this.state.PackageDetails.test.errmsg} 
                  />
                </div>
                <AddIcon className="test_add" onClick={this.InsertTest} />
              </div>
              <div className="tag_par">
              {this.state.TestData.map((val,id) => (
                <Tag closable onClose={()=>this.DeleteApi(val.hc_testid)}>
                  <span className="test_text">{val.hc_test}</span>
                </Tag>
             ))} 
              </div>
            </div>
          </Grid>
          <div className="clinicbutton-container">
            <Button className="clinicCancel"  onClick={() => this.props.closemodal(false)}>Cancel</Button>
            <Button
              className="clinicSubmit"
              onClick={this.checkValidation}
            >
              {
                  this.props.btnProps ? "Submit" : "Update"
                }
            </Button>
            
          </div>
        </Grid>
      </div>
    );
  }
}
