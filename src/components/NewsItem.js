import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        const { title, description, imageUrl, url } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt={title + " image"} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={url} rel='noreferrer' target='_blank' className="btn btn-sm btn-dark">Read More...</a>
                    </div>
                    <div className="card-footer text-muted">
                        By {this.props.author ? this.props.author : "Unknown Author"} on {new Date(this.props.date).toGMTString()}
                    </div>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:'90%',zIndex:'1'}}>
                        {this.props.source}
                    </span>

                </div>
            </div>
        )
    }
}
