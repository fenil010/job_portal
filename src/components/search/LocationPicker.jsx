import { useState, useEffect } from 'react';
import { Button, Select } from '../ui';

const RADIUS_OPTIONS = [
    { value: '', label: 'Any distance' },
    { value: '10', label: 'Within 10 miles' },
    { value: '25', label: 'Within 25 miles' },
    { value: '50', label: 'Within 50 miles' },
    { value: '100', label: 'Within 100 miles' },
];

// Simple city coordinates (would use a geocoding API in production)
const CITY_COORDINATES = {
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'new york': { lat: 40.7128, lng: -74.0060 },
    'austin': { lat: 30.2672, lng: -97.7431 },
    'seattle': { lat: 47.6062, lng: -122.3321 },
    'boston': { lat: 42.3601, lng: -71.0589 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    'denver': { lat: 39.7392, lng: -104.9903 },
    'remote': null,
};

export default function LocationPicker({
    value = '',
    onChange,
    onLocationSelect,
    placeholder = 'City or ZIP code',
    showRadiusFilter = false,
}) {
    const [location, setLocation] = useState(value || '');
    const [radius, setRadius] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (value !== location) {
            setLocation(value || '');
        }
    }, [value]);

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
        onChange?.(newLocation);
    };

    const detectLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsDetecting(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setUserLocation(coords);
                setIsDetecting(false);

                // Find nearest city
                let nearestCity = '';
                let minDistance = Infinity;

                Object.entries(CITY_COORDINATES).forEach(([city, cityCoords]) => {
                    if (!cityCoords) return;
                    const distance = getDistance(coords, cityCoords);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestCity = city;
                    }
                });

                if (nearestCity) {
                    const formattedCity = nearestCity.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    setLocation(formattedCity);
                    onChange?.(formattedCity);
                    onLocationSelect?.({ address: formattedCity, coords });
                }
            },
            () => {
                setIsDetecting(false);
                setError('Unable to detect location. Please enter manually.');
            },
            { timeout: 10000 }
        );
    };

    const clearLocation = () => {
        setLocation('');
        setRadius('');
        setUserLocation(null);
        setError(null);
        onChange?.('');
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-3 bg-[#FAF6F0] border-2 border-[#90353D]/20 rounded-xl text-[#3E2723] placeholder-[#9B8B7E] focus:border-[#90353D] focus:outline-none transition-colors"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B8B7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <Button
                    variant="outline"
                    onClick={detectLocation}
                    disabled={isDetecting}
                    className="flex-shrink-0"
                    title="Use my location"
                >
                    {isDetecting ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <circle cx="12" cy="11" r="3" fill="currentColor" />
                        </svg>
                    )}
                </Button>
            </div>

            {error && (
                <p className="text-xs text-[#C45B5B] flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                </p>
            )}

            {userLocation && (
                <div className="flex items-center gap-2 text-xs text-[#90353D]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Location detected</span>
                    <button type="button" onClick={clearLocation} className="text-[#9B8B7E] hover:text-[#C45B5B]">
                        Clear
                    </button>
                </div>
            )}

            {showRadiusFilter && location && (
                <Select
                    options={RADIUS_OPTIONS}
                    value={radius}
                    onChange={setRadius}
                    placeholder="Select distance"
                />
            )}
        </div>
    );
}

/**
 * Calculate distance between two coordinates in miles
 */
function getDistance(coord1, coord2) {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(deg) {
    return deg * Math.PI / 180;
}

/**
 * Filter jobs by distance from user location
 */
export function filterJobsByDistance(jobs, userCoords, radiusMiles) {
    if (!userCoords || !radiusMiles) return jobs;

    return jobs.filter(job => {
        const jobLocation = job.location?.toLowerCase();
        if (!jobLocation) return true;
        if (job.isRemote || jobLocation.includes('remote')) return true;

        // Find city coordinates
        let jobCoords = null;
        for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
            if (jobLocation.includes(city)) {
                jobCoords = coords;
                break;
            }
        }

        if (!jobCoords) return true; // Include if we can't determine location

        const distance = getDistance(userCoords, jobCoords);
        return distance <= parseFloat(radiusMiles);
    });
}
