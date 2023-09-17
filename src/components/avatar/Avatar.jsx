const Avatar = ({ username, online, userId }) => {

  const colors = ["bg-blue-400", "bg-teal-400", "bg-indigo-400", "bg-orange-400", "bg-purple-400", "bg-rose-400"];
  const index = parseInt(userId,16)
  let color = parseInt(index/userId.length);
  
  return (
    <div className={`${colors[color]} relative flex items-center justify-center w-8 p-1 rounded-full font-medium`}>
      <div>
        {username[0]}
        {
          online && <div className="absolute bg-green-400 w-[11px] h-[11px] border border-white right-0 bottom-0 rounded-full">
          </div>
        }
      </div>
    </div>
  )
}

export default Avatar