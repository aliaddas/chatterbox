type SystemMessageProps = {
  key: string;
  username: string;
};

function SystemMessage({ key, username }: SystemMessageProps) {
  return (
    <h2 className='italic'>{username} has joined the room</h2>
  );
}

export default SystemMessage;