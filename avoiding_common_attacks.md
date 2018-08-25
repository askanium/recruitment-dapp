# Avoiding Common Attacks

This document explains the steps that were taken to avoid
the following common Smart Contracts exploitation attacks:

1. Re-Entrancy Attacks
2. Arithmetic Over/Under Flows
3. Undexpected Ether
4. Default Visibilities


## Re-Entrancy Attacks

Usually re-entrancy is possible when the contract that is called
passes the execution flow to some external party, that can re-enter
into the contract.

In the Recruitment Dapp, one place where this can happen is the
`withdrawReward` function, where the approved applicant can withdraw
the reward associated with the job offer he/she has applied to. Below
you can find the code of the function:

```solidity
/// @dev Used by approved applicants to withdraw their reward from a job offer.
/// @param _titleHash The bytes32 representation of the job offer title.
/// @param _amount The amount the applicant wants to withdraw.
function withdrawReward(
    bytes32 _titleHash,
    uint _amount
)
    external
{
    JobOffer storage jobOffer = closedJobOffers[_titleHash];

    // Only approved applicants can withdraw.
    require(jobOffer.approvedApplicant == msg.sender);

    // In order to withdraw, the amount should be smaller or equal to the reward.
    require(jobOffer.rewardInWei >= _amount);

    // In order to avoid re-entrancy attacks, do the state changing
    // operations first and only after that send in the reward.
    uint amountToExtract = _amount;
    uint remainingReward = jobOffer.rewardInWei - amountToExtract;
    jobOffer.rewardInWei = remainingReward;

    // Wrap the `send()` method in `require()` so that it will 
    // fail loudly in case the send operation won't succeed.
    require(msg.sender.send(_amount));
}
```

In order to avoid this type of attack, the function is structured in
the following way:

1. Corresponding checks are done to ensure the sender can claim the
corresponding reward and that the amount to withdraw is <= than the
reward itself.
2. The state is being changed, based on the amount to be withdrawn.
3. The amount is sent to the `msg.sender` address.

Having operations placed in such an order, re-entrancy is not possible,
because upon re-entering, the state is already adjusted and the
`require()` statements will evaluate to false, reverting the transaction.


## Arithmetic Over/Under Flows

Dealing with (unsigned) integers can have unexpected consequences
in solidity if not enough care and consideration is taken when using them.

### Steps taken

In the current project, there are only 2 variables of type `uint256`
that are used, which hold the contract balance and rewards to be paid
amounts. Although an `uint128` type might be used, the decision was
to use `uint256` in order to avoid overflows.

Underflows are avoided by testing the amount that an applicant wants
to withdraw.

In case some smaller `uint`s are needed for the contract, then there
are libraries (e.g. SafeMath) that take care and properly handle
over/underflows.


## Unexpected Ether

There are two ways Ether can pop up bypassing payable functions in
a contract:

1. Being sent to an address *before* contract initialization.
2. Being sent to an address that is passed to a `selfdestruct(address)`
call.

In the first case, the ether will just be there at that address, no
matter whether there is a contract at that address or not.

In the second case, the ether will not trigger the fallback function.

Avoiding this common attack was implemented just for the demonstration
of the principle behind it, as the project doesn't require any *invariant*
values.

So, in the project, the Company contract is using the `this.balance`
value. Thus, upon deploying a new CompanyProxy contract, its 
`constructor` has a corresponding check:

```solidity
// If the address where the contract is going to be
// deployed is non-zero, revert contract creation.
require(address(this).balance == 0);
```

In case someone tries to send ether using a `selfdestruct()` call,
the contract's logic will not be affected, as it is important for
it to be bigger than 0 so that it won't underflow.


## Default Visibilities

There are four visibility specifiers in Solidity:

- private
- internal
- external
- public

By default, all functions and variables have a `public` visibility. This
can lead to changed state by users that are not entitled to do it.

As the current project uses a Proxy pattern, all proxy variables are
marked as `internal`, so that one cannot "accidentally" or on purpose
to modify these and let only the proxied contract (Company in our case)
modify them.
