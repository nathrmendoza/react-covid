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
  const [currCountry, setCountry] = useState('General');

  //loading states
  const [tblLoad, setTblLoaded] = useState(false);
  const [ttlLoad, setTtlLoaded] = useState(false);

  //pages
  const [itempage, setItemPage] = useState(0);
  const maxitems = 0;

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

    result.map((e, index) => {
      if (typeof e !== 'undefined') {
        //adds name
        e.name = fetchedCountries.countries[index].name;
      }
      return e; 
    });
    
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
  
  //RESET BUTTON FUNCTION
  const showAll = (e) => {
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
          <Table tabledata={tdata} currc={currCountry} loading={tblLoad}/>
        </main>
      </div>
    );
}

export default App;
