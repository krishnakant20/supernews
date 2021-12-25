import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize:8,
        country: 'general'

    }
    static defaultProps = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        country: PropTypes.string
    }

    constructor(){
        super();
        console.log("hello constructor")

        this.state= {
            articles:[],
            loading:false,
            page:1

        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=23a1258591fc43d79619daaaf047ffd9&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults,loading:false});
    }

    handlePrevClick = async ()=>{
        console.log("previous");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=23a1258591fc43d79619daaaf047ffd9&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            page:this.state.page-1,
            articles: parsedData.articles,
            loading:false
        })
    }
    handleNextClick = async ()=>{
        console.log("next");

        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=23a1258591fc43d79619daaaf047ffd9&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            
            this.setState({
                page:this.state.page+1,
                articles: parsedData.articles,
                loading:false
            })
        }
    }

    render() {
        console.log("render clg")
        return (
            <div className='container text-center'>
                <h2>headlines by Krishnakant</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })};                   
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
