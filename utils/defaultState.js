
const applicants = [
    {name: "Arthur", rank: ["City"], applicantProposals: [], tentativeMatch: ""},
    {name: "Sunny", rank: ["City", "Mercy"], applicantProposals: [], tentativeMatch: ""},
    {name: "Joseph", rank: ["City", "General", "Mercy"], applicantProposals: [], tentativeMatch: ""},
    {name: "Latha", rank: ["Mercy", "City", "General"], applicantProposals: [], tentativeMatch: ""},
    {name: "Darrius", rank: ["City", "Mercy", "General"], applicantProposals: [], tentativeMatch: ""}
 ];

 const programs = {
    "Mercy" : {numPositions: 2, rank: ["Darrius", "Joseph"]},
    "City" : {numPositions: 2, rank: ["Darrius", "Arthur", "Sunny", "Latha", "Joseph"]},
    "General" : {numPositions: 2, rank: ["Darrius", "Arthur", "Joseph", "Latha"]}
 };

 const defaultState = {
     applicants: applicants,
     programs: programs
 };

 module.exports = defaultState;
