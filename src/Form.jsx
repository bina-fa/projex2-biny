import { useState } from "react";
import { useForm } from "react-hook-form";

import Map from "./Map";
import "./css/form.css"

function Form() {

   let { register, reset, handleSubmit, formState: { errors, isValid }} = useForm();
   let [ data, setData] = useState([{}]);
   let [ lat, setLat] = useState(31.80461649366907);
   let [ lon, setLon] = useState(34.66327724630701);
 
 function save(){
    reset()
 }


  const ChangeAdress = async(e) => {
   const {value} = e.target;
   console.log( value );

       const response = await fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5 `)
       const res = await response.json();
       console.log("res: " , res);
       setData(res);

       await console.log("data : " , data);       
 }


    return ( 
         <div id='father'>
    <form noValidate onSubmit={handleSubmit(save)}>

       <input type="text"{...register ( "name", { required : 'שדה שם הוא שדה חובה'})} id="nameInput" placeholder="enter name"></input> 
          
          {errors.name && <div className="error">{errors.name.message} </div>}


       <input
        type="text"
         {...register ( "adress", { required : 'שדה כתובת הוא שדה חובה'  })}
        
         id ="adressInput"
         list="options"
          placeholder="adress"
          onChange={ChangeAdress}  
          onSelect={(e) => {
            const selectedValue = e.target.value;
            const selectedItem = data.find(itemm => itemm.display_name === selectedValue);
            if(selectedItem){
              setLat(selectedItem.lat);
              setLon(selectedItem.lon);
              console.log("lat: ", selectedItem.lat,", lon: ", selectedItem.lon);
              
            }
          }}
        >
            </input> 
       {errors.adress && <div className="error">{errors.adress.message} </div>}


       <datalist id = "options">
        {data.map(
          (item, index) => ( 
            <option key={item.osm_id + index} 
            value = {item.display_name}
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
    <Map key = {`${lat}-${lon}`} lat={lat} lon={lon} ></Map>

    </div>
    );
}

export default Form;

