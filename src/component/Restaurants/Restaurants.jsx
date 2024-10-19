import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Restaurants.css';
import './Slideshow.css';
import restaurantImg1 from '../../assets/restaurant.jpg';
import restaurantImg2 from '../../assets/restaurant2.jpg';
import restaurantImg3 from '../../assets/restaurant3.jpg';
import { InfinitySpin } from 'react-loader-spinner';
import Slideshow from './SLIDESHOW';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurantsPerPage] = useState(6);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchNearbyRestaurants = (latitude, longitude) => {
        const options = {
            method: 'GET',
            url: 'https://google-map-places.p.rapidapi.com/maps/api/place/nearbysearch/json',
            params: {
                location: `${latitude},${longitude}`,
                radius: '10000',
                type: 'restaurant',
                language: 'en',
                opennow: 'true',
                rankby: 'prominence'
            },
            headers: {
                'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
                'x-rapidapi-key': '2d976a9e74mshe0117e413d61c93p19f005jsna9065aa66056'
            }
        };

        axios.request(options)
            .then((response) => {
                console.log(response.data.results);
                setRestaurants(response.data.results || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to fetch restaurants.');
                setLoading(false);
            });
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchNearbyRestaurants(latitude, longitude);
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    setError('Could not get your location.');
                    setLoading(false);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='restrauntsDiv'>
            <Slideshow />
            <h1 className='restrauntHeader'>Nearby Restaurants</h1>
            <button onClick={getUserLocation} className='btn5'>Find nearby restaurants</button>
            {loading ? (
                <center>
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#00d4ff"
                        ariaLabel="infinity-spin-loading"
                    />
                </center>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {restaurants.length > 0 ? (
                        <>
                            <ul className='restaurantsList'>
                                {currentRestaurants.map((place, index) => (
                                    <li key={index} className="restaurant-item">
                                        <h2 className='restairantName'>{place.name}</h2>
                                        <p><strong>Rating:</strong> {place.rating}</p>
                                        <p><strong>User Rating Total:</strong> {place.user_ratings_total}</p>
                                        <p>
                                            <strong>Google Map Link:</strong> {place.photos ? (
                                                <span className='googleMapLink' dangerouslySetInnerHTML={{
                                                    __html: place.photos[0].html_attributions[0].replace('<a ', '<a target="_blank" rel="noopener noreferrer" ')
                                                }} />
                                            ) : 'N/A'}
                                        </p>
                                        <p><strong>Address:</strong> {place.vicinity}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className='buttons'>
                                {Array.from({ length: Math.ceil(restaurants.length / restaurantsPerPage) }, (_, index) => (
                                    <button className='btn5' key={index + 1} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        null
                    )}
                </>
            )}
        </div>
    );
};

export default Restaurants;
