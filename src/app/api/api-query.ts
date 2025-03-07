import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchMediaArg, SearchMediaResponse } from './types';
import dayjs from 'dayjs';

const url = import.meta.env.VITE_SEARCH_API_URL;

// инициализация api
export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://cors-anywhere.herokuapp.com/${url}`,
	}),
	keepUnusedDataFor: 30,
	endpoints: (build) => ({
		searchMedia: build.query<SearchMediaResponse, SearchMediaArg>({
			query: ({ month = '1', year = '2025' }) => {
				const params = new URLSearchParams({
					'api-key': 'vEJwp3nmtqMIO6FDqQwyQdjbTzJcbdAh',
				});

				return {
					url: `/${year}/${month}.json`,
					method: 'GET',
					params,
				};
			},
			transformResponse: (response: SearchMediaResponse) => {
				if (response?.response) {
					response.response.docs.sort((a, b) =>
						dayjs(b.pub_date).diff(dayjs(a.pub_date)),
					);
				}
				return response || {};
			},
		}),
	}),
});

export const { useSearchMediaQuery } = api;
