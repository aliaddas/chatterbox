function MessageBoxComponent() {
  return (
    <div className="min-h-20 flex bg-slate-300 p-3">
      <div className="h-full w-full bg-slate-200"></div>
      <div>
        <p className="bg-slate-500 m-2 p-2 hover:bg-slate-400 cursor-pointer transition-colors">
          SEND
        </p>
      </div>
    </div>
  );
}

export default MessageBoxComponent;
