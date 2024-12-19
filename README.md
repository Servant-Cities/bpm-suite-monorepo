# BPM suite monorepo

This repo will hold most of the work until we find the proper stack to validate our hypothesis building a Headless Business Process Management System suitable for public service and consumer protective businesses.

This is also a precursor tracking the evolution of the project from its current state to a project with its own stakeholders, governance, and multiple sources of funding.

Here is the assumed structure in regard of the current hypothesis:


## Design

All the design, including technical and conceptual work.


## Articles

The articles written to communicate around the project, for copyrights protection and non criticality of publishing platforms


## Core

The actual headless BPM service providing a working API over an opinionated database - not suitable for CMS integration.

This will, but not only, support local development of ready to use frontends suited for general use and set a basic infrastructure to demonstrate and fund the project.


## Adapters

Context specific SDKs implementing the protocol for different DBs, CMS or programming language. 

Most likely community led.


## Frontends

Different frontends likely to be used as a prospection material and an interactive participatory roadmap for non technical users.

Some might come as a demo and test ground to support the development of the protocol while others will be use-case specific, community issued frontends.


### Scenario Builder

A frontend built on sveltekit, meant to offer an opinionated and abstract process management interface aka "The scenario builder".

This is likely to be used as a prospection material and an interactive participatory roadmap for non technical users.


### Processes monitor

An opinionated frontend for wide screen use, enabling real time tracking of multiples processes in a complex environment .


### Business app

An opinionated business app enabling interactions between users with different roles and instantiated processes.