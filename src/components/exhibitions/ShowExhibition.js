import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneExhibition, removeExhibition, updateExhibition } from '../../api/exhibition'
import { useNavigate } from 'react-router-dom'
import AddArtworks from './AddArtwork';
import EditExhibitionModal from './EditExhibitionModal';


const ShowExhibition = (props) => {
    const [exhibition, setExhibition] = useState(null)
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    const { msgAlert, user } = props
    console.log('user in ShowExhibition props', user)
    
    const [editModalShow, setEditModalShow] = useState(false)

    // console.log('this is exhibition in ShowExhibition props', exhibition)
    
    const navigate = useNavigate()

    useEffect(() => {
        
        getOneExhibition(id)
            .then((res) => setExhibition(res.data.exhibition))
            .catch(err => console.log('this is err from ShowExhibition: ', err))

        }, [updated])
     
    // if error, display an error

    if (!exhibition) {
        return <p>No exhibitions!</p>

    } else if (exhibition.length === 0) {
        return <p>No exhibitions yet!</p>
    }


    let artCards;

    if (exhibition) {
        if(exhibition.artworks.length > 0) {
            artCards = exhibition.artworks.map((art, id) => (

                <div key={id} >
                    <br/>
                    <img className="exhibition__image" src={art.img}>
                    </img><br/>
                    <span className="exhibition__text--title">
                    {art.title}<br/>
                    </span>
                    <div className="exhibition__text--body">
                    <p>
                    {art.description}
                    </p>
                    <p>{art.date}</p>
                    <p>{art.artist}</p>
                    <p>{art.dimensions}</p>
                    <p>{art.medium}</p>
                    <p>{art.department}</p>
                    
                    </div>
                </div>
 
            ))
        }
    }

    const deleteExhibition =() => {
        removeExhibition(user, exhibition._id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Successfully deleted exhibition',
                    variant: 'success'
                })
            })
            .then(() => {navigate('/exhibitions')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Failed to delete exhibition',
                    variant: 'danger'
                })
            })
    }

    return(
        <div className="container-md">
            <img className="exhibition__image mt-3 mb-4" src={exhibition.img}></img>    
            
            <div style={{
                display: 'inline-block',
                margin: '0 100px'
            }}>
            <span className="exhibition__text--extitle"> {exhibition.title} </span><br/>
            <span className='mb-2'>{exhibition.startDate} - {exhibition.endDate}</span><br/>
            <span>{ exhibition.description }</span>
            </div>
            
            
            <div className="exhibition__cards">
                { artCards }
            </div>
            { 
                user
                ?
                <div>
                    <p>I created this exhibition</p>
                    <button 
                        style={{ backgroundColor: '#a72626', color: 'white'}}
                        className="button button--outline"
                        onClick={() => deleteExhibition()}
                    >    
                        Delete Exhibition 
                    </button>

                    <button 
                        onClick={() => setEditModalShow(true)}
                        className='button button--filled ms-4'>
                            Edit Exhibition
                    </button>

 
                    <AddArtworks
                        msgAlert={msgAlert}
                        exhibition={exhibition}
                        triggerRefresh={() => setUpdated(prev => !prev)}
                    />
                </div>
                :
                <p>I'm logged out / I didn't create this exhibition</p>
            }
            
            <div>
            <EditExhibitionModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateExhibition={updateExhibition}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                exhibition={exhibition}
            />
            </div>
        </div>
    )
}

export default ShowExhibition
