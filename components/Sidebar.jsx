import { assets } from '@/deepseek-assets/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';
const Sidebar = ({ expand, setExpand }) => {

    const {openSignIn} = useClerk()
    const { user } = useAppContext()
    const [openMenu , setOpenMenu] = useState({id : 0, open  : false})
  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all
      z-50 max-md:absolute max-md:h-screen ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}
    >
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Image
          src={expand ? assets.logo_text : assets.logo_icon}
          alt="Logo"
          className={expand ? 'w-36 mb-4' : 'w-10 mb-2'}
        />

        {/* Toggle Button (below logo) */}
        <div
          onClick={() => setExpand(!expand)}
          className="group relative flex items-center justify-center
            hover:bg-gray-500/20 transition-all duration-300 h-9 w-9
            rounded-lg cursor-pointer"
        >
          <Image src={assets.menu_icon} alt="Menu" className="md:hidden" />
          <Image
            src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
            alt="Toggle"
            className="hidden md:block w-7"
          />

          {/* Tooltip */}
          <div
            className={`absolute w-max ${
              expand ? 'top-12 left-1/2 -translate-x-1/2' : '-top-10 left-10'
            } opacity-0 group-hover:opacity-100 transition bg-black
            text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
          >
            {expand ? 'Close sidebar' : 'Open sidebar'}
            <div
              className={`w-3 h-3 absolute bg-black rotate-45 ${
                expand
                  ? 'left-1/2 -top-1.5 -translate-x-1/2'
                  : 'left-2 bottom-[-6px]'
              }`}
            />
          </div>
        </div>
        <button className={`mt-8 flex items-center justify-center cursor-pointer
             ${expand ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max":
                "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
             }`} >

<Image
            className={expand ? 'w-6' : 'w-7'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
          />
                <div className='absolute w-max -top-12 opacity-0 group-hover:opacity-100
                transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg
                pointer-events-none'>
                    New chat 
                    <div className='w-3 h-3 absolute bg-black rotate-45 left-4-bottom-1.5'>

                    </div>
                </div>
                {expand && <p className='text-white text font-medium'>New chat</p>}
        </button>

        <div className={`mt-8 text-white/25 text-sm ${expand ? "block": "hidden"}`}>
            <p className='my-1'>Recents</p>
            <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
      </div>
<div>
    <div className={`flex items-center cursor-pointer group relative
     ${expand ? "gap-1 text-white/80 text -sm p-2.5 border border-primary rounded-lg hover:bg-white cursor-pointer":
        "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
     }`}>

        <Image className={expand ? "w-5": "w-6.4 mx-auto"} src={expand ? assets.phone_icon : assets.phone_icon_dull} alt=''/>
        <div className={`avsolute -top-60 pb-8 ${!expand && "-right-40"}
        opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}>
    <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
        <Image src={assets.qrcode} alt=''className='w-44'/>
        <p> Scan to get Cogniva App</p>
        <div className={`w-3 h-3 absolute bg-blackrotaate-45 ${expand ? "right-1/2" : "left-4"} -bottom-1.5`}></div>
        </div>
        </div>
        {expand && <><span>Get App</span> <Image alt='' src={assets.new_icon}/></>}
</div>
<div  onClick = {user ? null : openSignIn}
className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg)': 'justify-center w-full'}
gap-3 text-white/60 text-sm p-2 cursor-pointer` }>
        {
            user ? <UserButton/>
            : <Image src= {assets.profile_icon} alt='' className='w-7'/>

        }
   
    {expand && <span>My Profile</span>}
</div>


        </div>   
    
    </div>
  );
};

export default Sidebar;
