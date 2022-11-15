import React, {component} from 'react';

function ThemeProps(props) {
        return(
        <>
          <span className="has-float-label">
            <input className="form-control input-text" id="pan" type="text" placeholder="Enter Pan Number"/>
            <label for="pan" className="text-label">Pan Number</label>
          </span>
        </>
        )
}

function ThemePropsbutton(props) {
    return(
    <>
      <input type={props.type} className="form-control" />
    </>
    )
}
export default ThemeProps
