shift_amount = 3
message = "hkkpapvupzfvbyuleawhzzdvyk"

def encypher_message(message: str, shift_amount: int) -> str:
    cypher_message = ""
    for let in message:
        new_let_val = ord(let) + shift_amount
        if new_let_val > ord("z"):
            new_let_val -= 26
        
        cypher_message += chr(new_let_val)
    return cypher_message

def decypher_message(message: str, shift_amount: int) -> str:
    plain_message = ""
    for let in message:
        new_let_val = ord(let) - shift_amount
        if new_let_val < ord("a"):
            new_let_val += 26
        
        plain_message += chr(new_let_val)
    return plain_message

            
https://github.com/EnderBox911/Chess-Website-Attempting