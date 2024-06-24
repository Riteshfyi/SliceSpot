import React from 'react'
import AdminNav from '../components/AdminNav'
import AdminMenuItem from '../components/AdminMenuItem'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getMenu } from '../store/Slices/PizzaSlice'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'

function AdminView() {
 const dispatch =  useDispatch();
 const pizzaInfo = useSelector(state => state.shop.pizzaInfo);
 const role = useSelector((state) => state.app.role);
 const showSpinner = useSelector((state) => state.shop.isLoading);
 useEffect(() => {

  if(role === 'Admin'){

    dispatch(getMenu());
  }
},[role]);


//   showSpinner ? (<div className="h-[90vh] flex flex-rol justify-center items-center"><Spinner/></div>) :
  return (
    <div className=''>
     {
      
        <div>
           {(role!=="Admin") && 
        <div>Forbidden Access</div>
           
     }

        {(role==="Admin") && 
        <div className="min-h-screen flex flex-col">
            <AdminNav/>
           
        {
          showSpinner ? (<div className="h-[90vh] flex flex-rol justify-center items-center"><Spinner/></div>) : (
             <div className='grow bg-secondary'>
            <div>
            <div className='font-bold text-3xl flex flex-row justify-center mt-3'><span>Menu</span></div>
          {pizzaInfo.map((pizza) => (
          <AdminMenuItem
           key={pizza._id}
            id={pizza._id}
            name={pizza.name}
            image={pizza.image}
            price={pizza.price}
            size={pizza.size}
          />
        ))}
        </div>
          </div>
          )
        }


        </div>

        }
        </div>
      
     }
    </div>
  )
}

export default AdminView