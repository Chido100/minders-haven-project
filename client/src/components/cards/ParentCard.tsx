"use client";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useTheme } from "next-themes";

import React from "react";
import Spinner from "../shared/Spinner";
import UsersSearch from "../shared/search/UsersSearch";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import ParentInfo from "./ParentInfo";
import {
	BrickWall,
	Briefcase,
	Building,
	CalendarDays,
	Map,
	MapPinnedIcon,
	School,
} from "lucide-react";
import { formatDate } from "@/utils";
import ProtectedRoute from "../shared/ProtectedRoutes";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
// import PaginationSection from "../shared/PaginationSection";

function ParentCardContent() {
	const { theme } = useTheme();
	// const searchTerm = useAppSelector((state) => state.user.searchTerm);
	// const page = useAppSelector((state) => state.user.page);

	 const { data, isLoading } = useGetAllUsersQuery({});

	// const totalCount = data?.profiles.count || 0;
	// const totalPages = Math.ceil(totalCount / 9);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div>
			<UsersSearch />
			<h1 className="flex-center font-robotoSlab dark:text-pumpkin text-4xl sm:text-5xl">
				All Parents - ({data?.profiles.results.length})
			</h1>

			<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
				{data && data.profiles.results.length > 0 ? (
					data.profiles.results.map((parent) => (
						<Card key={parent.id}>
							<CardContent className="rounded-lg p-4">
								<CardHeader className="flex-col-center text-center">
									<Avatar className="border-pumpkin mx-auto size-28 overflow-hidden rounded-full border-4 object-cover">
										<AvatarImage
											alt="User profile avatar"
											src={
												parent.avatar ||
												(theme === "dark"
													? "/assets/icons/user-profile-circle.svg"
													: "/assets/icons/user-profile-light-circle.svg")
											}
										/>
									</Avatar>
									<CardTitle className="h3-semibold font-robotoSlab dark:text-platinum">
										{parent.full_name}
									</CardTitle>
								</CardHeader>
								<CardTitle className="flex-center">
									<p className="h4-semibold dark:text-lime-500">
										@{parent.username}
									</p>
								</CardTitle>
								<CardDescription className="mt-4 space-y-2 border-b-0">
									<div>
										<ParentInfo
											label="City"
											value={parent.city}
											icon={MapPinnedIcon}
										/>
										<ParentInfo
											label="Occupation"
											value={parent.occupation}
											icon={Briefcase}
										/>
										<ParentInfo
											label="Date Joined"
											value={formatDate(parent.date_joined).toString()}
											icon={CalendarDays}
										/>
									</div>
									
								</CardDescription>
							</CardContent>
						</Card>
					))
				) : (
					<p>No Parents found</p>
				)}
			</div>
			
		</div>
	);
}

export default function ParentCard() {
	return (
		<ProtectedRoute>
			<ParentCardContent />
		</ProtectedRoute>
	);
}