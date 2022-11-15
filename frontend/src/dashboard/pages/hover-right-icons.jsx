import React from "react";
import {FaUsers,FaBook,FaShoppingBag,FaBriefcase,FaUniversity,FaUserPlus} from "react-icons/fa";

class Right_Icons extends React.Component
{
    render()
    {
        return(

            <>
            <div className="right-icon-s">
            <div class="ng-star-inserted"><div  class="right-icon"><div  class="ng-star-inserted">
            <ul  class="ul-right ng-star-inserted" style={{marginTop:"-3em"}}>
                    <li  class="li1 rightmenu"><a href='/prodigypro/dashboard/portfolio'> <FaBriefcase className='fa-2x  img-i'/><div  class="over-text1">Portfolio</div></a></li>
                    </ul>
                 
                    <ul  class="ul-right ng-star-inserted" style={{marginTop:"0.4em "}}>
                    <li  class="li1 rightmenu"><a href='/prodigypro/dashboard/transact'><FaBook className='fa-2x  img-i'/><div  class="over-text1">Transact</div></a></li>
                    </ul>
                    <ul  class="ul-right bank ng-star-inserted" style={{marginTop:"3.8em"}}>
                    <li  class="li1 rightmenu"><a href="/prodigypro/dashboard/pan-verification-dashboard"> <FaUserPlus className='fa-2x  img-i'/><div  class="over-text1">Profile Creation / IIN</div></a></li>
                    </ul>
                    <ul  class="ul-right bank ng-star-inserted" style={{marginTop:"7.2em"}}>
                    <li class="li1 rightmenu"><a href='/prodigypro/dashboard/add-family-member'><FaUsers className='fa-2x  img-i'/><div  class="over-text1">Add Family Member</div></a></li>
                    </ul>
                    <ul  class="ul-right bank ng-star-inserted" style={{marginTop:"10.6em"}}>
                    <li class="li1 rightmenu"><a href='/prodigypro/dashboard/bank-and-mandate'><FaUniversity className='fa-2x  img-i'/><div  class="over-text1">Bank Details & Mandate</div></a></li>
                    </ul>
                    <ul  class="ul-right ng-star-inserted" style={{marginTop:"14em"}}>
                    <li class="li1 rightmenu"><a href='/prodigypro/dashboard/my-order'><FaShoppingBag className='fa-2x  img-i'/><div  class="over-text1">Orders</div></a></li>
                    </ul>

                    </div>
                    </div>
              </div>
              </div>
            
            </>
        )
    }
}
export default Right_Icons