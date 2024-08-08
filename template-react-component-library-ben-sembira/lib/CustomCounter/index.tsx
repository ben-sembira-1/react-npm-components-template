import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../CustomButton";


export function CustomCounter() {
	const [counter, setCounter] = useState(0)
	return (
		<Stack>
			<Typography variant="h1">The Best Counter</Typography>
			<Typography variant="body1">Current counter value: {counter}</Typography>
			<CustomButton
				value="Add one to the counter!"
				hint={`The value will change to ${counter + 1}`}
				onClick={
					() => setCounter((prev) => prev + 1)
				}
			/>
		</Stack>
	)
}
