import { useForm } from "react-hook-form";
import "./css/form.css"
import { useState } from "react";

  
function Form() {


   let { register, reset, handleSubmit, formState: { errors, isValid }} = useForm();
   let [ query, setQuery ] = useState();
   let [ data, setData] = useState([{}]);

 function save(){
    reset()
 }
  // function updateMap(){
  //   <Map/>
  // }
 
    const ChangeAdress = async(e) => {
   console.log("go in on change");
   console.log( e.target.value );
   setQuery(e.target.value);

  //  fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5` )//איך ניגשים לתוך המערך שנמצא באובייקט promise
  //  .then( 
  //      (res) => {res = res.json();
  //        console.log(res);
  //        setdata(res);
  //        console.log("addressArray", res.arrayBuffer)
  //        console.log("data: ", data);
  //        const addressArray = res.data; 
  //        console.log("addressArray", addressArray);

  //      })
     
       const response = await fetch( ` https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`)
       const res = await response.json()
       console.log("res: " , res);
       setData(res);
       console.log("data : " , data);
       
 }
  

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


       <datalist id = "options" >
        {data.map(
          (item) => ( 
            <option key={item.osm_id} >
              {item.display_name}
              </option>
        ) )}
       </datalist>
       {/* onClick={ <Map lat ={item.lat} lon = {item.lon}/> } */}

       <input type="phone" {...register ( "phone", { required :'שדה טלפון הוא שדה חובה'  })} id ="phoneInput" placeholder="phone"></input> 
       {errors.phone && <div className="error">{errors.phone.message} </div>}

       <input type="email"
         {...register("email", {
         required: true, message: 'שדה אימייל הוא שדה חובה',
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

       <input type="number" id="numRooms" defaultValue = {2} placeholder="num rooms"></input> 
       
       <input type="number" id="distance"  placeholder="distance"></input> 

       <input id = "status" value={"מחפש"}></input>

       <input type="submit" id="submitButton" value={"save"}/>

    </form>

    </>
    );
}

export default Form;
