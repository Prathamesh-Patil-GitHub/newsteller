// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React, { Component } from 'react'
import NetworkError from './NetworkError';
import NewsItem from './NewsItem'
import Spinner from './Spinner'


export default class SavedNews extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            problemOccrured: false,
            isAlertPresent: false,
            alertMessage:null,
            alertType: null
        };
    }

    showAlert= (msg,alertType)=>{
        this.setState({isAlertPresent:true,alertMessage:msg,alertType:alertType});
        setTimeout(()=>{
            this.setState({isAlertPresent:false,alertMessage:null,alertType:null});
        },3000);
    };

    capitalizeFirstLetter(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }

    updatePage= async ()=>{
        this.setState({ loading: true });
        
        const body = {
            auth_token:localStorage.getItem("auth_token")
        };
        await fetch('http://localhost:5000/view-saved-news', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error === false) {
                    this.setState({
                        articles: data.articles,
                        loading: false
                    });
                } else {
                    this.setState({ problemOccrured: true });
                }
            })
            .catch(error => { this.setState({ problemOccrured: true }); });
        
        document.title = "Saved News | NewsTeller";
    }

    async componentDidMount() {
        await this.updatePage();
    }


    render() {
        return (
            <div className='container my-5'>
                <h1 className='h1 display-6' style={{ marginTop: '60px', marginBottom: '0' }}>NewsTeller - Saved News</h1>
                {/*if there's no network error and content is loading - Show spinner*/}
                {this.state.loading && (!this.state.problemOccrured) && <Spinner />}

                {/*If user has not saved any news yet*/}
                {this.state.articles.length === 0  &&
                <p className='lead my-5'> You haven't saved any news yet 😐 Try cutting some snips from your newspaper 🤩</p>
                }


                {/* If not loading and no network error then showing the actual content fetched */}
                {(!this.state.loading) && (!this.state.problemOccrured) && <div className='row'>
                    {this.state.articles.map((element) => {
                        return (
                            <div key={element.url} className='col-md-4 my-3'>
                                <NewsItem canDelete={true} updatePage={this.updatePage} title={element.title} description={element.description} imageUrl={element.imageUrl} date={element.date} author={element.author} source={element.source} url={element.url} showAlert={this.showAlert} />
                            </div>
                        )
                    })}
                </div>}

                {/* If network error occurs this(NetworkError) component will be rendered */}
                {this.state.problemOccrured && <NetworkError />}
            </div>
        )
    }
}
