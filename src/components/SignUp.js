// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { Component } from 'react';

export class SignUp extends Component {
  //TO INITIALIZE THE DATA OF ALERT BAR
  constructor() {
    super();
    this.state = {
      error: false,
      message: null
    };
  }

  //TO VALIDATE THE GIVEN DATA AND CHANGE THE ERROR MESSAGE AND STATE
  isValid(name, email, password) {
    let valid = true;
    if (name.length < 2 || name.length > 40) {
      valid = false;
      this.setState({
        error : true,
        message : "The name should be at least 2 characters long and at most 40!"
      });
    } else if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) === -1) {
      valid = false;
      this.setState({
        error : true,
        message : "Please provide a valid Email Id"
      });
    }
      
    else if (password.length < 8) {
      valid = false;
      this.setState({
        error : true,
        message : "The password should be at least 8 characters long"
      });
    }
    return valid;
  }

  //TO SEND THE ACTUAL REQUEST WITH SOME CLIENT SIDE VALIDATION
  async createUser() {
    const name = document.getElementById("exampleInputName").value;
    const email = document.getElementById("exampleInputEmail1").value;
    const passwordMain = document.getElementById("exampleInputPassword1").value;
    const passwordConfirm = document.getElementById("exampleInputPassword2").value;
    if (passwordMain !== passwordConfirm) {
      this.setState({
        error : true,
        message : "Password and Confirm Password fields do not match !"
      });
      setTimeout(() => { this.setState({error:false,message:null}); this.forceUpdate(); }, 5000);
    } else if (!this.isValid(name, email, passwordMain)) {
      setTimeout(() => { this.setState({error:false,message:null}); this.forceUpdate(); }, 5000);
    } else {
      const body = {
        name: name,
        email: email,
        password: passwordMain
      };
      await fetch('http://localhost:5000/createuser',{

      method: "POST",  

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)})
      .then(res => res.json())
      .then(data => {
        if(data.error === false){
          localStorage.setItem("auth_token",data.auth_token);
          localStorage.setItem("name",name);
          localStorage.setItem("email",email);
          // eslint-disable-next-line no-restricted-globals
          location.assign("/");
        }else{
          this.setState(data);
        }
      })
      .catch(error => {console.log(error)});
    }
    this.forceUpdate();
  }
  async componentDidMount() {
    document.title = "Sign Up | NewsTeller"
  }
  render() {
    return (
      <>
        <div className="mx-5 my-4 p-4 border" style={{ backgroundImage: `url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-036.jpg")`, borderRadius: "0px 80px 0px 80px" }}>
          <center>
            <form className="p-md-5">
              <div className="form-group my-2 col-md-6" style={{ textAlign: "left", color: "white" }}>
                <label htmlFor="exampleInputName" className="fs-5">Name</label>
                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter name" required />
              </div>
              <div className="form-group my-2 col-md-6" style={{ textAlign: "left", color: "white" }}>
                <label htmlFor="exampleInputEmail1" className="fs-5">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group my-2 col-md-6" style={{ textAlign: "left", color: "white" }}>
                <label htmlFor="exampleInputPassword1" className="fs-5">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete='on' required />
              </div>
              <div className="form-group mb-5 col-md-6">
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" autoComplete='on' required />
              </div>
              <button onClick={(event) => { event.preventDefault(); this.createUser() }} className="btn btn-dark">Create New Account</button>
            </form>
            {this.state.error && <div className="alert alert-danger mt-2" role="alert">
              {this.state.message}
            </div>}
          </center>
        </div>
      </>
    )
  }
}

export default SignUp