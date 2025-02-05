import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import api from '../../config/axios';
import './ShowroomLocator.css';

const ShowroomLocator = () => {
  const [showrooms, setShowrooms] = useState([]);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    city: '',
    services: []
  });

  useEffect(() => {
    getUserLocation();
    fetchShowrooms();
  }, [filters]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const fetchShowrooms = async () => {
    try {
      const { data } = await api.get('/showrooms', {
        params: {
          ...filters,
          latitude: userLocation?.lat,
          longitude: userLocation?.lng
        }
      });
      setShowrooms(data);
    } catch (error) {
      console.error('Error fetching showrooms:', error);
    }
  };

  return (
    <div className="showroom-locator">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by city"
          value={filters.city}
          onChange={e => setFilters({ ...filters, city: e.target.value })}
        />
        <select
          value={filters.brand}
          onChange={e => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">All Brands</option>
          <option value="Mahindra">Mahindra</option>
          <option value="John Deere">John Deere</option>
          <option value="Sonalika">Sonalika</option>
        </select>
      </div>

      <div className="map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
          <GoogleMap
            center={userLocation || { lat: 20.5937, lng: 78.9629 }}
            zoom={12}
          >
            {showrooms.map(showroom => (
              <Marker
                key={showroom.id}
                position={{
                  lat: showroom.location.latitude,
                  lng: showroom.location.longitude
                }}
                onClick={() => setSelectedShowroom(showroom)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {selectedShowroom && (
        <div className="showroom-details">
          <h3>{selectedShowroom.name}</h3>
          <p>{selectedShowroom.address}</p>
          <p>Contact: {selectedShowroom.phone}</p>
          <div className="services">
            <h4>Services:</h4>
            <ul>
              {selectedShowroom.services.map(service => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <button onClick={() => window.open(`tel:${selectedShowroom.phone}`)}>
            Call Showroom
          </button>
        </div>
      )}

      <div className="showroom-list">
        {showrooms.map(showroom => (
          <div
            key={showroom.id}
            className={`showroom-card ${selectedShowroom?.id === showroom.id ? 'selected' : ''}`}
            onClick={() => setSelectedShowroom(showroom)}
          >
            <h3>{showroom.name}</h3>
            <p>{showroom.address}</p>
            <p>{showroom.distance} km away</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowroomLocator;