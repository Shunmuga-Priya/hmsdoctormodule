import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
              <td>{index+1}</td>
              <td>{printdata.PatientName}</td>
              <td>{printdata.hc_package_name}</td>
              <td>{printdata.Date}</td>
              <td>{printdata.Time}</td>
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Uploaded Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Package</th>
            <th>Date</th>
            <th>Time</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }