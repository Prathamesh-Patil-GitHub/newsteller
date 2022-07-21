// *****************************
// @author - Prathamesh Patil  **
// ****************************


import React, { Component } from 'react';

export default class NewsItem extends Component {
    saveNews = async () => {
        const title = this.props.title;
        const description = this.props.description;
        const url = this.props.url;
        const imageUrl = this.props.imageUrl;
        const source = this.props.source;
        const date = this.props.date;
        const author = this.props.author;
        const auth_token = localStorage.getItem("auth_token");
        const body = {
            auth_token: auth_token,
            title: title,
            description: description,
            url: url,
            imageurl: imageUrl,
            author: author,
            date: date,
            source: source
        }
        await fetch('http://localhost:5000/save-news', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error === false) {
                    this.props.showAlert(data.message, "success");
                } else {
                    this.props.showAlert(data.message, "danger");
                }
            })
            .catch(error => { this.props.showAlert("News is not saved, Please check your internet connection !") });
    };

    deleteNews = async () => {
        const auth_token = localStorage.getItem("auth_token");
        const url = this.props.url;
        const body = {
            auth_token: auth_token,
            url: url
        };
        await fetch('http://localhost:5000/delete-news', {

            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error === false) {
                    this.props.showAlert(data.message, "success");
                } else {
                    this.props.updatePage();
                    this.props.showAlert(data.message, "danger");
                }
            })
            .catch(error => { this.props.showAlert("News is not saved, Please check your internet connection !") });
            
        this.props.updatePage();
    };

    render() {
        const { title, description, imageUrl, url } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt={title + " image"} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={url} rel='noreferrer' target='_blank' className="btn btn-sm btn-outline-dark">Read More...</a>
                        {localStorage.getItem("auth_token") != null && !this.props.canDelete && <input type="button" onClick={this.saveNews} className="btn btn-sm btn-outline-success mx-2" value="Save News" />}
                        {this.props.canDelete && <button onClick={this.deleteNews} className="btn btn-sm btn-outline-danger mx-2">Delete News</button>}
                    </div>
                    <div className="card-footer text-muted">
                        By {this.props.author ? this.props.author : "Unknown Author"} on {new Date(this.props.date).toGMTString()}
                    </div>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{ left: '90%', zIndex: '1' }}>
                        {this.props.source}
                    </span>

                </div>
            </div>
        )
    }
}
