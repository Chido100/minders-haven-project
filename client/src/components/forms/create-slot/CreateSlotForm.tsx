"use client";

import { useCreateSlotMutation } from "@/lib/redux/features/slots/slotApiSlice";
import { slotCreateSchema, TSlotCreateSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFieldComponent } from "../FormFieldComponent";
import { BabyIcon, CalendarIcon, ClockIcon, FlagIcon, LocateIcon, TextIcon } from "lucide-react";
import Select from "react-select";
import { locationOptions, statusOptions } from "@/constants";
import customStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { StopwatchIcon } from "@radix-ui/react-icons";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
	() => Promise.resolve(({ children }) => <>{children}</>),
	{ ssr: false },
);

export default function CreateSlotForm() {

	const [createSlot, { isLoading }] = useCreateSlotMutation();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TSlotCreateSchema>({
		resolver: zodResolver(slotCreateSchema),
		mode: "all",
	});

	const onSubmit = async (formValues: TSlotCreateSchema) => {
		try {
			await createSlot(formValues).unwrap();
			toast.success(
				"Your Slot has been created. A confirmation email has been sent to you.",
			);
			reset();
			router.push("/profile");
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage || "An error occurred");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4 dark:text-black"
			>
				<FormFieldComponent
					label="Slot Date"
					name="slot_date"
					register={register}
					errors={errors}
					placeholder="Slot Date"
					startIcon={<CalendarIcon className="dark:text-babyPowder size-8" />}
				/>
                <FormFieldComponent
					label="Slot Time"
					name="slot_time"
					register={register}
					errors={errors}
					placeholder="Slot Time"
					startIcon={<ClockIcon className="dark:text-babyPowder size-8" />}
				/>
                <FormFieldComponent
					label="Duration"
					name="duration"
					register={register}
					errors={errors}
					placeholder="How long do you need a childminder for?"
					startIcon={<StopwatchIcon className="dark:text-babyPowder size-8" />}
					type="number"
				/>
                <FormFieldComponent
					label="Number of Kids"
					name="number_of_kids"
					register={register}
					errors={errors}
					placeholder="Number of Kids"
					startIcon={<BabyIcon className="dark:text-babyPowder size-8" />}
					type="number"
				/>
				<FormFieldComponent
					label="Kids Age"
					name="kids_age"
					register={register}
					errors={errors}
					placeholder="Kids Age"
					startIcon={<CalendarIcon className="dark:text-babyPowder size-8" />}
					type="number"
				/>

				<div>
					<label htmlFor="Status" className="h4-semibold dark:text-babyPowder">
						Location
					</label>
					<div className="mt-1 flex items-center space-x-3 text-sm">
						<ClientOnly>
							<Controller
								name="location"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Select
										className="mt-1 w-full"
										options={locationOptions}
										value={locationOptions.find(
											(option) => option.value === value,
										)}
										onChange={(val) => onChange(val?.value)}
										onBlur={onBlur}
										placeholder="Where would you like this to be??"
										instanceId="location-select"
										styles={customStyles}
									/>
								)}
							/>
						</ClientOnly>
					</div>
					{errors.location && (
						<p className="mt-2 text-sm text-red-500">
							{errors.location.message}
						</p>
					)}
				</div>

				<FormFieldComponent
					label="Additional Info"
					name="additional_info"
					register={register}
					errors={errors}
					placeholder="Any additional information"
					isTextArea
					startIcon={<TextIcon className="dark:text-babyPowder size-8" />}
				/>
				
					{errors.status && (
						<p className="mt-2 text-sm text-red-500">{errors.status.message}</p>
					)}
				

				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin mt-2 w-full text-white"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Report`}
				</Button>
			</form>
		</main>
	);
}