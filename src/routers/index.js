
import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Drawerpage from '../components/Drawer page/Drawerpage';
import Login from '../components/HealthCheckupLogin/HealthCheckLogin';
import ForgotPassword from '../components/HealthCheckupLogin/HealthCheckForgot';
import DashboardMaster from '../components/Dashboard/DashboardMaster';
import AppointmentMaster from '../components/AppointmentsHistory/AppointmentMaster';
import RevenueMaster from '../components/Revenue/RevenueMaster';
import CancelledDashboard from '../components/CancelledAppointments/CancelledDashboard';
import MediaUploadsMaster from '../components/MediaUploads/MediaUploadsMaster';
import ManagePackageMaster from '../components/ManagePackage/ManagePackageMaster';
import UploadMaster from '../components/UploadResult/UploadMaster';
import Advertisement from "../components/AdvertisementBooking/AdvertisementMaster";
import DealsMaster from "../components/Deals/DealsMaster";
import Cancelpayment from "../components/CancelPayment/CancelPayment";
import Paymentreceived from "../components/PaymentReceived/PaymentReceived";
import ResetPassword from "../components/HealthCheckupLogin/ResetPassword";

const AppRouter = () => (
    <BrowserRouter> 
         <Drawerpage>
         <Switch>
             {/* <Route path="/login" component={Login} exact/>
             <Route path="/forgot" component={ForgotPassword} />
             <Route path="/ResetPassword" component={ResetPassword}/> */}
             <Route path="/dashboard" component={DashboardMaster} />
             <Route path="/Appointments" component={AppointmentMaster} />
             <Route path="/revenue" component={RevenueMaster} />
             <Route path="/cancel" component={CancelledDashboard} />
             <Route path="/ManagePackage" component={ManagePackageMaster} />
             <Route path="/mediauploads" component={MediaUploadsMaster}/>
             <Route path="/uploadresults" component={UploadMaster} />
             <Route path="/advertise" component={Advertisement} />
             <Route path="/deals" component={DealsMaster} />
             <Route path="/cancelpayment" component={Cancelpayment}/>
             <Route path="/paymentreceived" component={Paymentreceived} />
         </Switch>
         </Drawerpage>
    </BrowserRouter>
)

export default AppRouter;
