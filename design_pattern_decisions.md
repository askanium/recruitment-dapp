# Design Pattern Decisions

Below you can find a list of the design patterns implemented
in the current project and a short description of each.

1. Fail early and fail loud
2. Restricting access
3. Pull over Push Payments
4. Circuit Breaker / Emergency Stop
5. Relay Update Pattern (a.k.a Proxy Pattern)

## 1. Fail early and fail loud

In order to make it clear whether the function has executed or
not, each contract method, where appropriate, has a `require(condition)`
statement that checks for the mandatory condition(s) of the given
method to be satisfied.

Such checks that are common among several methods are extracted
into modifiers. There are two modifiers in the project:

- `onlyOwner()` that checks if the method being run is executed by the
owner of the contract;
- `coveredByEmergencyStop()` that checks whether the contract is
in emergency state or not, hence disallowing/allowing method execution;

Also, related to "fail loud", the `send()` operations are wrapped in
a `require()` to catch and notify about the failed transactions.

## 2. Restricting access

This is a common practice to allow execution of some contract methods
only to a restricted person or group of people. In this project,
for most of the methods, access is restricted to the owner of the 
Company contract.

## 3. Pull over Push Payments

Another common practice when dealing with transactions is to user 
Pull over Push Payments so that no Denial of Service (DoS) Attack 
can be run against the contract. 

In this project, whenever an applicant is approved for a given job
offer at a company, he/she can claim the reward that is associated
to that job offer. By implementing Pull over Push, the reward is not
automatically send to the applicant on approval, but rather it becomes
available for the approved applicant to withdraw it whenever they wish
to do so.

## 4. Circuit Breaker / Emergency Stop

Writing robust Smart Contracts is still an evolving area of development.
There are good case practices from security perspective that one
should consider when writing a Smart Contract. Rigorous testing of a
contract is a must, but even then, sometimes developers write code in
such a way that it leaves an opportunity window for "evil doers" to
exploit the contract to their avail.

Thus, a Circuit Breaker pattern blocks specific methods from being
executed, giving people time to react.

In this project, the `coveredByEmergencyStop` modifier is implemented
that blocks execution of all non-view functions and leaves only the
`withdrawReward` method available, that allows people to claim their
rewards in case they haven't done so.

## 5. Relay Update Pattern (a.k.a Proxy Pattern)

The Relay pattern in our case serves two purposes:

1. Reduce subsequent deployment costs.
2. Allow contract logic to be upgraded.

In order to reduce contract deployment costs, the project implements
the Relay pattern by proxying calls for each deployed CompanyProxy to
a base Company class that holds all the logic. Thus, a base Company 
contract is deployed only once and then, for each company that is going
to be deployed, a CompanyProxy is deployed that proxies all the calls
to the deployed base Company contract.

In order to upgrade the base contract logic, each CompanyProxy has a
`proxied` state variable that holds the address of the contract to
which all calls are proxied. Thus, a CompanyProxy contract can easily
have its logic updated by updating the `proxied` state variable. The
benefit here is that the existing addresses are kept in place.

A thing worth mentioning is the fact that current implementation of the
Relay pattern, along updating the methods of the contract, allows adding
state variables as well.