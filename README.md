# community-lightweight-signup

Want to have users sign up, without having to log in or register? This is a simple example of capturing limited user data and generating a url that they can return to, that shows their items they signed up for.

## AppExchange Listing

Find the package at https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FMiQBUA1, and follow the guide to configure the community, see below for the link to the guide, which is also found on the AppExchange listing.

## Install from Code using SFDX

1. Log into DevHub, if not already logged in
1. Create a scratch org
    ```sh
    sfdx force:org:create -f config/project-scratch-def.json -a signuporg -s
    ```
1. Ensure Communities is enabled, and Enable ExperienceBundle Metadata API is True
    * Setup > Feature Settings > Communities > Communities Settings
1. Deploy Source
    ```sh
    sfdx force:source:push -u signuporg
    ```
1. Assign permission set
    ```sh
    sfdx force:user:permset:assign -u signuporg -n Lightweight_SignUp
    ```
1. Set Default Data
    ```sh
    sfdx force:data:tree:import -u signuporg -p ./data/Data-plan.json
    ```
1. Open the Scratch Org
    ```sh
    sfdx force:org:open -u signuporg
    ```
1. Configure the Community as defined below.

## Setup Guide

Because this leverages Communities for Public Access, there are a number of steps you need to take in order to expose this data to external users that are using the Guest profile.

Full details on configuration of this package is found at https://salesforce.quip.com/DZ18AxtqBH98