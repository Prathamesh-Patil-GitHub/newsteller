import React, { Component } from 'react'
import NetworkError from './NetworkError';
import NewsItem from './NewsItem'
import Spinner from './Spinner'


export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false,
            problemOccrured: false
        }
    }

    capitalizeFirstLetter(str){
        return str.slice(0,1).toUpperCase()+str.slice(1);
    }

    async updatePage(){
        this.setState({loading: true});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url).catch(()=>{this.setState({problemOccrured: true})});
        let parsedData = await data.json();
        this.setState({ 
            articles: parsedData.articles, 
            loading: false,
            totalResults: parsedData.totalResults
        });
        document.title=`${this.props.category==='general'?'Home':this.capitalizeFirstLetter(this.props.category)} | NewsTeller`;
    }

    async componentDidMount() {
        await this.updatePage();
    }

    handleNextClick = async ()=>{
        // This function handles the Next button click for next page loading
        await this.setState({page: this.state.page + 1});
        await this.updatePage();
    }

    handlePrevClick = async ()=>{
        // This function handles the Previous button click for previous page loading
        await this.setState({page: this.state.page - 1});
        await this.updatePage();
    }

    

    render() {
        return (
            <div className='container my-5'>
                <h1 className='h1 display-6' style={{marginTop: '60px', marginBottom: '0'}}>NewsTeller - {`${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h1>
                {/*if there's no network error and content is loading - Show spinner*/}
                {this.state.loading && (!this.state.NetworkError) && <Spinner/>}

                {/* If not loading and no network error then showing the actual content fetched */}
                {(!this.state.loading) && (!this.state.problemOccrured) && <div className='row'>
                    {this.state.articles.map((element) => {
                        return (
                            <div key={element.url} className='col-md-4 my-3'>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} date={element.publishedAt} author={element.author} source={element.source.name} url={element.url} />
                            </div>
                        )
                    })}
                </div>}

                {/* If network error occurs this(NetworkError) component will be rednered */}
                {this.state.problemOccrured && <NetworkError/>}
                
                {/* Next and Previous buttons to fetch next page of news and previous page of news*/}
                <div className='d-flex justify-content-between'>
                    <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
