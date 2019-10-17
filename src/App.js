import React, { useState, useEffect } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

// helper function for creating the slash db url
let slashDbUrl = (limit, offset) => {
	let base = "https://demo.slashdb.com/db/Chinook/Invoice.json";
	return `${base}?limit=${limit}&offset=${offset}`
}

function App() {
  // initialize state
  let [list, setList] = useState([]);
  let [hasMore, setHasMore] = useState(true);
  let [offset, setOffset] = useState(0);

  // helper for loading data from API
  let load = async (limit) => {
    let res = await fetch(slashDbUrl(limit, offset));
    let json = await res.json();

    if(json.length > 0) {
    	// if we have results, add them to the list and update the offset
	    setList(list.concat(json));
	    setOffset(offset + limit);
    } else {
    	//else we have nothing else to load
    	setHasMore(false);
    }
  }

  // load data from API into list on Mount
  useEffect(() => { load(50); }, []);

  return (
    <div className="App" style={{ width: '400px', margin: 'auto' }}>
      <h1>Infinite Scroll!</h1>
      <InfiniteScroll
        height={250}
        dataLength={list.length}
	    next={() => { load(20); }}
	    hasMore={hasMore}
	    loader={<h4>Loading...</h4>}
	    endMessage={
	      <p>
	        <b>End of List</b>
	      </p>
	    }>
          {list.map((invoice, index) => (
            <div key={index} style={{display: 'flex', justifyContent:'space-evenly'}}>
               <div>{invoice.InvoiceDate.split('T')[0]}</div>
               <div>${invoice.Total}</div>
            </div>
          ))}
	  </InfiniteScroll>
    </div>
  );
}

export default App;
