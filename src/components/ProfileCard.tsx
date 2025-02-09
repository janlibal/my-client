import { iProfile } from '@/api/modules/search/interfaces/search.interface'
import Image from 'next/image'

//Import the profile interface from data.js

export const ProfileCard = (props: iProfile) => {
  const { name, email, username, role } = props

  return (
    <div className="profile__card rounded-[15px] border border-solid">
      <div className=" bg-slate-300 p-3">
        <h2 className="">Name: {name}</h2>

        <p>Role: {role}</p>

        <p>Email: {email}</p>

        <p>follow @{username}</p>
      </div>
    </div>
  )
}
