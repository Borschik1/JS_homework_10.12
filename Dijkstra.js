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
	let ip = 0, now = 0;
	let number = '';
	outputData = new Array();

	for (let i = 0; i < inputData.length; ++i) {
		if (isNaN(inputData.charAt(i))) {
			if (inputData.charAt(i) == '.') {
				number += '.';
				continue;
			}
			if (number != '') {
				outputData[now] = number * 1;
				now++;
				number = '';
			}
			if (inputData.charAt(i) == '(') {
				stack[ip] = inputData.charAt(i);
				ip++;
				continue;
			}
			if (inputData.charAt(i) == ')') {
				while (stack[ip - 1] != '(') {
					outputData[now] = stack[ip - 1];
					now++;
					ip--;
					if (ip < 0) {
						console.log('Error. Missing open parenthesis.');
						return 0;
					}
				}
				ip--;
				continue;
			}
			if (priority(inputData.charAt(i)) <= priority(stack[ip - 1])) {
				outputData[now] = stack[ip - 1];
				now++;
				stack[ip - 1] = inputData.charAt(i);
			} else {
				stack[ip] = inputData.charAt(i);
				ip++;
			}
		} else {
			number += inputData.charAt(i);
		}
	}
	if (number != '') {
		outputData[now] = number * 1;
		now++;
		number = '';
	}
	for (let i = 0; i < ip; ++i) {
		outputData[now] = stack[ip - i - 1];
		now++;
	}
	console.log(outputData.join(' '));
	
	
	ip = 0;
	for (let i = 0; i < now; i++) {
		switch(outputData[i]) {
			case '+':
				stack[ip - 2] += stack[ip - 1];
				ip--;
				break;
			case '-':
				stack[ip - 2] -= stack[ip - 1];
				ip--;
				break;
			case '*':
				stack[ip - 2] *= stack[ip - 1];
				ip--;;
				break;
			case '/':
				stack[ip - 2] /= stack[ip - 1];
				ip--;
				break;
			case '^':
				stack[ip - 2] = Math.pow(stack[ip - 2], stack[ip - 1]);
				ip--;
				break;
			default:
				stack[ip] = outputData[i];
				ip++;
		}
	}
	console.log(stack[0]);
}

let fs = require('fs');
let arg = process.argv;

inputData = fs.readFileSync('input1.txt');
inputData = inputData.toString();

main(inputData);
