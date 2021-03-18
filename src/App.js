import './App.css';
import {useEffect, useState} from 'react'

import {fetchData, fetchCountries, fetchByCountry} from './api'

import Filter from './components/Filter/Filter'
import Table from './components/TableStats/Table'
import TotalStats from './components/TotalStats/TotalStats'

function App() {
  const [totals, setTotals] = useState([]);
  const [tdata, setData] = useState([]);
  const [cdata, setCountries] = useState([]);
  const [currCountry, setCountry] = useState('Philippines');

  //loading states
  const [tblLoad, setTblLoaded] = useState(false);
  const [ttlLoad, setTtlLoaded] = useState(false);

  //fetching data
  useEffect(()=> {
    const fetchApi = async () => {
      const fetchTotals = await fetchData();
      const fetchedCountries = await fetchCountries();
      const fetchedCountry = await fetchByCountry(currCountry);

      setTotals(fetchTotals);
      setCountries(fetchedCountries.countries);

      setData(fetchedCountry);
      
      setTblLoaded(true);
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
    return Promise.all(cdata.map(item => {
      let test = fetchByCountry(item.name);
      return test;
    }));
  }

  //ADDS NAMES TO FETCHED ALL
  const getAllData = async() => {
    const result = await fetchAllCountry();
    //adds name
    result.map((e, index) => {
      if (typeof e !== 'undefined') {
        e.name = cdata[index].name;
      } 
      return console.log(e)})
    setData(result);

    setTblLoaded(true);
  }


  //FILTER FUNCTION
  const executeFilter = (e) => {
    if (e !== 'General') {
      setTblLoaded(false)
      setCountry(e);
      fetchCountry(e);
    }

    //if GENERAL fetch all
    else {
      //reset and set
      setTblLoaded(false);
      setData([]);

      getAllData();
    }
  }
  

  const showAll = (e) => {
    //reset and set
    setTblLoaded(false);
    setData([]);

    getAllData();
  }

    return (
      <div className="App">
        <h1>Covid-19 Statistics</h1>
        <TotalStats totaldata={totals} loading={ttlLoad}/>
        <Filter filterdata={cdata} dofilter={executeFilter} currval={currCountry} resetfunc={showAll}/>
        <Table tabledata={tdata} currc={currCountry} loading={tblLoad}/>
      </div>
    );
}

export default App;
