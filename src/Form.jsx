import { useState } from "react";
import { useForm } from "react-hook-form";

import Map from "./Map";
import "./css/form.css"

function Form() {

   let { register, reset, handleSubmit, formState: { errors, isValid }} = useForm();
   let [ data, setData] = useState([{}]);
   let [ lat, setLat] = useState(31.80461649366907);//איפוס הסטיייט בכתובת אחת
   let [ lon, setLon] = useState(34.66327724630701);
 
 function save(){ // פונקציה שתשמור בעתיד את המידע מהטופס
    reset()
 }


  const ChangeAdress = async(e) => { 
   const {value} = e.target;
   console.log( value );

        //שולחת בקשה לשרת על 7 כתובות המתאימות ביותר למידע שהוקלד בינפוט
       const response = await fetch( `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=7 `)
        const res = await response.json(); //json המרת התשובה שהגיעה ל 
       console.log("res: " , res);
       setData(res); // תעדכן את הסטייט 

       await console.log("data : " , data);       
 }


    return ( 
      //in div-father there is two items: form & Map(component) 
         <div id='father'> 
    <form noValidate onSubmit={handleSubmit(save)}>

        {/* name input: */}
       <input type="text"{...register ( "name", { required : 'שדה שם הוא שדה חובה'})} id="nameInput" placeholder="enter name"></input> 
          
          {errors.name && <div className="error">{errors.name.message} </div>}
          

        {/* adress input: */}
       <input
        type="text"
         {...register ( "adress", { required : 'שדה כתובת הוא שדה חובה'  })}
        
         id ="adressInput"
         list="options" //connect to datalist with id "options"
          placeholder="adress"
          onChange={ChangeAdress} //עם שינוי תגש לפונקציה הקוראת למידע מהשרת עם הערך המעודכן שלנו 
          onSelect={(e) => { //בזמן שבחרו משהו שקשור אליך(כלומר: לחצו על אחד האפשרויות בדאטאליסט)
            const selectedValue = e.target.value;
            const selectedItem = data.find(itemm => itemm.display_name === selectedValue);//חפש את הכתובת ע"י שם הכתובת שנכנסת אוטומטית לינפוט
            if(selectedItem){
              setLat(selectedItem.lat);//lot וה ,lon -ותעדכן את הסטייט של ה 
              setLon(selectedItem.lon);
              console.log("lat: ", selectedItem.lat,", lon: ", selectedItem.lon);
              
            }
          }}
        >
            </input> 
       {errors.adress && <div className="error">{errors.adress.message} </div>}


       <datalist id = "options">
        {data.map(
          // option תעבור על כל הכתובות שהגיעו מהשרת (ונמצאים בסטייט )ושים את שם המקום בתוך 
          (item, index) => ( 
            <option key={item.osm_id + index} 
            value = {item.display_name}>
              {item.display_name}
              </option>
        ) )}
       </datalist>

            {/* phone input: */}
       <input type="phone" {...register ( "phone", { required :'שדה טלפון הוא שדה חובה'  })} id ="phoneInput" placeholder="phone"></input> 
       {errors.phone && <div className="error">{errors.phone.message} </div>}

              {/* email input: */}
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

    {/* האם נדרש חיבור לאינטרנט? */}
       <label htmlFor="internet" >{"Need an internet connection?"}</label>
       <input type="Checkbox" name="internet" id="internet"/>

    {/* האם נדרש מטבח? */}
<label htmlFor="kitchen">{"Need a kitchen?"}</label> 
           <input type="Checkbox" name="kitchen" id="kitchen"/>

    {/* האם צריך מכונת קפה? */}

       <label htmlFor="coffeeMachine"> {"Need a coffe machine?"}</label>
              <input type="Checkbox"name="coffeeMachine" id="coffeeMachine"/>
            {/* מספר חדרים*/}
       <input type="number" id="numRooms"  defaultValue = {2} placeholder="num rooms"></input>
       

       <input type="number" id="distance"  placeholder="distance"></input> 

               {/* סטטוס */}
       <input id = "status" defaultValue = {"מחפש"}></input>

       <input type="submit" id="submitButton" value={"save"}/>

    </form>
    {/* קריאה לקומפוננטה MAP ושליחת האלמנטים המעודכנים */}
    <Map key = {`${lat}-${lon}`} lat={lat} lon={lon} ></Map>

    </div>
    );
}

export default Form;

