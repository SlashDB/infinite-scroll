import React, { useState } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  let [list, setList] = useState(Array.from({ length: 200 }));
  let [hasMore, setHasMore] = useState(true);

  let loadMore = () => { 
  	if(list.length >= 500) {
		setHasMore(false);
	} else {
		setTimeout(
		  ()=> {
		  	setList(list.concat(Array.from({ length: 20 })));
		  }, 500);
	}
  }

  return (
    <div className="App" style={{ width: '300px', margin: 'auto' }}>
      <h1>Infinite Scroll!</h1>
      <InfiniteScroll
        height={250}
        dataLength={list.length}
	    next={loadMore}
	    hasMore={hasMore}
	    loader={<h4>Loading...</h4>}
	    endMessage={
	      <p>
	        <b>End of List</b>
	      </p>
	    }>
          {list.map((_i, index) => (
            <div key={index}>
              #{index}
            </div>
          ))}
	  </InfiniteScroll>
    </div>
  );
}

export default App;
