import axios from "axios";
import { useEffect, useState } from "react";

export function Content() {
  const [schools, setSchools] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentSchool, setCurrentSchool] = useState(<div></div>);

  const handleClick = () => {
    console.log("handling click");
    console.log(searchFilter);
    schools.map((school) => {
      if (school[9] === searchFilter) {
        console.log(school);
        setCurrentSchool(
          <div>
            <h1>{school[9]}</h1>
            <p>Avg math Score: {school[12]}</p>
            <p>Avg writing score: {school[13]}</p>
            <p>TEST {school[11]}</p>
            <p>TEST {school[8]}</p>
          </div>
        );
      }
    });
  };

  const getData = () => {
    axios.get("https://data.cityofnewyork.us/api/views/f9bf-2cp4/rows.json").then((response) => {
      console.log(response.data.data);
      setSchools(response.data.data);
      setLoading(false);
    });
  };
  useEffect(getData, []);
  if (loading) {
    return <div>The page is still loading</div>;
  } else {
    return (
      <div>
        {schools.map((school) => (
         <div key={school[8]}>
          <span>
            <h5><span>{school[12]}</span></h5>
            <h5>{school[13]}</h5>
          </span>  
         </div>
       ))}
        <input
          type="text"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
          list="names"
        />
        <datalist id="names">
          {schools.map((school) => (
            <option>{school[9]}</option>
          ))}
        </datalist>
        <button onClick={handleClick}>Get scores</button>
        {currentSchool}
      </div>
    );
  }
}
