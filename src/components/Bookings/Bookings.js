import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${loggedInUser.email}`, {
            method: "GET",
            headers: {
                "ContentType": "application/json",
                authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h1>You Have {bookings.length} bookings</h1>
            {
                bookings.map(book => <li>Name:{book.name}, From:{(new Date(book.checkIn).toDateString("dd/MM/yyyy"))}, To:{book.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;