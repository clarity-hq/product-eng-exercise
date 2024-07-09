# Overview

## Part 1: Filtering

The purpose of this application is to surface product feedback about Clarity to the team and allow us to explore the data based on different filters.

The data exists in our "database" (`api/data.json`) and is surfaced in a data table via our web application:
![preview screenshot](/preview.png)

This is helpful to view all of our data at once, but falls short when we want a more granular view of the feedback list.

The goal of this exercise is to build a filter menu similar to Linear's:
![linear preview video](/linear_preview.gif)

We'll leave it up to you to decide what filters make sense here. We think that Linear did a pretty great job at designing the filtering system - try to imitate their UI and UX patterns as much as possible.

## Part 2: Grouping

Viewing individual pieces of feedback is helpful, but we really want to group pieces of similar feedback together. When we're prioritizing bugs, feature requests, etc. we want to know which customers would benefit and how important it is to them.

The goal of this exercise is to group similar pieces of feedback together, like we do in the Clarity product today:
![Clarity trends screenshot](/clarity_trends.png)

We intentionally left this piece very open-ended -- we want to understand how you navigate ambiguity and work toward a solution.

We included a Python server (`/apy`) in case you need to use any Python libraries. If you need API access to any third-party services, let us know and we can get you an API key.

# Setup

## Node + Web app

Ensure that `node` is installed on your system (`node -v`) and that `npm` is up to date (`npm install -g npm@latest` on macOS)

- Fork this repository and clone it onto your machine
- Run `npm i` from the repository root to install dependencies
- Run `npm run dev` from the repository root to start up the client + server
- Save your changes to hot-reload the client or server

## Python server (`apy`)

- Install pyenv using `brew install pyenv`
- Install python version `3.9.13` using `pyenv install 3.9.13`
- Install `pipx` using `brew install pipx`
- Install `poetry` using `pipx install poetry`
- Update your path using `pipx ensurepath` and run `source ~/.zshrc` to update your PATH
- From `apy/`, run `poetry install` to install dependencies
- Run `poetry run gunicorn app:app` to launch the Flask server

# Implementation

## Part 1: Filtering

For this exercise, we'll do all of the filtering on the server. Since this feedback will be resulting from all of a company's customer interactions, there is to much data to store it all on the client.

There are two `TODO(part-1)`s in the codebase: one on the client (creating filter menus + state) and one on the server (using the filter data passed to the endpoint).

Client / server communication should work out of the box, so you can focus on the filter functionality.

## Part 2: Grouping

This portion is backend-only -- updating the business logic of the `/groups` endpoint should properly render all of the groups in the UI automatically.

There is one `TODO(part-2)` in the codebase: in `endpoint.ts` to implement filtering + grouping for the `/groups` endpoint.

Once you have filtering working for Part 1, you should be able to use the same logic to filter the feedback before putting them into groups.

## General guidance

- We care more about quality than speed for this exercise. Try to write code that's legible and would be easy for someone to read.
- Think through how patterns could generalize to other places in the application.
- You don't have to write everything from scratch. If it makes sense to use a third-party library, do it.

Broadly, we want you to treat this project like something that is shipping to production rather than a coding challenge. Imagine that this code won't be thrown away, but merged into the codebase and deployed to our customers.

# Submission

When you finish, email a link to your forked version of the repository to founders@adopclarity.com
