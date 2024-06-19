import {GraphQLClient} from 'graphql-request';
import crossFetch from 'cross-fetch';
import { getAccessToken } from './auth0Service';







async function customCrossFetch(input: RequestInfo | URL , init?: RequestInit) {

    const response = await crossFetch(input, init);
    // const body: unknown = await response.json();
    const clonedResponse = (await response.clone().json()) ;
  
    if (Array.isArray(clonedResponse.errors) && clonedResponse.errors.length === 1) {
      const firstError = clonedResponse.errors[0];
  
      switch (firstError.extensions?.code) {
        case 'INTERNAL_SERVER_ERROR':
          // The literal response must be thrown here to prevent stale data being
          // removed on the client in cases where the API server is not available.
          // This ensures cached client data can be usable until it can revalidate.
  
          throw clonedResponse; // eslint-disable-line @typescript-eslint/no-throw-literal
        default:
          return response;
      }
    }
  
    return response;
  }


  

  export const getAndLogAccessToken = async () => {
    try {
        let parsedAuthToken = null;
        let accessToken = null;

        while (!accessToken) {
            const postGraphileToken = await getAccessToken();
            parsedAuthToken = postGraphileToken ? JSON.parse(postGraphileToken) : null;

            if (parsedAuthToken && parsedAuthToken.access_token && parsedAuthToken.expirationTime > Date.now()) {
                accessToken = parsedAuthToken.access_token;
            } else {
                // Token is either invalid or expired, wait for some time before retrying
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
            }
        }

        return accessToken;
    } catch (error) {
        console.error('Error getting access token from AsyncStorage:', error);
        throw error;
    }
};





   export const initializeGraphQLClient = async () => {

    try {
      const authToken = await getAndLogAccessToken();
      const gqlHost = process.env.NEXT_PUBLIC_GQL_HOST_GRAPHILE;
      
      if (!gqlHost) {
        throw new Error('GraphQL host is not defined.');
      }


      // console.log('nak check url host graphile', REACT_NATIVE_GQL_HOST_GRAPHILE)
      let client = new GraphQLClient(gqlHost, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
  
      });

      return client;
    } catch (error) {
      console.error('Error setting up GraphQL client:', error);
      throw error;
    }
  };






  

 


