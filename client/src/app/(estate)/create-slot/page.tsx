import { AuthFormHeader } from "@/components/forms/auth";
import CreateSlotForm from "@/components/forms/create-slot/CreateSlotForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Minders Haven | Report Issue",
	description:
		"Parents can request/book a childminder slot.",
};

export default function CreateSlotPage() {
	return (
		<div>
			<AuthFormHeader title="Request a childminder" />
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<p className="dark:text-pumpkin text-2xl">
						<CreateSlotForm />
					</p>
				</div>
			</div>
		</div>
	);
}