'use client'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = false;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  // useEffect(async() => {
  //     const response = await getProviders(providers);
  //     setProviders(response);

  // }, [])

  
  return (
    <nav className='flex-between w-full mb-16 pt-4'>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image 
                src='/assets/images/logo.svg'
                alt='Promptia Logo'
                height={30}
                width={30}
                className='object-contain'
            />
            <p className='logo_text'>Promptia</p>
        </Link>
        {/* Desktop Nav */}
        <div className='sm:flex hidden'>
{isUserLoggedIn ? (
  <div className='flex gap-3 md:gap-5'>
    <Link href='/create-prompt' className='black_button'>
      Create Post
    </Link>
    <button type='button' onClick={signOut} className='outline_btn'>
      Sign Out 
    </button>
    <Link href='/profile' className=''>
      <Image
      src='/assets/images/logo.svg'
      width={37}
      height={37}
      className='rounded-full'
      alt='profile'
      />
    </Link>
  </div>
): (
  <>
  {providers && Object.values(providers).map(provider => (
    <button
    type='button'
    key={provider.name}
    onClick={() => signIn(provider.id)}
    className='black_button'
    >
      Sign In
    </button>
  ))}
  </>
)}
        </div>

{/* Mobile Nav */}
<div className='sm:hidden flex relative'>
  {isUserLoggedIn ? (
    <div className='flex'>
      <Image
      src='/assets/images/logo.svg'
      width={37}
      height={37}
      onClick={()=> setToggleDropdown(prev=>!prev)}
      className='rounded-full'
      alt='profile'
      />
  {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}    </div>

  ) : (
    <>
      {providers && Object.values(providers).map(provider => (
    <button
    type='button'
    key={provider.name}
    onClick={() => signIn(provider.id)}
    className='black_button'
    >
      Sign In
    </button>
  ))}
  </>
  )}
</div>
    </nav>
  )
}

export default Nav
