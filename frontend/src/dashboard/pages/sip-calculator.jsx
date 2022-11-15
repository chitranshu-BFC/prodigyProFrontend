import React, { component } from 'react';
import $ from 'jquery';
import { Helmet } from "react-helmet";
import Header from './header';
import Sidebar from './sidebar';
import sipimage from "../../assets/images/icons/New folder (2)/sipimg.png"

class SIP_Calculator extends React.Component {

//     calculate ()
// {
//     $("#sip-form").css({ "display": "none" });
//     $("#sip-g").css({ "display": "block" });
// }
  render() {

 
    return (
      <>
        
    {/* Page Wrapper */}
    <div id="wrapper">
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                <br/>
      
        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">SIP Calculator</li>
                        </ol>
                    </nav>
        <section id="" className="m-0 py-0 calc-bg sip-bg">
          <div className="container pb-2 pt-1" >
          <div className="alert alert-calculator text-center">This calculator will help you to visualize/calculate the amount accumulated with a regular investment.</div>           
            <div className="row justi">  

            
              
              <div className="col-md-6">
                <div className="card border-0" id='sip-form'>
                   <div className="card-body form-calc">
                 <form >
                     <div className='row'>
                        <div className="col-md-12">
                    <label for="monthly-saving">Monthly Saving</label>
                    </div>
                    <div className="col-md-12">
                    <input type="number" name='monthly-saving' className='input-calc form-control'/>
                    </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className="col-md-12">
                    <label for="Invest-p">Investment Period (In year)</label>
                    </div>
                    <div className="col-md-12">
                    <input type="number" name='Invest-p' className='input-calc form-control'/>
                    </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className="col-md-12">
                    <label for="return">Expected rate of Return (% p.a)</label>
                    </div>
                    <div className="col-md-12">
                    <input type="number" name='return' className='input-calc form-control'/>
                    </div>
                    </div>
                    <br />
                    <div className='row '>
                        
                    <div className="col-md-12 text-center">
                 <input type="button" className='new-btn' value="Calculate"/>
                    </div>
                    </div>

                 </form>


                   </div>
                 
                </div>

                
              </div>
              <div className="col-md-6">
              <div className='result' id='sip-g'>
fssdfgsdf
                   
                </div>
                </div>
            
            </div>
          </div>
        </section>
        </div>
        </div>
        </div>
        </div>


       




       

      </>



    )
  }

}

export default SIP_Calculator