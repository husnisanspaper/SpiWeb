import type { CodegenConfig } from '@graphql-codegen/cli';

 const GQL_STAGING_ENDPOINT =
  process.env.GQL_CUSTOMER_APP_ENDPOINT || 'https://form-staging2.sanspaper.com:20991/graphql';

// const GQL_STAGING_ENDPOINT =
//   process.env.GQL_CUSTOMER_APP_ENDPOINT || 'https://graphql.sanspaper.com:20991/graphql';




// const comments = [
//   '/* eslint-disable @typescript-eslint/ban-ts-comment */',
//   '/* eslint-disable @typescript-eslint/no-explicit-any */',
//   '/* eslint-disable @typescript-eslint/no-non-null-assertion */',
//   '/* eslint-disable @typescript-eslint/no-unsafe-assignment */',
//   '/* eslint-disable @typescript-eslint/prefer-optional-chain */',
//   '/* eslint-disable no-prototype-builtins */',
//   '// @ts-nocheck',
// ];

// const addCommentPlugins = comments.map((content) => ({
//   add: {
//     content,
//   },
// }));



// getAndLogAccessToken();


const config: CodegenConfig = {
  schema: [
    {
      [GQL_STAGING_ENDPOINT]: {
        headers:   {
          Authorization:`Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpOU0dyLWNmQmN3XzNTYVNRMlQ5WiJ9.eyJpc3MiOiJodHRwczovL3NhbnNwYXBlci5hdS5hdXRoMC5jb20vIiwic3ViIjoiTjMzaWFyVERkWGhDOGFXaWRsT2p4WVdWN0dxU3JjMnBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc2Fuc3BhcGVyLmNvbS9wb3N0Z3JhcGhpbGUiLCJpYXQiOjE3MTgwOTI1MjYsImV4cCI6MTcxODE3ODkyNiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiTjMzaWFyVERkWGhDOGFXaWRsT2p4WVdWN0dxU3JjMnAifQ.2fR7rFX8yunC1KoikgzOQdFNE3W7GpH51tmoafeE_G8JUH7fRdkLdUyq9d_h0ibyOmQm7nf_w_fyLTeUDe7OW0RP-nrIop3J2MtAW4bdXiHt-9zw2JPhqv4hXutp-aobVf1ARYki9dS4LJ7FDQDrBEFZohenZrc-NToKauJ40FKNdDb_jcBXGrVWO2UXeRegsb4lB-bj-kXJKhCafT-Ve5qFWaN_vkDUY7wjVSpuEqjcZmG0g0LciQGOjEsnzrm_3T3Hmdr_xq4iGceD_ZYUYi24VJ5HVe3TN9VCWz8ybKV8ageTeVDRBATX8SYBIq4ivWzt5797Q949YvHWC75qWQ`}
      },
    },
  ],
  
  documents: "src/**/*.graphql",
  emitLegacyCommonJSImports: false,
  generates: {
    './src/gql/_generated.ts': {
      plugins: [
        // ...addCommentPlugins,
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