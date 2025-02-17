interface PopUpType{
    message: string
}

const PopUp = ({message}: PopUpType) => {
  return (
    <div
        className="popup-animation absolute top-5 left-1/2 -translate-x-1/2 bg-white/15 px-4 py-5 rounded border text-white
        flex justify-center items-center tarnsition"
        >
            {message}
    </div>
  );
};

export default PopUp;