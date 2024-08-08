import { Button, Stack, Typography } from "@mui/material";

type CustomButtonProps = {
	value: string;
	hint: string;
	onClick: () => void;
}
export function CustomButton({ value, hint, onClick }: CustomButtonProps) {
	return (
		<Button onClick={onClick}>
			<Stack>
				<Typography variant="h6">{value}</Typography>
				<Typography variant="caption">{hint}</Typography>
			</Stack>
		</Button>
	)
}
