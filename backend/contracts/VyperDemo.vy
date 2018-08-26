# King of the Ether
# Originally from https://www.kingoftheether.com/thrones/kingoftheether/index.html
# Adjusted and implemented in Vyper

king: public(address)
wealth: public(wei_value)
forgotten_kings: wei_value[address]

@public
@payable
def claim_throne():
    assert msg.value > self.wealth  # Does the new rules send more wealth than the existing one did?

    # Allow previous king to withdraw their wealth
    self.forgotten_kings[self.king] = self.wealth

    # Update King and wealth they possess
    self.king = msg.sender
    self.wealth = msg.value

@public
def withdraw_wealth():
    amount_to_withdraw: wei_value = self.forgotten_kings[msg.sender]

    # Check if amount greater than 0
    assert amount_to_withdraw > 0

    # Update the state in order to eliminate the potential to a re-entrancy attack
    self.forgotten_kings[msg.sender] = 0

    # Send the reward
    send(msg.sender, amount_to_withdraw)
