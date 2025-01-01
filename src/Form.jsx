import { useState } from "react";
import { useForm } from "react-hook-form";

import Map from "./Map";
import "./css/form.css"

function Form() {

   let { register, reset, handleSubmit, formState: { errors, isValid }} = useForm();
   let [ query, setQuery ] = useState();
   let [ data, setData] = useState([{}]);
   let [ lat, setLat] = useState(31.80461649366907);
   let [ lon, setLon] = useState(34.66327724630701);
 
 function save(){
    reset()
 }


  const ChangeAdress = async(e) => {
   console.log("go in on change");
   const {value} = e.target;
   console.log( value );
   setQuery(value);

       const response = await fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5 `)
       const res = await response.json();
       console.log("res: " , res);
       setData(res);
      //  setLat(result.lat);
      //  setLon(result.lon);
       await console.log("data : " , data);       
 }
  

 const handleAddressSelect = (item) => {
  setLat(item.lat);
  setLon(item.lon);
};

    return ( 
         <>
    <form noValidate onSubmit={handleSubmit(save)}>

       <input type="text"{...register ( "name", { required : 'שדה שם הוא שדה חובה'})} id="nameInput" placeholder="enter name"></input> 
          
          {errors.name && <div className="error">{errors.name.message} </div>}


       <input
        type="text"
         {...register ( "adress", { required : 'שדה כתובת הוא שדה חובה'  })}
         onChange={ChangeAdress}  
         id ="adressInput"
         list="options"
          placeholder="adress">
            </input> 
       {errors.adress && <div className="error">{errors.adress.message} </div>}


       <datalist id = "options">
        {data.map(
          (item, index) => ( 
            <option key={item.osm_id + index} 
            value = {item.display_name}
            onClick={ () => { 
                          debugger;
                            setLat(item.lat),
                              setLon(item.lon)  ,
                               console.log("lat: ", item.lat, "lon : ",item.lon)
                              
                           }}
                        

            >
              {item.display_name}
              </option>
        ) )}
       </datalist>

       <input type="phone" {...register ( "phone", { required :'שדה טלפון הוא שדה חובה'  })} id ="phoneInput" placeholder="phone"></input> 
       {errors.phone && <div className="error">{errors.phone.message} </div>}

       <input type="email"
         {...register("email", {
         required : 'שדה אימייל הוא שדה חובה',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'פורמט אימייל לא נכון'
              }
            })}
             id="emailInput" placeholder="Email"></input> 
        {errors.email && <div className="error">{errors.email.message} </div>}

       <label htmlFor="internet" >{"Need an internet connection?"}</label>
       <input type="Checkbox" name="internet" id="internet"/>

       <label htmlFor="kitchen">{"Need a kitchen?"}</label> 
           <input type="Checkbox" name="kitchen" id="kitchen"/>

       <label htmlFor="coffeeMachine"> {"Need a coffe machine?"}</label>
              <input type="Checkbox"name="coffeeMachine" id="coffeeMachine"/>

       <input type="number" id="numRooms"  defaultValue = {2} placeholder="num rooms"></input> 
       
       <input type="number" id="distance"  placeholder="distance"></input> 

       <input id = "status" defaultValue = {"מחפש"}></input>

       <input type="submit" id="submitButton" value={"save"}/>

    </form>
    <Map lat={lat} lon={lon}></Map>

    </>
    );
}

export default Form;
