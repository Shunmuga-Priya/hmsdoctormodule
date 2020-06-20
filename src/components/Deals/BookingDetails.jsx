import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from "antd";
import Checkbox from "@material-ui/core/Checkbox";
import "./BookingDetails.css";
import DealList from "./DealList";
import Calendar from "../Calendar/Calendar";
import ValidationLibrary from '../../helpers/ValidationLibrary/validationfunction';


export default class BookingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: "",
      serviceType: [
        {
            id: 1,
            service_type: "All"
        }
    ],
    bookingDetails: {
      'service_type': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
      },
      'deal_title': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
    },
    'deal_amt': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
    }
  }
     };
     
  }

  callback = key => {
    console.log(key);
  };

  checkValidation = () => {
    var bookingDetails = this.state.bookingDetails;
    var bookingKeys = Object.keys(bookingDetails);
    console.log(bookingKeys);
    for (var i in bookingKeys) {
        var errorcheck = ValidationLibrary.checkValidation(bookingDetails[bookingKeys[i]].value, bookingDetails[bookingKeys[i]].validation);
        console.log(errorcheck);
        bookingDetails[bookingKeys[i]].error = !errorcheck.state;
        bookingDetails[bookingKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = bookingKeys.filter((obj) =>
        bookingDetails[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
        this.setState({ error: true })
    } else {
        this.setState({ error: false })
        this.onSubmitData()
    }
    this.setState({ bookingDetails })
}
changeDynamic = (data, key) => {
    var bookingDetails = this.state.bookingDetails;
    var errorcheck = ValidationLibrary.checkValidation(data, bookingDetails[key].validation);
    bookingDetails[key].value = data;
    bookingDetails[key].error = !errorcheck.state;
    bookingDetails[key].errmsg = errorcheck.msg;
    this.setState({ bookingDetails });

    if (key === "service_type" && data === 1) {
        alert("true")
        var Data = [];
        this.state.serviceType.map(val => val.id > 1 && Data.push(val.id))
        console.log(Data.toString(), "myData")
        this.setState({
            serviceTypeAll: Data.toString()
        })
    }
    this.setState({})
}

  render() {
    const { TabPane } = Tabs;
    return (
      <div className="deals_create_tab">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Calendar /> 
          </Grid>

          <Grid item xs={12} md={6}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="Create Deals" key="1">
                <Grid container className="create_deal_tab">
                  <Grid item xs={6} md={6}>
                    <Labelbox type="select" labelname="ServiceType"  valuelabel={'service_type'}  valuebind={"id"}
                      dropdown={this.state.serviceType}
                      changeData={(data) => this.changeDynamic(data, 'service_type')}
                      value={this.state.bookingDetails.service_type.value}
                      error={this.state.bookingDetails.service_type.error}
                      errmsg={this.state.bookingDetails.service_type.errmsg}
                    
                    />
                    <Labelbox type="datepicker" labelname="Valid From" />
                    <div>
                      <Labelbox
                        type="radio"
                        className="radio_button"
                        labelname="Deal Options"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={6} md={6} className="deal_container">
                    <Labelbox width={"90%"}
                      type="text"
                      labelname="Deal Title"
                      valuelabel={'deal_title'}
                      changeData={(data) => this.changeDynamic(data, 'deal_title')}
                      value={this.state.bookingDetails.deal_title.value}
                      error={this.state.bookingDetails.deal_title.error}
                      errmsg={this.state.bookingDetails.deal_title.errmsg}   
                    />
                    <div className="validdate_picker">
                      <div className="datepicker_active">
                        <Labelbox type="datepicker" labelname="Valid To" />
                      </div>
                      <div className="Deal_activecheck">
                        <Checkbox className="Deal_active_check" />
                        <span>Deal Active</span>
                      </div>
                    </div>
                    <Labelbox type="text"  width={"90%"} 
                       valuelabel={'deal_amt'}
                       labelname={this.state.dealOption === "M" ? "Deal Amount" : "Deal Percentage"}
                       changeData={(data) => this.changeDynamic(data, 'deal_amt')}
                       value={this.state.bookingDetails.deal_amt.value}
                       error={this.state.bookingDetails.deal_amt.error}
                       errmsg={this.state.bookingDetails.deal_amt.errmsg}/>
                  </Grid>
         
                  <Grid item xs={12} md={12}>
                    <div className="createbutton-container">
                      <Button className="create_cancel">Cancel</Button>
                      <Button className="media_save" onClick={this.checkValidation}> Save </Button>
                    </div>
                  </Grid>
                </Grid>
              </TabPane>
              <TabPane tab="Deal List" key="2">
                <DealList />
              </TabPane>
            </Tabs>
            <div></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
