const Loading =()=>{

    return(
        <div className="flex z-20 items-center justify-center bg-black/90 fixed w-full h-screen ">
         <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce"></div>
  <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce [animation-delay:200ms]"></div>
  <div className="w-5 h-5 bg-green-500 rounded-full animate-bounce [animation-delay:400ms]"></div>

        </div>
    )
}

export default Loading;