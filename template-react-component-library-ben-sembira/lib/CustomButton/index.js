"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomButton = CustomButton;
var material_1 = require("@mui/material");
function CustomButton(_a) {
    var value = _a.value, hint = _a.hint, onClick = _a.onClick;
    return (<material_1.Button onClick={onClick}>
			<material_1.Stack>
				<material_1.Typography variant="h3">{value}</material_1.Typography>
				<material_1.Typography variant="caption">{hint}</material_1.Typography>
			</material_1.Stack>
		</material_1.Button>);
}
