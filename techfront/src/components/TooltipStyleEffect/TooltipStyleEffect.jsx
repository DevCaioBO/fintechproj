const InfoAmount = ({payload, label, active})=>{
    if (active) {
      return (
        <div className="bg-purple-900 border animate-pulse border-purple-800 rounded-2xl p-4">
          <p className="text-white/75">{`${label} : ${payload[0].value}`}</p>
          <p className="text-white">bruh</p>
          <p >----------</p>
        </div>
      );
    }
  
    return null;
  }

export default InfoAmount;