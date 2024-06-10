"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect } from "react";
import Loader from "@/components/common/Loader";
import { useUser, UserProvider } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';
import SignIn from "./loginpage";
import LoginApi from "@/store/user/loginAuth0";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body suppressHydrationWarning={true}>
          <AuthWrapper>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {children}
              <a href="/api/auth/logout">Logout</a>
            </div>
          </AuthWrapper>
        </body>
      </UserProvider>
    </html>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, error, isLoading } = useUser();
  const [isDataAvailable, setIsDataAvailable] = React.useState(false);
  const [stopLoader, setStopLoader] = React.useState(false);




  useEffect(() => {
    if (user) {
      console.log('User:', user)
      const validateUserSpf = async () => {
        try {
          const isUserExistSpf = await LoginApi(user.email);

          if(isUserExistSpf.data?.data.loginSpf.status != -6){
            setIsDataAvailable(true);

          }
          else{
            setIsDataAvailable(false);
            setStopLoader(true);

            alert('Sorry, the user account does not exist. Please contact the system administrator for assistance.');
          }
          console.log("isUserExistSpf:", isUserExistSpf);


        } catch (error) {
          console.error("Error fetching isUserExistSpf:", error);
        }
      };

      validateUserSpf();
    }
  }, [user]);
  
  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>{error.message}</div>;



  
  return (
    <>
      {user ? isDataAvailable ? children  : stopLoader ? <SignIn/> : <Loader/>: <SignIn />}
    </>
  );
}
