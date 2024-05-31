import { UsersRound } from 'lucide-react';
import useIsHappy from "../../hooks/useIsHappy";

function HeaderComponent() {
  return (
    <div className="flex glassmorphismheader h-[5%] mr-7 ml-7 p-4 mt-5 rounded-lg">
      <UsersRound size={25} className='mr-3'/>
      <h1 className='tracking-tight align-middle font-bold'>CHAT ROOM</h1>
    </div>
  );
}

export default HeaderComponent;
