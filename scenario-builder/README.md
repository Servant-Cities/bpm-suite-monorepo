# Scenario builder

A frontend built on sveltekit, meant to offer an opinionated and abstract process management interface aka "The scenario builder".

This is likely to be used as a prospection material and an interactive participatory roadmap for non technical users.

## Roadmap

1. A BPMN like builder using local data to give any user the ability to:
    - [ ] Create and connect activities
    - [ ] Assign activities to different scenarios
    - [ ] Configure control lists
    - [ ] Configure data output models
    - [ ] Configure triggers and conditions

2. Operationnal readiness for Scenarios:
    - [ ] Configure access matrix on activities and data output
    - [ ] Configure quality metrics per activity
    - [ ] Receive feedbacks per activity filtered per roles
    - [ ] Integrate with the protocol
    - [ ] Demonstrate integration with the processes monitor and the business app

## Run locally

Considering yarn is installed and you run the project for the first time:

```
    git clone https://github.com/Servant-Cities/bpm-suite-monorepo.git
    cd scenario-builder
    yarn
    yarn run prisma migrate dev
    yarn dev
```
The development server runs on port 5173 and seed data have been created