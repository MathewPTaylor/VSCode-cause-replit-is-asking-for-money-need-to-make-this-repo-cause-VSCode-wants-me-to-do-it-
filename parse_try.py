def parse_number(string_to_parse: str):
    # gonna do term + term for now
    # look for first term
    # look for an operation
    # look for second term
    number: str = ""
    x: int = 0
    start: bool = False
    loop: bool = True

    while loop and x < len(string_to_parse):
        print(list(number))
        if string_to_parse[x] in "1234567890":
            number += string_to_parse[x]
            start = True
        else:
            if start:
                loop = False
        x += 1 

    return (int(number), string_to_parse[x:])


def parse_operation(string_to_parse: str):
    operation: str = ""
    x: int = 0 
    loop: bool = True
    start: bool = False

    while loop and x < len(string_to_parse):
        if string_to_parse[x] in "+-*/":
            operation += string_to_parse[x]
            start = True
        else:
            if start:
                loop = False
        x += 1 

    return (operation, string_to_parse[x:])


def parse_expression(string_to_parse: str):
    findingNumber: bool = False
    total: int = 0
    num, ros = parse_number(string_to_parse)
    total += num
    print(ros, "PRE WHILE")
    input()
    operation: str = ""
    while len(ros) > 0:
        if findingNumber:
            print("NUMBER")
            num, ros = parse_number(ros)
            print(num, f"'{ros}'")
            input()
            total = perform_calculation(total, num, operation)
            print(total, "TOTAL")
        else:
            print("OP")
            op, ros = parse_operation(ros)
            print(op, f"'{ros}'")
            input()
            operation = op
        

        findingNumber = not findingNumber
        print(findingNumber)
        
        print(ros)
    return total


def perform_calculation(num1, num2, operation):
    if operation == "+":
        print(num1 + num2, "IN THE PC DEF")
        return num1 + num2
    elif operation == "-":
        return num1 - num2
    elif operation == "*":
        return num1 * num2
    elif operation == "/":
        return num1 / num2
    else:
        print("BAD OPERATOR")
        return None

expression_string = "123 + 321 + 100 + 99 - 320"


print(perform_calculation(123, 321, "+"))
print(parse_expression(expression_string))

