import { useEffect, useState } from 'react';
import { client } from 'api/client';
import { GetUserDetailsByIdDocument } from 'gql/_generated';

const useUserData = (userID) => {
  const [dataUser, setUserData] = useState(null);
  const [errorUser, setError] = useState(null);
  const [isLoadingUser, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData(userID);
        setUserData(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Clean up function
    return () => {
      // Any cleanup code if necessary
    };
  }, [userID]);

  return { dataUser, errorUser, isLoadingUser };
};

const fetchUserData = async (userID) => {
  // Here you can perform your data fetching logic, for example:
  const response = await client.request(GetUserDetailsByIdDocument,{userID})
  // console.log('response',response?.users?.nodes)
  return response?.users?.nodes;
};

export default useUserData;
     
    //  In the code above, we defined a custom hook called  useUserData  that takes a  userID  as an argument and returns an object with three properties:  userData ,  error , and  isLoading . 
    //  The  useUserData  hook uses the  useEffect  hook to fetch user data when the  userID  changes. The  fetchUserData  function is a placeholder for the actual data fetching logic. 
    //  The  fetchUserData  function uses the  client  object to perform a query to fetch user data. You can replace the placeholder query with your actual GraphQL query. 
    //  The  useUserData  hook is a reusable hook that you can use in any component to fetch user data. 
    //  You can import and use this custom hook in your components like this:
     // Path: src/components/UserProfile.js