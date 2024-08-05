import {
	SlotResponse,
	MyAssignedSlotsResponse,
	MySlotsResponse,
	CreateSlotData,
	UpdateSlotData,
	UpdateSlotResponse,
} from "@/types";
import { baseApiSlice } from "../api/baseApiSlice";

export const slotApiSlice = baseApiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createSlot: builder.mutation<SlotResponse, CreateSlotData>({
			query: ({ ...slotData }) => ({
				url: `/slots/create/`,
				method: "POST",
				body: slotData,
			}),
			invalidatesTags: ["Slot"],
		}),
		getMySlots: builder.query<MySlotsResponse, void>({
			query: () => "/slots/me/",
			providesTags: ["Slot"],
		}),
		getMyAssignedSlots: builder.query<MyAssignedSlotsResponse, string>({
			query: () => "/slots/assigned/",
			providesTags: ["Slot"],
		}),
		getSingleSlot: builder.query<SlotResponse, string>({
			query: (slotId) => `/slots/${slotId}/`,
			providesTags: ["Slot"],
		}),

		updateSlot: builder.mutation<UpdateSlotResponse, UpdateSlotData>({
			query: ({ slotId, ...statusData }) => ({
				url: `/slots/update/${slotId}/`,
				method: "PATCH",
				body: statusData,
			}),
			invalidatesTags: ["Slot"],
		}),
		deleteSlot: builder.mutation<void, string>({
			query: (slotId) => ({
				url: `/slots/delete/${slotId}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Slot"],
		}),
	}),
});

export const {
	useCreateSlotMutation,
	useDeleteSlotMutation,
	useGetMySlotsQuery,
	useGetSingleSlotQuery,
	useGetMyAssignedSlotsQuery,
	useUpdateSlotMutation,
} = slotApiSlice;