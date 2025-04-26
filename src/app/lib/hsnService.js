import axios from 'axios';

export const getHsnFunction = async ()=>{
    let data = {
        "requests": [
            {
                "indexName": "HSN_SAC_2021",
                "params": "query=85171300&optionalWords=85171300&highlightPreTag=<strong>&highlightPostTag=</strong>&typoTolerance=false"
            }
        ]
    }
    const options = {
        method: 'POST',
        url: 'https://cleartax.in/f/content_search/algolia/algolia-search/',
        headers: {accept: 'application/json'}
      };
      
      await axios.post('https://cleartax.in/f/content_search/algolia/algolia-search', data).then(result=>{
        console.log("result",result);
        
      })
}

