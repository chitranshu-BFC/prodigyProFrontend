import React from "react";


class Request_A_Call_Back extends React.Component
{
    render()
    {
        return(



            <>
            <style>

 {
  `
  .request-section .place::placeholder {
    color:#939393 !important;
    text-align: left;
  }
  .form-group {
    margin-bottom: 0.5rem;
  }
  `
 }
</style>
            <section className="request-section">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal animate__animated animate__zoomIn animate__fast" id="request-a-call" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content b-r p-3 bg-gray" style={{top:"3em"}}>
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Request a call back</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                              <form>
                                  
                                   
                                  
                                   
                                  <div className='row'>
                                    
                                   
                                    <div className='col-md-12'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb " for="amount">Your Name<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control border-pop place" name='amount' placeholder='Enter Your Name' />
                                      </div>
                                    </div>
                                    <div className='col-md-12'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb" for="amount">Your Email<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control border-pop place" name='amount' placeholder='Enter Your Email' />
                                      </div>
                                    </div>
                                    <div className='col-md-12'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb" for="amount">Contact Number<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control border-pop place" name='amount' placeholder='Enter Your Number' />
                                      </div>
                                    </div>
                                    <div className='col-md-12'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb" for="description">Description<span className="text-danger">*</span></label>
                                        <textarea  className="form-control border-pop place" name='description' placeholder='Please Mention Your Query ! '></textarea>
                                      </div>
                                    </div>
                                    <div className="col-md-12 text-right pt-2">
                                    <button data-dismiss="modal" className="new-btn1 " type="button">Submit</button>
                                  </div>
                                  </div>
                                </form>
                              </div>
                              {/* <div className="modal-footer  border-0">

                               
                              </div> */}
                            </div>
                          </div>

                        </div>

                      </div>
                    </section>
            
            </>
        )
    }
}
export default Request_A_Call_Back