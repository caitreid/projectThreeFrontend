import React, { useState, useEffect } from 'react';
import { getAllExhibitions } from '../../api/exhibition'
import Card from 'react-bootstrap/Card'
import { Link, Route, Switch } from 'react-router-dom'
import ShowExhibition from './ShowExhibition'



const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  width: '100%'
  
}

const IndexExhibition = (props) => {
  // State to store the departments data
  const [exhibitions, setExhibitions] = useState(null);

    useEffect(() => {
      getAllExhibitions() 
        .then(res => setExhibitions(res.data.exhibitions))
        .catch(err => console.log(err))
  }, []); // Second argument of an empty array means this useEffect will only run once on component mount



  if (!exhibitions) {
    // if no data is loaded yet, display 'loading'
    return <p>Loading...</p>
  } else if (exhibitions.length === 0) {
    // otherwise if there ARE no exhibitions, display that message
    return <p>No exhibitions yet, go add some!</p>
  }

  const { user } = props

  const exhibitionCards = exhibitions.map((exhibition, id) => (
    <div key={id}>
      <Link to={`/exhibitions/${exhibition._id}`} style={{textDecoration: 'none'}}>
          <Card
            className="department__card"
              key={exhibition.id}
              
              style={{
                margin: 20,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                width: '250px',
                height: '200px'

            }}
          >
            <div
              style={{
                
                backgroundImage: `url(${exhibition.img})`,
                backgroundSize: "cover",
                height: "250px",
                width: '300px'
              }}>     
            </div>
        </Card>
            <div className='ms-4' style={{ color: 'black' }}>
                    <div>{exhibition.startDate} - {exhibition.endDate}</div>
            </div>
              <h2 className='ms-4 mb-4'
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginBottom: "5px",
                      color: "#000"
                    }}
                  >
                    {exhibition.title}
              </h2>
        </Link>
    </div>
  )
  );

  return (
    <div className='container-md m-4 p-2'>
        <h2 className='my-2'>Browse by Exhibition</h2>
        {user && (
					<Link className='btn btn-dark my-3' to="/exhibitions/create">Create Exhibition +</Link>
				)} 
        

        <div className="card-container" style= {cardContainerStyle}>
          { exhibitionCards }
        </div>
    </div>
  )
}
export default IndexExhibition

