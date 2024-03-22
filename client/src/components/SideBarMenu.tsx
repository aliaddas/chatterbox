function SideBarMenu() {
  return (
    <div className="flex flex-col flex-grow bg-primary w-80">
      <div className="w-full h-20 bg-slate-200"></div>
      <div className="w-full flex-grow bg-slate-400">
        <h1 className="text-center">CHATS</h1>
      </div>
      <div className="w-full h-40 bg-slate-200"></div>
    </div>
  );
}

export default SideBarMenu;
