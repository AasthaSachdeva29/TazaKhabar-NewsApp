import React,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=> {
 const [articles,setArticles]=useState([])
 const [loading,setLoading]=useState(true)
 const [page,setPage]=useState(1)
 const [totalResults,setTotalResults]=useState(0)
  const capitalize=(st)=>{
      return st.charAt(0).toUpperCase()+st.slice(1);
      
  }

  const updateNews=async()=>{
    props.setProgress(10);
    
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    // this.setState({loading:true})
    let data=await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json();
    props.setProgress(75);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title=`${capitalize(props.category)}-NewsMonkey`;
    updateNews();
  },[])
 
  const handleOnPrev=async ()=>{
    console.log("previous");
    setPage(page-1);
    updateNews();
  }
  const fetchMoreData = async() => {
   
    setPage(page-1);
  
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=86a2d27d01fc410f9d9f0151fd3664ee&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data=await fetch(url);
    let parsedData=await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  
    return (
      <>
       <h3 className="text-center" style={{margin: '35px 0px', marginTop: '85px' }}>TazaKhabar-Top Headlines on {capitalize(props.category)}</h3>
       
        {loading && <Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
          style={{overflow: "hidden"}}
         > 
       
       <div className="row">
       
       {articles.map((element)=>{ 
          return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title} description={(element.description)?element.description.slice(0,80):""} url={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
       </div>
       })}
      </div>
     
      </InfiniteScroll>
      
       </>
      
      
    )
  
}
News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
}
News.propTypes={
 country:PropTypes.string,
 pageSize:PropTypes.number,
 category:PropTypes.string
}

export default News
