import React, { useState, useEffect } from 'react';
import {BsArrowLeftShort } from "react-icons/bs";
import {MdOutlineFlightTakeoff } from "react-icons/md";
import {GiLibertyWing } from "react-icons/gi"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import { db,auth } from '../firebase';

import img1 from '../assets/fli.jpg'







const Userpg=() =>{
  const [open ,setOpen]=useState(true);
  const Menua=[
    { id:1,
      title : "Search and Book Tickets"},
    { id:2,
      title : "View Bookings"},
   
   ,
  ]

  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  
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
  }, []);
  
  
  const handleBookFlight = async (flightId, flightDetails) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const { email } = user;
        await db.collection('bookings').add({
          userEmail: email,
          flightId,
          ...flightDetails, // Include additional flight details
        });
        console.log('Flight booked successfully!');
        // Decrement seatsAvailable by 1
        const updatedSeatsAvailable = flightDetails.seats - 1;
        updateSeatsAvailable(flightId, updatedSeatsAvailable);

        
        fetchUserBookings();
      }
    } catch (error) {
      console.error('Error booking flight:', error);
    }
  };
  const fetchUserBookings = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Get the user's email ID
        const { email } = user;
        // Fetch the bookings from the database based on the user's email
        const bookingsSnapshot = await db
          .collection('bookings')
          .where('userEmail', '==', email)
          .get();

        const bookingsData = bookingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
        
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  const updateSeatsAvailable = async (flightId, seats) => {
    try {
      await db.collection('flights').doc(flightId).update({
        seats: seats,
      });
    } catch (error) {
      console.error('Error updating seatsAvailable:', error);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const handleViewBookings = () => {
    fetchUserBookings();
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
            <h1 className={`text-xl font-medium text-white duration-300 ${!open && "scale-0"} `}>User Space</h1>
            
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
      <div className=" h-[170vh] items-center bg-white rounded-3xl w-auto mx-auto border-radius-[30px]">
        
        <h1 className=" pl-8 pt-6 font-medium text-[#1e7f17]" id={"Search and Book Tickets"}>Search and Book Tickets</h1>
        
        <h3 className='pt-4 pl-8'>Here are the available flights for booking:</h3>

      <div className="  p-4 pt-6 pl-10">
        
        <ul>
          {flights.map((flight) => (
            <li key={flight.id} className="flex justify-between items-center mb-4 p-2 border rounded border-[#282a35]">
              <div className='flex'>
                <span className="flex-1 text-lg w-56 pl-4 pr-8">Flight Number: {flight.flightNumber}</span>
                <span className="flex-1 text-lg w-38 pl-4 pr-8">Departure: {flight.departure}</span>
                <span className="flex-1 text-lg w-38 pl-4 pr-8">Arrival: {flight.arrival}</span>
                <span className="flex-1 text-lg w-38 pl-4 pr-8">Departure Time: {flight.departureTime}</span>
                <span className="flex-1 text-lg w-38 pl-4 pr-8">Arrival Time: {flight.departureTime}</span>
                <span className="flex-1 text-lg w-38 pl-4 pr-8">Price: {flight.price}</span>
                <span className="flex-1 text-lg w-38 pl-4 pr-8">Seats Available: {flight.seats}</span>

              </div>
              <button
                 //onClick={() => updateSeatsAvailable(flight.id, flight.seats)}

                 onClick={() => handleBookFlight(flight.id, {
                  arrival: flight.arrival,
                  departure: flight.departure,
                  departureTime: flight.departureTime,
                  arrivalTime: flight.arrivalTime,
                  price: flight.price,
                  seats:flight.seats,
                })}
                className="px-4 py-2 bg-green-500 text-lg text-white rounded"
              >
                Book Flight
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      </div>

      <div className="h-[200vh] items-center bg-white mx-auto  mt-4 rounded-3xl border-radius-[30px]">
        <h1 id={"View Bookings"} className="pt-6 pl-8 font-medium text-[#1e7f17] ">View Bookings</h1>
        <div className=" p-4 mt-4 pl-8 ">
        
        <button
          onClick={handleViewBookings}
          className="px-4 py-2 bg-blue-500 text-white rounded text-lg mb-6"
        >
          View Bookings
        </button>
        <ul>
          {bookings.map((booking) => (
           <li key={booking.id} className="p-2 border rounded mb-2 border-[#282a35]">
           <div className="flex">
             <span className="flex-1 text-lg w-26">Flight ID: {booking.flightId}</span>
             <span className="flex-1 text-lg">Departure: {booking.departure}</span>
             <span className="flex-1 text-lg">Arrival: {booking.arrival}</span>
             <span className="flex-1 text-lg">Departure Time: {booking.departureTime}</span>
             <span className="flex-1 text-lg">Arrival Time: {booking.arrivalTime}</span>
             <span className="flex-1 text-lg">Price: {booking.price}</span>
           </div>
         </li>
          ))}
        </ul>
      </div>
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

export default Userpg;