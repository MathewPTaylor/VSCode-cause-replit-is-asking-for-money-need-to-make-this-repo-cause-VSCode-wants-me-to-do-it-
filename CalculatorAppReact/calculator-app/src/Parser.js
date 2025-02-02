export class Parser {
    static parseExpression(stringToParse) {
        let findingNumber = false;
        let total = 0;
        let {num, ros} = parseNumber(ros);
        total += num;
        let operation = "";

        while (ros.length > 0) {
            if (findingNumber) {
                num, ros = parseNumber(ros);
                total = performCalculation(total, num, operation)
            } else {
                op, ros = parseOperation(ros);
                operation = op;
            }

            findingNumber = !findingNumber;
        }

        return total;
    }

    static parseNumber(stringToParse) {
        let number = "";
        let x = 0;
        let start = false;
        let loop = true;

        while (loop && x < stringToParse.length) {
            if (stringToParse[x] in "1234567890") {
                number += stringToParse[x];
                start = true;
            } else {
                if (start) {
                    loop = false;
                }
            }
        }

        return (parseInt(number), stringToParse.substring(x, stringToParse.length - 1))
    }
}


Parser.parseNumber("1234 + 542")