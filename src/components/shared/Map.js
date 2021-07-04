import React, {useEffect, useState} from "react";
import Geocode from "react-geocode";

const {compose} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");



Geocode.setApiKey("AIzaSyABicyLIdgzNEFYqLFEjXdzKnXM0TlysaM");
Geocode.enableDebug();

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)(props => {
        const [pos, setPos] = useState({lat: props.current.lat||0, lng: props.current.lng||0});
        const [address, setAddress] = useState("");

        useEffect(() => {
            Geocode.fromLatLng(pos.lat, pos.lng).then(
                response => {
                    console.log(response)
                    setAddress(response.results[0].formatted_address)
                },
                error => {
                    console.error(error);
                }
            );

            props.changeCoordinates(pos,address)
        }, [pos]);

        useEffect(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setPos({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                });
            } else {
                alert("Geolocation is not supported by this browser!");
            }
        }, []);


        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={pos}
                onClick={e => {
                    setPos({lat: e.latLng.lat(), lng: e.latLng.lng()})
                }}
            >
                <Marker
                    position={pos}
                />
            </GoogleMap>
        )
    }
);

export default function Map(props) {
    const {changeCoordinates,current, ...rest} = props;

    return (
        <MapWithAMarker
            {...props}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyABicyLIdgzNEFYqLFEjXdzKnXM0TlysaM&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `400px`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
        />
    )
}
