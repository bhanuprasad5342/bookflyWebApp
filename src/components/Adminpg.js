import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {BsArrowLeftShort } from "react-icons/bs";
import {MdOutlineFlightTakeoff } from "react-icons/md";
import {GiLibertyWing } from "react-icons/gi"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {Link as ScrollLink } from 'react-scroll';
import img1 from '../assets/fli.jpg'







const Admin=() =>{
  const [open ,setOpen]=useState(true);
  const Menua=[
    { id:1,
      title : "Add Flights"},
    { id:2,
      title : "Remove Flights"},
    { id:3,
      title : "View Bookings"},
   ,
  ]

  const [flightNumber, setFlightNumber] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [price, setPrice] = useState('');
  const [bookings, setBookings] = useState([]);
  
  const [flights, setFlights] = useState([]);
  
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const snapshot = await db.collection('flights').get();
        const flightsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlights(flightsData);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const snapshot = await db.collection('bookings').get();
      const bookingsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAddFlight = async () => {
    try {
      const defaultSeats = 60;
      const flightDoc =await db.collection('flights').add({
        flightNumber,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        price,
        seats:defaultSeats,
      });
      const flightRef = flightDoc.id; 
      setFlights(prevFlights => [
        ...prevFlights,
        {
          id: flightRef.id,
          flightNumber,
          departure,
          arrival,
          departureTime,
          arrivalTime,
          price,
          seats: defaultSeats,
        }
      ]);

      console.log('Flight added successfully!');
      // Reset the form fields
      setFlightNumber('');
      setDeparture('');
      setArrival('');
      setDepartureTime('');
      setArrivalTime('');
      setPrice('');
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  const handleRemoveFlight = async (flightId) => {
    try {
      await db.collection('flights').doc(flightId).delete();
      console.log('Flight removed successfully!');
    } catch (error) {
      console.error('Error removing flight:', error);
    }
  };

  const handleViewBookings = async (flightNumber, departureTime) => {
    try {
      const bookingsSnapshot = await db
        .collection('bookings')
        .where('flightNumber', '==', flightNumber)
        .where('departureTime', '==', departureTime)
        .get();

      const bookings = bookingsSnapshot.docs.map((doc) => doc.data());
      console.log('Bookings:', bookings);
    } catch (error) {
      console.error('Error retrieving bookings:', error);
    }
  };




  return (
    
    <div >
    <div className="bg-[#282a35]">
      <header className="bg-[#282a35] border border-gray-500 rounded-2xl ">
        <div className="container mx-auto py-4 px-5 flex justify-between items-center">
        
          <h1 href="/" className="text-white font-bold text-3xl">Bookfly</h1>
          <img className=' mt-2  h-16 w-18 mr-auto ml-8 mb-2' src={img1}  alt="/" />
          <nav>
            <ul className="flex  items-end ">
             
            <li>
              <Link to="/"><button className='p-6 pr-6  text-[#282a35] bg-[#1bb669] w-[115px] rounded-3xl   border-slate-900 font-medium my-auto mx-3 py-3 ml-20'>Sign-out</button></Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </header>
      
      
    </div>
    <div className="flex ">
    <nav className={` bg-[#282a35] text-white h-auto p-5 pt-8  ${open ? "w-72" : "w-20"} duration-500  relative`} >
          <BsArrowLeftShort className={`bg-white text-[#282a35] text-3xl rounded-full absolute -right-3 top-9 border border-[#282a35] cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}></BsArrowLeftShort>
          <div className="inline-flex">
            <MdOutlineFlightTakeoff className="text-3xl mr-4"></MdOutlineFlightTakeoff>
            <h1 className={`text-xl font-medium text-white duration-300 ${!open && "scale-0"} `}>Admin Space</h1>
            
          </div>
          <div>
          <ul className="pt-8 pr-10 font-medium">
                {Menua.map((menu , index) =>(
                  <>

                  <li key={index} className={`flex items-center gap-x-4  cursor-pointer p-2 hover:bg-slate-400 rounded-md mt-6 `}>
                      <span className="text-2xl block float-left">
                        <GiLibertyWing></GiLibertyWing>
                      </span>
                      <ScrollLink to={menu.title} smooth={true} offset={0} duration={300}><span className={`text-base font-medium flex-1 duration-300 ${!open && "hidden"}`}>{menu.title}</span></ScrollLink>
                  </li>
                  </>
                ))
                }
            </ul>
          </div>
    </nav>
    <header className="  text-4xl   items-center mx-auto pl-4 w-full pt-4 pr-4 bg-[#282a35] ">
      <div className=" h-96 items-center bg-white rounded-3xl w-auto mx-auto border-radius-[30px]">
        
        <h1 className=" pl-8 pt-6 font-medium text-[#1e7f17]" id={"Add Flights"}>Add Flights</h1>
        <form className="mb-4 mt-6 text-lg pl-8">
  <div className="flex space-x-4 mb-2">
    <input
      type="text"
      placeholder="Flight Number"
      value={flightNumber}
      onChange={(e) => setFlightNumber(e.target.value)}
      className="px-2 py-1 border rounded w-1/3 text-lg placeholder-stone-900"
    />
    <input
      type="text"
      placeholder="From"
      value={departure}
      onChange={(e) => setDeparture(e.target.value)}
      className="px-2 py-1 border rounded w-1/3 text-lg placeholder-stone-900"
    />
    <input
      type="text"
      placeholder="To"
      value={arrival}
      onChange={(e) => setArrival(e.target.value)}
      className="px-2 py-1 border rounded w-1/3 text-lg placeholder-stone-900"
    />
  </div>
  <div className="flex space-x-4 mb-2">
    <input
      type="text"
      placeholder="Departure Time"
      value={departureTime}
      onChange={(e) => setDepartureTime(e.target.value)}
      className="px-2 py-1 border rounded w-1/3 text-lg placeholder-stone-900"
    />
    <input
      type="text"
      placeholder="Arrival Time"
      value={arrivalTime}
      onChange={(e) => setArrivalTime(e.target.value)}
      className="px-2 py-1 border rounded w-1/3 text-lg placeholder-stone-900"
    />
    <input
      type="text"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="px-2 py-1 border rounded w-1/3 text-lg placeholder-stone-900"
    />
  </div>
  <div className="flex justify-center pt-8">
    <button
      type="button"
      onClick={handleAddFlight}
      className="px-4 py-2 bg-blue-500 text-white rounded text-lg"
    >
      Add Flight
    </button>
  </div>
</form>
      
      </div>

      <div className="h-[150vh] items-center bg-white mx-auto  mt-4 rounded-3xl border-radius-[30px]">
        <h1 id={"Remove Flights"} className="pt-6 pl-8 font-medium text-[#1e7f17] "> Remove Flights </h1>

        <h2 className="text-2xl mb-4 pt-4 pl-8">Flight List</h2>
        <ul>
          {flights.map((flight) => (
            <li key={flight.id} className="flex justify-between items-center mb-4 p-2 pl-8 ">
              <div className='flex'>
                <span className="w-54 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">Flight Number: {flight.flightNumber}</span>
                <span className="w-56 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">From : {flight.departure}</span>
                <span className="w-64 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">To : {flight.arrival}</span>
                <span className="w-54 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">Departure Time : {flight.departureTime}</span>
                <span className="w-54 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">Arrival Time : {flight.arrivalTime}</span>
                <span className="w-54 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">Price : {flight.price}</span>
                <span className="w-54 block text-lg border-[#282a35] border pt-2 pl-2 rounded h-16">Seats avaliable : {flight.seats}</span>
                <button
                  onClick={() => handleRemoveFlight(flight.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded text-lg h-16"
                >
                  Remove
                </button>
                
              
              </div>
              <div>
               
              </div>
              
            </li>
             

          ))}
        </ul>
     

      </div>
      

      <div className="h-[150vh] items-center bg-white mx-auto mt-4  rounded-3xl border-radius-[30px]">
        <h1 id={"View Bookings"} className="font-medium pt-6 pl-8 mb-8 text-[#334d6c]"> View Bookings</h1>

        <ul className='pl-8'>
          {bookings.map((booking) => (
            <li key={booking.id} className="p-2 border rounded mb-2  border-[#282a35]">
            
           <div className="flex">

              <span className="flex-1 text-lg w-54">User Email : {booking.userEmail}</span>
              <span className="flex-1 text-lg w-26">Flight Number: {booking.flightId}</span>
              <span className="flex-1 text-lg w-26">From : {booking.departure}</span>
              <span className="flex-1 text-lg w-26">To : {booking.arrival}</span>
              <span className="flex-1 text-lg w-26">Departure Time : {booking.departureTime}</span>
              <span className="flex-1 text-lg w-26">Arrival Time : {booking.arrivalTime}</span>
              <span className="flex-1 text-lg w-26">Price : {booking.price}</span>
            </div>
            </li>
          ))}
        </ul>
        
      </div>
      
      
      
      
    </header>
    </div>



     <footer className="bg-[#282a35] py-8 h-[320px] border-radius-[30px]">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col">
          <img className="h-16 w-16  mr-auto ml-8 mb-2 mt-2 " src={img1} alt="Logo" />
          <p className="text-gray-200 leading-loose ml-8 mt-8">
            Bookfly<br />
            Phone: (123) 456-7890<br />
            Email: info@yourcompany.com
          </p>
        </div>
        <div className="flex flex-row">
          <a href="#" className="text-gray-500 hover:text-gray-400 mr-4">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-400 mr-4">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-400 mr-4">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-400 pr-4">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="container mx-auto text-center text-gray-500 mt-4">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
    
    
    </div>
  );
}

export default Admin;