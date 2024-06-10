import type { CodegenConfig } from '@graphql-codegen/cli';

 const GQL_STAGING_ENDPOINT =
  process.env.GQL_CUSTOMER_APP_ENDPOINT || 'https://form-staging2.sanspaper.com:20991/graphql';

// const GQL_STAGING_ENDPOINT =
//   process.env.GQL_CUSTOMER_APP_ENDPOINT || 'https://graphql.sanspaper.com:20991/graphql';




const comments = [
  '/* eslint-disable @typescript-eslint/ban-ts-comment */',
  '/* eslint-disable @typescript-eslint/no-explicit-any */',
  '/* eslint-disable @typescript-eslint/no-non-null-assertion */',
  '/* eslint-disable @typescript-eslint/no-unsafe-assignment */',
  '/* eslint-disable @typescript-eslint/prefer-optional-chain */',
  '/* eslint-disable no-prototype-builtins */',
  '// @ts-nocheck',
];

const addCommentPlugins = comments.map((content) => ({
  add: {
    content,
  },
}));



// getAndLogAccessToken();


const config: CodegenConfig = {
  schema: [
    {
      [GQL_STAGING_ENDPOINT]: {
        headers:   {
          Authorization:`Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpOU0dyLWNmQmN3XzNTYVNRMlQ5WiJ9.eyJpc3MiOiJodHRwczovL3NhbnNwYXBlci5hdS5hdXRoMC5jb20vIiwic3ViIjoiTjMzaWFyVERkWGhDOGFXaWRsT2p4WVdWN0dxU3JjMnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc2Fuc3BhcGVyLmNvbS9wb3N0Z3JhcGhpbGUiLCJpYXQiOjE3MTU5MjA3NTAsImV4cCI6MTcxNjAwNzE1MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiTjMzaWFyVERkWGhDOGFXaWRsT2p4WVdWN0dxU3JjMnAifQ.PRT2BLleD5rWLYcncR6190Z1FZx5TAuRKuRhvoW0sbdIkYVz1Y_7Ajf5twfzJ8POlW83Jx7glx300LUp9MIRUHUzibgVSXFmBcwzz-TBl3vSSMINP2A6A3kaj9IXVbX9qqtaqfz5EHLIOxG0FLIp9RbhffMd-EnYEgVryfnUAmm-4H8ujMazRu_Eg1ZKAR_A4i9M6yFDPH25_GmG7gZLRMDrahmubZfKE-gpNuCRJf7Yg_ymLyWZHlOa_VedtyDvd-cWCxKLqh8u4dAVC-2NuL8XuBHOkQKr4wwgN9yllfLU4uTzPkKd8PRV484YrOGPG1B10h8ZwTAqeuHd6FvmsA`}
      },
    },
  ],
  
  documents: "src/**/*.graphql",
  emitLegacyCommonJSImports: false,
  generates: {
    './src/gql/_generated.ts': {
      plugins: [
        ...addCommentPlugins,
        'typescript',
        {
          'typescript-operations': {
            nonOptionalTypename: false,
          },
        },
        {
          'typescript-react-query': {
            addInfiniteQuery: true,
          },
        },
      ],
      config: {
        // fetcher: '@goodhuman-me/api/client#request',
        // isReactHook: true,
        fetcher: 'graphql-request',
        scalars: {
          // JSON: 'string',
          // UUID: 'string',
          DateTime: 'Date',
        },
        // fetcher: {
        //   endpoint: 'http://localhost:4000/graphql',
        //   fetchParams: {
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   },
        // },
      },
    },
  }
};
export default config;