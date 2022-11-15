import React, {component} from 'react';

class StyleComponent extends React.Component{
    render(){
        
        return(
        <>
            <style>
          {`
          .form-control{
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
          }
         .form-control:focus {
            color: #495057;
            background-color: #fff;
            border-color: #ced4da !important;
            outline: 0;
            box-shadow: none;
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
        }
        .text-label{
            /* font-size:16px !important; */
            color:#494c50;
        }
    
        .bootstrap-select>.dropdown-toggle {
    position: relative;
    width: 100%;
    text-align: right;
    white-space: nowrap;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    
    color: #495057;
            background-color: #fff !important;
            border-color: #ced4da !important;
            outline: 0;
            box-shadow: none;
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
    }
    
    
    .bootstrap-select .dropdown-menu li {
    padding-left: .5rem;
    padding-right: .5rem;
    }
    
    .bootstrap-select .dropdown-toggle:focus, .bootstrap-select>select.mobile-device:focus+.dropdown-toggle {
    outline: none!important;
     outline: offset 0;;
    }
    
    .dropdown-item { 
    padding: .5rem 1.5rem;
    border-radius: 1rem;
    }
    .dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #e74a3b;
    margin-top: .5rem;
    margin-bottom: .5rem;
    }
    .dropdown-menu{
    border-radius: 1rem;
    }
        /* CSS for floating label input box */
    
    .has-float-label {
    display: block;
    position: relative
    }
    
    .has-float-label label,
    .has-float-label>span {
    position: absolute;
    cursor: text;
    font-size: 75%;
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
    top: -.5em;
    left: .75rem;
    z-index: 3;
    line-height: 1;
    padding: 0 1px
    }
    
    .has-float-label label::after,
    .has-float-label>span::after {
    content: " ";
    display: block;
    position: absolute;
    background: #fff;
    height: 2px;
    top: 50%;
    left: -.2em;
    right: -.2em;
    z-index: -1;
    }
    
    .has-float-label .form-control::-webkit-input-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s
    }
    
    .has-float-label .form-control:placeholder-shown:not(:focus)::-webkit-input-placeholder {
    opacity: 0
    }
    
    .has-float-label .form-control:placeholder-shown:not(:focus)+* {
    font-size: 100%;
    opacity: .8;
    top: .75em
    }
    
    .input-group .has-float-label {
    display: table-cell
    }
    
    .input-group .has-float-label .form-control {
    border-radius: .25rem
    }
    
    .input-group .has-float-label:not(:last-child),
    .input-group .has-float-label:not(:last-child) .form-control {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    border-right: 0
    }
    
    .input-group .has-float-label:not(:first-child),
    .input-group .has-float-label:not(:first-child) .form-control {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0
    }
    
    
    /* theme Buttons */
    
    .btn-theme-1 {
    background-color: #ff574d;
    }
    .btn-theme-1 .round {
    background-color: #e62c2c;
    }
    
    .btn-theme-2 {
    background-color: #00AFD1;
    }
    .btn-theme-2 .round {
    background-color: #00c4eb;
    }
    
    .btn-theme-3 {
    background-color: #5A5B5E;
    }
    .btn-theme-3 .round {
    background-color: #737478;
    }
    
    .btn-theme-effect {
    text-decoration: none !important;
    -moz-border-radius: 30px;
    -webkit-border-radius: 30px;
    border-radius: 30px;
    padding: 9px 53px 9px 23px;
    color: #fff !important;
    text-transform: uppercase;
    font-family: sans-serif;
    font-weight: bold;
    position: relative;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    display: inline-block;
    cursor: pointer;
    }
    .btn-theme-effect span {
    position: relative;
    z-index: 3;
    }
    .btn-theme-effect .round {
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    width: 38px;
    height: 36px;
    position: absolute;
    right: 3px;
    top: 3px;
    -moz-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    z-index: 2;
    }
    .btn-theme-effect .round i {
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: 50%;
    margin-left: -4px;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    }
    
    .button-text {
    font-size: 12px;
    line-height: 1.35;
    }
    
    .btn-theme-effect:hover {
    padding-left: 48px;
    padding-right: 28px;
    }
    .btn-theme-effect:hover .round {
    width: calc(100% - 6px);
    -moz-border-radius: 30px;
    -webkit-border-radius: 30px;
    border-radius: 30px;
    }
    .btn-theme-effect:hover .round i {
    left: 12%;
    }
    
    /* theme Buttons end*/
    
    .form-control::-webkit-input-placeholder {
    color: lightgray !important;
    opacity: 1
    }
    
    .form-control::-moz-placeholder {
    color: lightgray !important;
    opacity: 1
    }
    
    .form-control:-ms-input-placeholder {
    color: lightgray !important;
    opacity: 1
    }
    
    .form-control::-ms-input-placeholder {
    color: lightgray !important;
    opacity: 1
    }
    
    .form-control::placeholder {
    color: lightgray !important;
    opacity: 1
    }
    
    .p-radio{
    margin-top: -10px;
    }
	
	/* Loader */
    #overlay {
       background: #ffffff;
       color: #666666;
       position: fixed;
       height: 100%;
       width: 100%;
       z-index: 5000;
       top: 0;
       left: 0;
       float: left;
       text-align: center;
       padding-top: 25%;
       opacity: .80;
     }
     
     .spinner {
         margin: 0 auto;
         height: 64px;
         width: 64px;
         animation: rotate 0.8s infinite linear;
         border: 5px solid firebrick;
         border-right-color: transparent;
         border-radius: 50%;
     }
     @keyframes rotate {
         0% {
             transform: rotate(0deg);
         }
         100% {
             transform: rotate(360deg);
         }
     }
     /* Loader End */
          `}
          </style>
        </>
        )
    }
    
}
export default StyleComponent
