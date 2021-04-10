import './App.css';
import {useEffect, useState} from 'react'

import {fetchData, fetchCountries, fetchByCountry} from './api'

import Filter from './components/Filter/Filter'
import Table from './components/TableStats/Table'
import TotalStats from './components/TotalStats/TotalStats'
import Pagination from './components/TableStats/Pagination'

function App() {
  const [totals, setTotals] = useState([]);
  const [tdata, setData] = useState([]);
  const [cdata, setCountries] = useState([]);
  const [currCountry, setCountry] = useState('General');

  //loading states
  const [tblLoad, setTblLoaded] = useState(false);
  const [ttlLoad, setTtlLoaded] = useState(false);

  //pages
  const [currentPage, setCurrentPage] = useState(1);
  const maxItems = 15;
  const [indexLastItem, setLastItemIndex] = useState(currentPage * maxItems);
  const [indexFirstItem, setFirstItemIndex] = useState(indexLastItem - maxItems);
  const [pageNumbers,setPagenumbers] = useState([]);
  const [pnumload, setPLoad] = useState(false);


  //fetching data
  useEffect(()=> {
    const fetchApi = async () => {
      const fetchTotals = await fetchData();
      const fetchedCountries = await fetchCountries();

      setTotals(fetchTotals);
      setCountries(fetchedCountries.countries);

      getAllData();
      setTtlLoaded(true);
    }

    fetchApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  //FETCH BY SPECIFIC COUNTRY
  const fetchCountry = async filt => {
    setTblLoaded(false);
    const fetchedCountry = await fetchByCountry(filt);

    setData(fetchedCountry);
    setTblLoaded(true)
  }

  //FETCH ALL DATA PER COUNTRY
  const fetchAllCountry = async() => {
    const fetchedCountries = await fetchCountries();

    return Promise.all(fetchedCountries.countries.map(item => {
      let test = fetchByCountry(item.name);
      return test;
    }));
  }

  //ADDS NAMES TO FETCHED ALL
  const getAllData = async() => {
    const result = await fetchAllCountry();
    const fetchedCountries = await fetchCountries();

    //ADDS NAME TO FETCHED DATA
    result.map((e, index) => {
      if (typeof e !== 'undefined') {
        //adds name
        e.name = fetchedCountries.countries[index].name;
      }
      return e; 
    });

    //PAGINATION LOGIC DIVDE
    // const paginatedTodos = result.slice(indexFirstItem, indexLastItem);

    // //PAGE NUMBERS
    // let temppagenum = pageNumbers;
    // for (let i = 0; i < Math.ceil(result.length / maxItems); i++) {
    //   temppagenum.push({value : i+1, state : false})
    // }
    // setPagenumbers(temppagenum);
    // setPLoad(true);
    
    setData(result);
    setTblLoaded(true);
  }

  //EXECUTE PAGINATE
  const executePaginate = async(e) => {
    
    let temppagenum = pageNumbers;
    temppagenum.map(n=>{
      if (n.value === e.target.id) {
        n.state = true;
      }
    });
    setPagenumbers(temppagenum);

    e.preventDefault();
    setCurrentPage(e.target.id);

    const result = await fetchAllCountry();
    const fetchedCountries = await fetchCountries();

    //ADDS NAME TO FETCHED DATA
    result.map((e, index) => {
      if (typeof e !== 'undefined') {
        //adds name
        e.name = fetchedCountries.countries[index].name;
      }
      return e; 
    });

    
    let lastIndex = e.target.id * maxItems;
    let firstIndex = lastIndex - maxItems;

    const paginatedTodos = result.slice(firstIndex, lastIndex);

    setData(paginatedTodos);
  }


  //FILTER FUNCTION
  const executeFilter = (e) => {
    if (e !== 'General') {
      setTblLoaded(false);
      fetchCountry(e);
    }

    //if GENERAL fetch all
    else {
      //reset and set
      setTblLoaded(false);
      setData([]);

      getAllData();
    }
    setCountry(e);
  }
  
  //RESET BUTTON FUNCTION
  const showAll = (e) => {
    e.preventDefault();
    //reset and set
    setTblLoaded(false);
    setData([]);

    getAllData();
    setCountry('General')
  }

    return (
      <div className="App">
        <header>
        <h1><span className="color-r">Covid-19</span> Statistics</h1>
        </header>
        <main>
          <TotalStats totaldata={totals} loading={ttlLoad}/>
          <Filter filterdata={cdata} dofilter={executeFilter} currval={currCountry} resetfunc={showAll}/>
          <Table tabledata={tdata} currc={currCountry} loading={tblLoad} />
          {/* <Pagination pagenums={pageNumbers} paginate={executePaginate} loading={pnumload}/> */}
        </main>
      </div>
    );
}

export default App;
