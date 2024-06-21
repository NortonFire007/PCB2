const LoginBtn = ({ bgColor, textColor, text }) => {
  return (
    <button
      className={`w-full ${textColor} font-semibold bg-[${bgColor}] rounded-md p-4 my-2 text-center flex items-center justify-center`}
    >
      {text}
    </button>
  );
};

export default LoginBtn;
