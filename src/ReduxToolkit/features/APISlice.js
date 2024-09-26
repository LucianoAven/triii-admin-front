import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query'
import { APICuentas } from '../../functions/ApiClient'
import { WaAccount } from '../../Models/WaAccount';


export const APIAccounts = createApi({
baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    GetAccounts: build.query({
      queryFn() {
        try {
          const result = APICuentas.getCuentas()
          let array = [];
          result.data.forEach((json) => {
            let jsonWa = new WaAccount(json);
            array.push(jsonWa);
          });
          return { data: array }
        } catch (e) {
          return { error: e }
        }
      },
    }),
  }),
})

export const { useGetAccountsQuery } = APIAccounts
// export default APIAccounts.reducer