import React, { useEffect, useState } from "react";

type forWithSplashComponent = {
children: ()=> Element
}

const renderLoader = ()=> {
    return ( <div> Welcome to Opay </div>)
   }
 
export default function WithSplashscreen({children}:any) {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);


  useEffect(() => {
    try {
      setTimeout(() => setIsAppLoading(false), 4000);
    } catch (e) {
      console.log(e);
      setIsAppLoading(false);
    }
  }, []);
  return <>
  {isAppLoading? renderLoader(): children}
  </>;
}
