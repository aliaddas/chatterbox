import useIsHappy from "../../hooks/useIsHappy";

function HeaderComponent() {
  const happiness = useIsHappy();

  return (
    <div className="bg-secondary p-4 border-b-2 flex border-accent">
      {happiness.isHappy ? "🙂" : "🙁"}
      <img
        src="https://cdn-icons-png.flaticon.com/512/681/681494.png"
        alt=""
        className="w-10"
      />
      <h1>DM CHAT NAME</h1>
    </div>
  );
}

export default HeaderComponent;
