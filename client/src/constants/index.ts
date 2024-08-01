import { LeftNavLink } from "@/types";

// Import your IssueData interface if it's defined in another file
// import { IssueData } from '@/types';

type OptionType = {
	value: "reported" | "resolved" | "in_progress" | "low" | "medium" | "high";
	label: string;
};

export const statusOptions: OptionType[] = [
	{ value: "reported", label: "Reported" },
	{ value: "resolved", label: "Resolved" },
	{ value: "in_progress", label: "In Progress" },
];

export const priorityOptions: OptionType[] = [
	{ value: "low", label: "Low" },
	{ value: "medium", label: "Medium" },
	{ value: "high", label: "High" },
];

export const occupationOptions = [
	{ value: "mason", label: "Mason" },
	{ value: "carpenter", label: "Carpenter" },
	{ value: "plumber", label: "Plumber" },
	{ value: "roofer", label: "Roofer" },
	{ value: "painter", label: "Painter" },
	{ value: "electrician", label: "Electrician" },
	{ value: "hvac", label: "HVAC" },
	{ value: "tenant", label: "Tenant" },
];

export const leftNavLinks: LeftNavLink[] = [
	{
		path: "/welcome",
		label: "Home",
		imgLocation: "/assets/icons/home.svg",
	},
	{
		path: "/profile",
		label: "Profile",
		imgLocation: "/assets/icons/user-profile.svg",
	},
	{
		path: "/parents",
		label: "Parents",
		imgLocation: "/assets/icons/parents.svg",
	},

	{
		path: "/minders",
		label: "Minders",
		imgLocation: "/assets/icons/minders.svg",
	},
	{
		path: "/report-issue",
		label: "Request Minder",
		imgLocation: "/assets/icons/report.svg",
	},

	
	{
		path: "/bookmark",
		label: "Bookmarked Posts",
		imgLocation: "/assets/icons/bookmark.svg",
	},

];