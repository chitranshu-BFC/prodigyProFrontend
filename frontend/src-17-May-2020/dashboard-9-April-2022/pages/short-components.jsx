import React, {component} from 'react';
import add_purchase_icon from "../../assets/images/icons/transact-add-purchase.png";
import sip_icon from "../../assets/images/icons/simply-sip-2.png";
import switch_icon from "../../assets/images/icons/transact-switch.png";
import redemption_icon from "../../assets/images/icons/redemption.png";

export default function Vishal(){
    // const vishal = ()=>{
        return(
    <>
    <h1>Hello Vishal</h1>
    </>
        )
    }

// Signup Signin and forget password upper div
    export function Transact_Icon_Group(){
            return(
        <>
        <div className="d-flex">
                <div className=""> 
                    <div className="icon-contain  mr-2" data-toggle="tooltip" data-placement="top" title="Additional Purchase">
                        <a href="" data-toggle="modal" data-target="#additionalPurchase" > 
                            <img src={add_purchase_icon} className="w-100"/>
                        </a>
                    </div>
                </div>

                <div className="border-left">
                    <div className="icon-contain ml-2 mr-2" data-toggle="tooltip" data-placement="top" title="SIP">
                        <a href="" data-toggle="modal" data-target="#sip"> 
                            <img src={sip_icon} className="w-100"/>
                        </a>
                    </div>
                </div>

                <div className="border-left">
                    <div className="icon-contain ml-2 mr-2" data-toggle="tooltip" data-placement="top" title="Switch">
                        <a href="" data-toggle="modal" data-target="#switch"> 
                            <img src={switch_icon} className="w-100"/>
                        </a>
                    </div>
                </div>
                <div className="border-left">
                    <div className="icon-contain ml-2" data-toggle="tooltip"data-placement="top" title="Redemption">
                        <a href="" data-toggle="modal" data-target="#redemption"> 
                            <img src={redemption_icon} className="w-100"/>
                        </a>
                    </div>
                </div>
        </div>
        </>
            )
        }
