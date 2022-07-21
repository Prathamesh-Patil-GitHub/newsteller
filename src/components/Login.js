import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Login extends Component {
    //TO INITIALIZE THE DATA OF ALERT BAR
    constructor() {
        super();
        this.state = {
            error: false,
            message: null
        };
    }

    //TO VALIDATE THE GIVEN DATA AND CHANGE THE ERROR MESSAGE AND STATE
    isValid(email, password) {
        let valid = true;
        if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) === -1) {
            valid = false;
            this.setState({
                error: true,
                message: "Please provide a valid Email Id"
            });
        } else if (password.length < 8) {
            valid = false;
            this.setState({
                error: true,
                message: "The password should be at least 8 characters long"
            });
        }
        return valid;
    }


    async login() {
        const email = document.getElementById("exampleInputEmail1").value;
        const password = document.getElementById("exampleInputPassword1").value;
        if (!this.isValid(email, password)) {
            setTimeout(() => { this.setState({ error: false, message: null }); this.forceUpdate(); }, 5000);
        } else {
            const body = {
                email: email,
                password: password
            };
            await fetch('http://localhost:5000/login', {

                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(async data => {
                    if (!data.error) {
                        localStorage.setItem("auth_token", data.auth_token);
                        localStorage.setItem("email", email);
                        //HITTING GETUSER API TO GET THE NAME OF THE USER LOGGED-IN
                        await fetch('http://localhost:5000/getuser', {

                            method: "POST",

                            headers: {
                                'Content-Type': 'application/json'
                            },

                            body: JSON.stringify({
                                auth_token: data.auth_token
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(!data.error){
                                localStorage.setItem("name",data.name);
                            } else {
                                this.setState(data);
                                setTimeout(() => { this.setState({ error: false, message: null }); this.forceUpdate(); }, 5000);
                            }
                        })
                        .catch(error => { this.setState({ error: true, message: "Problem occured while reaching the server :( Check your internet connection !" }) });
                        setTimeout(() => { this.setState({ error: false, message: null }); this.forceUpdate(); }, 5000);
                        // eslint-disable-next-line no-restricted-globals
                        location.assign("/");
                    } else {
                        this.setState(data);
                        setTimeout(() => { this.setState({ error: false, message: null }); this.forceUpdate(); }, 5000);
                    }
                })
                .catch(error => { 
                    this.setState({ error: true, message: "Problem occured while reaching the server :( Check your internet connection !" }) 
                    setTimeout(() => { this.setState({ error: false, message: null }); this.forceUpdate(); }, 5000);
                });
        }
        this.forceUpdate();
    }
    async componentDidMount() {
        document.title = "Login | NewsTeller"
    }
    render() {
        return (
            <div className="mx-5 my-5 p-4 border" style={{ backgroundImage: `url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-036.jpg")`, borderRadius: "0px 80px 0px 80px" }}>
                <center>
                    <form className="p-md-5">
                        <div className="form-group my-2 col-md-6" style={{ textAlign: "left", color: "white" }}>
                            <label htmlFor="exampleInputEmail1" className="fs-5">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group my-2 col-md-6" style={{ textAlign: "left", color: "white" }}>
                            <label htmlFor="exampleInputPassword1" className="fs-5">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete='on'/>
                        </div>
                        <button type="submit" className="btn btn-dark my-3 mb-2" onClick={(event) => { event.preventDefault(); this.login() }}>Log in</button>
                        <p>Need an account? <Link to="/signup">Sign Up</Link></p>
                    </form>
                    {this.state.error && <div className="alert alert-danger mt-2" role="alert">
                        {this.state.message}
                    </div>}
                </center>
            </div>
        )
    }
}

export default Login
