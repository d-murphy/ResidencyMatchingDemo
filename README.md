# Residency Match Algorithm  Demo

[View the Project](https://residency-match-demo.herokuapp.com/)

## Background

The National Residency Match Program uses a version of the [stable matching algorithm](https://en.wikipedia.org/wiki/Stable_marriage_problem) to pair medical residency applicants with available positions.  The process has both applicants and hospitals rank outcomes before the algorithm determines assignments.  This project demonstrates the stages of the algorithm, similar to this [video](https://www.nrmp.org/matching-algorithm/) on the NRMP site.  

In the algorithm, applicants propose their next best alternative and are accepted if a hospital does not have proposals from a higher ranked candidate.  Applicants and programs will land in the highest rated arrangement to which they had access.  The process can be said to be 'truth-seeking' in that no attempt to game the system exists beyond honestly submitting your preferences.  

In 2012, the Nobel Prize for Economics [recognized](https://en.wikipedia.org/wiki/Stable_marriage_problem) research related to the algorithm by Alvin Roth and Lloyd Shapley.  

## Project objectives:
* Explore the stable match algo
* Utilize jest for testing
* Connect react with express