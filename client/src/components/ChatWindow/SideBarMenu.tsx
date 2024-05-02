import useProfileContext from '../../hooks/useProfileContext';

function SideBarMenu() {
  const { username, submitUsername } = useProfileContext();

  const handleSubmit = () => {
    submitUsername("");
  }

  return (
    <div className="flex flex-col w-1/6 bg-primary">
      <div className="w-full h-16 bg-slate-200"></div>
      <div className="w-full flex-grow bg-slate-400">
        <h1 className="text-center">CHATS</h1>
        <p>Userame: {username}</p>
      </div>
      <button onClick={handleSubmit}>Logout</button>
      <div className="w-full h-40 bg-slate-200"></div>
    </div>
  );
}

export default SideBarMenu;
