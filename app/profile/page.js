'use client'
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Profile from '@components/profile';

const MyProfile = () => {

    const handleDelete = () => {

    }
    const handleEdit = () => {

    }

  return (
    <Profile
        name='My Profile'
        desc='Welcome to your personalized profile'
        data={[]}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;