
export interface SingleMailPrefs {
	from: {
		email: string;
		displayName: string;
	};
	recievers: {
		email: string;
		displayName: string;
		country: string;
	}[];
	subject: string;
	storyIds: string[];
}
