import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Restaurants.css';
import restaurantImg1 from '../../assets/restaurant.jpg';
import restaurantImg2 from '../../assets/restaurant2.jpg';
import restaurantImg3 from '../../assets/restaurant3.jpg';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [restaurantsPerPage] = useState(7);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = [
        { img: restaurantImg1, caption: 'A cozy corner of our restaurant, perfect for a peaceful meal.' },
        { img: restaurantImg2, caption: 'Enjoy your meal with a beautiful view from our patio.' },
        { img: restaurantImg3, caption: 'Delicious cuisine served fresh from our kitchen.' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((slideIndex + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [slides.length, slideIndex]);

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
            <div className='slidshow'>
                <div className="slideshow-container">
                    {slides.map((slide, index) => (
                        <div className={`mySlides fade ${index === slideIndex ? 'active' : ''}`} key={index}>
                            <div className="numbertext">{index + 1} / {slides.length}</div>
                            <img src={slide.img} style={{ width: '100%' }} alt={`Slide ${index + 1}`} />
                            <div className="text">{slide.caption}</div>
                        </div>
                    ))}
                </div>
                <br />
                <div style={{ textAlign: 'center' }}>
                    {slides.map((_, index) => (
                        <span className={`dot ${index === slideIndex ? 'active' : ''}`} key={index}></span>
                    ))}
                </div>
            </div>

            <h1 className='restrauntHeader'>Nearby Restaurants</h1>
            <button onClick={getUserLocation} className='btn5'>Find nearby restaurants</button>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {restaurants.length > 0 ? (
                        <>
                            <ul>
                                {currentRestaurants.map((place, index) => {
                                    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(place.name)}`;
                                    return (
                                        <li key={index} className="restaurant-item">
                                            <h2>{place.name}</h2>
                                            <p><strong>Rating:</strong> {place.rating}</p>
                                            <p><strong>User Rating Total:</strong> {place.user_ratings_total}</p>
                                            <p><strong>Google Map:</strong></p>
                                            <iframe
                                                title={`Map of ${place.name}`}
                                                src={mapUrl}
                                                width="600"
                                                height="450"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                            ></iframe>
                                            <p><strong>Distance:</strong> {place.geometry?.location?.distance || 'N/A'}</p>
                                            <p><strong>Address:</strong> {place.vicinity}</p>
                                        </li>
                                    );
                                })}
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
