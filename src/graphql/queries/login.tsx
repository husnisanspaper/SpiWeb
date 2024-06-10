// CustomHook.js
import { useLoginSpfQuery } from 'gql/_generated';
import { client } from 'api/client';

const useCheckSPFDatabase = (username: any) => {
  const { data, error } = useLoginSpfQuery(client, {
    email: username,
  });

  if (error) {
    // console.log('########### ERROR DALAM SPF DB', error);
    return null; // Return null or handle error accordingly
  }

  if (data) {
    return data?.users?.nodes;
  }

  return null; // Handle if data is not available
};

export default useCheckSPFDatabase;
