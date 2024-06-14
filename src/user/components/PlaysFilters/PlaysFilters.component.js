import { Disclosure } from '@headlessui/react'
import {BiChevronDown,BiChevronUp} from "react-icons/bi";

const PlaysFilter =(props) => {
  return (
    <div className="bg-blue-100 px-2 py-1 mx-auto my-2 rounded-xl">
        <Disclosure>
        {({ open }) => (
            <>
            <Disclosure.Button className="py-2 flex items-center gap-3">
            {open ? <BiChevronUp/> : <BiChevronDown/>}
            
            <span className={open ? "text-pink-500": "text-gray-700"}>
            {props.title}
            </span>

            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500">
                <div className='flex items-center gap-3 flex-wrap'>
                {props.tags.map((tag) => (
                    <>
                    <div className='border-2 border-blue-300 p-1 rounded-md bg-blue-200'>
                        <span className='text-red-600 m-1 text-sm'>{tag}</span>
                    </div>
                    </>
                ))

                }
                </div>
            </Disclosure.Panel>
            </> 
        )}
      
    </Disclosure>
    </div>
    
  )
}

export default PlaysFilter;