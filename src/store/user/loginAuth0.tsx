// loginAuth0.tsx
import axios from 'axios';


let userData: any;

const LoginApi = (username: string | null | undefined) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const postData = {
    query: `
      mutation ($email: String!) {
        loginSpf(email: $email) {
          id
          email
          name
          token
          status
        }
      }
    `,
    variables: {
      email: username,
    },
  };

  return axios.post(`${process.env.NEXT_PUBLIC_GQL_HOST}/graphql`, postData, axiosConfig);

}

export default LoginApi;
