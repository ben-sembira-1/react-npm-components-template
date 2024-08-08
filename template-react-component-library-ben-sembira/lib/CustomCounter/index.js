"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCounter = CustomCounter;
var material_1 = require("@mui/material");
var react_1 = require("react");
var CustomButton_1 = require("../CustomButton");
function CustomCounter() {
    var _a = (0, react_1.useState)(0), counter = _a[0], setCounter = _a[1];
    return (<material_1.Stack>
			<material_1.Typography variant="h1">The Best Counter</material_1.Typography>
			<material_1.Typography variant="body1">Current counter value: {counter}</material_1.Typography>
			<CustomButton_1.CustomButton value="Add one to the counter!" hint={"The value will change to ".concat(counter + 1)} onClick={function () { return setCounter(function (prev) { return prev + 1; }); }}/>
		</material_1.Stack>);
}
