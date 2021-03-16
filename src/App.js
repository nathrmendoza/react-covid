import './App.css';
import {useEffect, useState} from 'react'
import Filter from './components/Filter/Filter'
import Table from './components/TableStats/Table'
import {fetchData, fetchCountries, fetchByCountry} from './api'

function App() {

  const [tdata, setData] = useState([]);
  const [cdata, setCountries] = useState([]);
  const [currCountry, setCountry] = useState('Philippines');
  const [isLoaded, setLoaded] = useState(false);

  //fetching data
  useEffect(()=> {
    const fetchApi = async () => {
      // const fetchedData = await fetchData();
      const fetchedCountries = await fetchCountries();
      const fetchedCountry = await fetchByCountry(currCountry);

      // setData(fetchedData);
      setCountries(fetchedCountries.countries);
      setData(fetchedCountry);
      setLoaded(true);
    }

    fetchApi();
  },[]);

  //fetch by country
  const fetchCountry = async filt => {
    setLoaded(false)
    const fetchedCountry = await fetchByCountry(filt);

    setData(fetchedCountry);
    setLoaded(true)
  }

  //fetch all country 
  const fetchAllCountry = async() => {
    return Promise.all(cdata.map(item => {
      let test = fetchByCountry(item.name);
      test.name = item.name;
      return test;
    }));
  }

  //filter function
  const executeFilter = (e) => {
    if (e !== 'General') {
      setLoaded(false)
      setCountry(e);
      fetchCountry(e);
    }

    //if general fetch all
    else {
      //reset and set
      setLoaded(false);
      setData([]);

      const getAllData = async() => {
        const result = await fetchAllCountry()
        setData(result);
        setLoaded(true);
      }

      getAllData();
      console.log(tdata);
    }
  }

  if(isLoaded) {
    return (
      <div className="App">
        <h1>Covid-19 Statistics</h1>
        <Filter filterdata={cdata} dofilter={executeFilter} currval={currCountry}/>
        <Table tabledata={tdata} currc={currCountry}/>
      </div>
    );
  } else {
    return <div>Loading...</div>
  }
}

export default App;
