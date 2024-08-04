interface ParentInfoProps {
	label: string;
	value: string | number;
	icon: any;
}

function ParentInfo({ label, value, icon: Icon }: ParentInfoProps) {
	return (
		<p className="flex items-center space-x-2 space-y-1">
			<Icon className="card-icon" />
			<span className="tab-font">{label}:</span>
			<span className="tab-font">{value}</span>
		</p>
	);
}

export default ParentInfo;