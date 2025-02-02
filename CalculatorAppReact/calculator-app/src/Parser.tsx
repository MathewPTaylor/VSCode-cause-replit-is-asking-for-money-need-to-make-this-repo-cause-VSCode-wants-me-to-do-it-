class Parser {
    static parseExpression(stringToParse: string): number {
        try {
            let findingNumber = false;
            let total = 0;
            console.log("BEFORE RED LINE");
            var [num, ros] = Parser.parseNumber(stringToParse);
            console.log("AFTER RED LINE", ros);
            total += num;
            let operation = "";

            while (ros.length > 0) {
                 console.log("STUCK?????");
                if (findingNumber) {
                    let resArr = Parser.parseNumber(ros);
                    num = resArr[0];
                    ros = resArr[1];
                    total = Parser.performCalculation(total, num, operation)
                } else {
                    let resArr = Parser.parseOperation(ros);
                    let op = resArr[0];
                    ros = resArr[1];
                    operation = op;
                }

                findingNumber = !findingNumber;
            }

            return total;
        } catch (ex) {
            console.log("EXCEPTION HEREEEEE", ex);
        }
        return -1
    }

    static parseNumber(stringToParse: string) {
        let number = "";
        let x = 0;
        let start = false;
        let loop = true;
        console.log("BEFORE THE LOOP")

        while (loop && x < stringToParse.length) {
            console.log("OH NO", stringToParse[x], "1234567890".includes(stringToParse[x]));
            if ("1234567890".includes(stringToParse[x])) {
                number += stringToParse[x];
                start = true;
            } else {
                if (start) {
                    loop = false;
                }
            }

            x++;
        }

        console.log("WE OUT THE LOOP BABY!!!!");
        return [parseInt(number), stringToParse.substring(x, stringToParse.length)];
    }

    static parseOperation(stringToParse: string) {
        var operation: string = "";
        var x: number = 0;
        var loop: Boolean = true;
        var start: Boolean = false;
        
        while (loop && x < stringToParse.length) {
            if ("+-*/".includes(stringToParse[x])) {
                operation += stringToParse[x];
                console.log(operation, "SMOOTH OPERATOR RIGHT HERE BABY!!!");
                // setTimeout(()=>{}, 2000);
                start = true
            } else {
                if (start) {
                    loop = false;
                }
            }
            x++;
        }

        return [operation, stringToParse.substring(x, stringToParse.length)];
    }

    static performCalculation(num1: number, num2: number, operation: string) {
        if (operation == '+') {
            return num1 + num2
        } else if (operation == '-') {
            return num1 - num2
        } else if (operation == '*') {
            return num1 * num2
        } else if (operation == '/') {
            return num1 / num2
        } else {
            console.log("BAD OPERATOR")
            return NaN
        }
    }

    static test() {
        console.log("YOO PARSER CLASS??");
    }
}

export default Parser