import { useForm } from "react-hook-form";
import "./css/form.css"
import { useState } from "react";


  
function Form() {



   let possibleAdresses = []
   let { register, reset, handleSubmit, formState: { errors, isValid }} = useForm();
   let [ query, setQuery ] = useState([]);




  

   

 function save(){
    reset()
 }
 
 function ChangeAdress(e){
   console.log("go in on change")
   setQuery(e.target.value);
   fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5` )
   .then( 
       (res) =>{res = res.json()
         console.log(res)
         console.log(res)

         // for (let i = 0; i < res.length; i++) {
         //    possibleAdresses + res[i] ;
            
         // }
         // console.log( "possibleAdresses" + possibleAdresses[0])
       })
        
 }
    
    return ( 
         <>
    <form noValidate onSubmit={handleSubmit(save)}>
       <input type="text"{...register ( "name", { required : 'שדה שם הוא שדה חובה'})} id="nameInput" placeholder="enter name"></input> 
          
          {errors.name && <div className="error">{errors.name.message} </div>}


       <input type="text" {...register ( "adress", { required : 'שדה כתובת הוא שדה חובה'  })}onChange={ChangeAdress}  id ="adressInput" placeholder="adress"></input> 
       {errors.adress && <div className="error">{errors.adress.message} </div>}

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

       <label htmlFor="internet" value = "need connecting to internet?"/>
       <input type="Checkbox" name="internet" id="internet"/>

       <label htmlFor="kitchen" value = "need a kitchen?"/> 
           <input type="Checkbox" name="kitchen" id="kitchen"/>

       <label htmlFor="coffeeMachine" value = "need a coffe machine?"/>
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