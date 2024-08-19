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
import { BabyIcon, CalendarIcon, ClockIcon, WatchIcon, TextIcon } from "lucide-react";
import Select from "react-select";
import { locationOptions } from "@/constants";
import customStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { format, parseISO, isValid, parse } from 'date-fns';



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
        defaultValues: {
            status: 'created',
        },
	});


	const onSubmit = async (formValues: TSlotCreateSchema) => {
		formValues.status = "created";

		// Get the date value from the form
		const dateValue = formValues.slot_date; 

		if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
			// Format the date to YYYY-MM-DD
			formValues.slot_date = format(dateValue, 'yyyy-MM-dd');
		} else if (typeof dateValue === 'string' && isValid(parse(dateValue, 'yyyy-MM-dd', new Date()))) {
			formValues.slot_date = dateValue;
		} else {
			toast.error("Invalid date format. Please use YYYY-MM-DD");
			return; 
		}

		try {            
			await createSlot(formValues).unwrap();
			toast.success(
				"Your slot has been created. A confirmation email has been sent to you.",
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
				<Controller
                    name="slot_date"
                    control={control}
                    render={({ field }) => (
                        <FormFieldComponent
                            label="Slot Date"
                            register={register}
                            errors={errors}
                            placeholder="Slot Date"
                            startIcon={<CalendarIcon className="dark:text-babyPowder size-8" />}
                            type="date"
                            {...field}
                        />
                    )}
                />
				<FormFieldComponent
					label="Slot Time"
					name="slot_time"
					register={register}
					errors={errors}
					placeholder="Slot Time"
					startIcon={<ClockIcon className="dark:text-babyPowder size-8" />}
					type="time"
				/>
				<FormFieldComponent
					label="Duration"
					name="duration"
					register={register}
					errors={errors}
					placeholder="How long do you need a childminder for?"
					startIcon={<WatchIcon className="dark:text-babyPowder size-8" />}
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
					<label htmlFor="location" className="h4-semibold dark:text-babyPowder">
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
										placeholder="Where would you like this to be?"
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
					placeholder="Please enter any additional information, i.e. event postcode."
					isTextArea
					startIcon={<TextIcon className="dark:text-babyPowder size-8" />}
				/>

				{errors.status && (
					<p className="mt-2 text-sm text-red-500">{errors.status.message}</p>
				)}

                {/* Hidden status fields */}
                <input type="hidden" {...register("status")} value="created" />

				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin mt-2 w-full text-white"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Submit`}
				</Button>
			</form>
		</main>
	);
}
