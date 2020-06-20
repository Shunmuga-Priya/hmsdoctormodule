import React from 'react'
import Button from '@material-ui/core/Button';
import "./HealthPremiumModal.css";
import Green from '../../Images/green.svg'


class HealthPremiumModal extends React.Component{

    render(){
        return(
            <div>
                {/* Button Editing */}
                <div className="butt_parent">
                    <div className="button_edit">Good Health Premium </div>
                    <div className="button_edit">400 KWD</div>
                </div>
                {/* Description Editing */}
                <div className="common_row">
                
                <div className="first_box">
                    <span className="description_edit">Description</span>
                        <div className="green_upload_container">
                            <span  className="green_uploadint"></span>
                                <span className="upload_ins">How Good Health Premium Package with Cardiac Tests helps you?</span>
                        </div>
                        <div className="green_upload_container">
                            <span  className="green_uploadint"></span>
                                <span className="upload_ins">How Good Health Premium Package with Cardiac Tests helps you?</span>
                        </div>
                
                {/* Instruction */}
                
                    <span className="description_edit">Instruction</span>
                        <div className="green_upload_container">
                             <span  className="green_uploadint"></span>
                                <span className="upload_ins">Do not eat or drink anything other than water for 8-12 hours before the test</span>
                        </div>
                </div>
                {/* border line */}
                <div className="border_edit"></div>
                {/* Test Editing */}
                <div>
              
                <span className="description_edit">Test</span>
                <div className="test_div">
                    <div className="first_five_test">
                        <div className="green_upload_container">
                                    <span  className="green_uploadint"></span>
                                        <span className="upload_ins">Echocardiogram</span>
                        </div>
                        <div className="green_upload_container">
                                    <span  className="green_uploadint"></span>
                                        <span className="upload_ins">Echocardiogram</span>
                        </div>
                        <div className="green_upload_container">
                                    <span  className="green_uploadint"></span>
                                        <span className="upload_ins">Echocardiogram</span>
                        </div>
                        <div className="green_upload_container">
                                    <span  className="green_uploadint"></span>
                                        <span className="upload_ins">Echocardiogram</span>
                        </div>
                        <div className="green_upload_container">
                                    <span  className="green_uploadint"></span>
                                        <span className="upload_ins">Echocardiogram</span>
                        </div>
                    </div>    
                   {/* second_part for echocardiogram */}
                    <div className="test_div">
                        <div className="second_five_test">
                            <div className="green_upload_container">
                                        <span  className="green_uploadint"></span>
                                            <span className="upload_ins">Echocardiogram</span>
                            </div>
                            <div className="green_upload_container">
                                        <span  className="green_uploadint"></span>
                                            <span className="upload_ins">Echocardiogram</span>
                            </div>
                            <div className="green_upload_container">
                                        <span  className="green_uploadint"></span>
                                            <span className="upload_ins">Echocardiogram</span>
                            </div>
                            <div className="green_upload_container">
                                        <span  className="green_uploadint"></span>
                                            <span className="upload_ins">Echocardiogram</span>
                            </div>
                            <div className="green_upload_container">
                                        <span  className="green_uploadint"></span>
                                            <span className="upload_ins">Echocardiogram</span>
                            </div>
                        </div>
                    </div>
                    
            
                </div>
                </div>
                </div>
               
            </div>        
        )
    }
}
export default HealthPremiumModal;