const SocialSignInBtn = ({ icon: Icon, bgColor, textColor, text }) => {
  return (
    <div
      className={`w-full text-[${textColor}] font-semibold bg-${bgColor} border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center cursor-pointer`}
    >
      <Icon className={`h-6 mr-2`} />
      {text}
    </div>
  );
};

export default SocialSignInBtn;

// const SocialSignInBtn = ({
//   icon: Icon,
//   bgColor,
//   textColor,
//   text,
//   ...props
// }) => {
//   return (
//     <button
//       {...props}
//       className={`w-full text-${textColor} font-semibold bg-${bgColor} border-2 border-black rounded-md p-4 my-2 text-center flex items-center justify-center`}
//     >
//       {Icon && <Icon size={20} />}
//       <span className="ml-3">{text}</span>
//     </button>
//   );
// };

// export default SocialSignInBtn;
