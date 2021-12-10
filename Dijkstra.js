function priority(symb) {
	if (symb == '+' || symb == '-') {
		return 0;
	} else if (symb == '*' || symb == '/') {
		return 1;
	} else if (symb == '^') {
		return 2;
	} else {
		return -1;
	}
}

function main(inputData) {
	stack = new Array();
	let ip = 0;
	let outputData = '';

	for (let i = 0; i < inputData.length; ++i) {
		if (isNaN(inputData.charAt(i))) {
			if (inputData.charAt(i) == '(') {
				stack[ip] = inputData.charAt(i);
				ip++;
				continue;
			} if (inputData.charAt(i) == ')') {
				while (stack[ip - 1] != '(') {
					outputData += stack[ip - 1];
					ip--;
					if (ip == 0) {
						console.log('Error. Missing open parenthesis.');
						return 0;
					}
				}
				ip--;
				continue;
			}
			if (priority(inputData.charAt(i)) <= priority(stack[ip - 1])) {
				outputData += stack[ip - 1];
				stack[ip - 1] = inputData.charAt(i);
			} else {
				stack[ip] = inputData.charAt(i);
				ip++;
			}
		} else {
			outputData += inputData.charAt(i);
		}
	}
	for (let i = 0; i < ip; ++i) {
		outputData += stack[ip - i - 1];
	}
	console.log(outputData);
}

let fs = require('fs');
let arg = process.argv;

inputData = fs.readFileSync('input1.txt');
inputData = inputData.toString();

main(inputData);
