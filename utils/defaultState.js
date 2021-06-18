
const Applicant = require('./applicant.js');
const Program = require('./program.js')

const applicants = [];

applicants.push(new Applicant("Arthur", ["City"]));
applicants.push(new Applicant("Sunny", ["City", "Mercy"]));
applicants.push(new Applicant("Joseph", ["City", "General", "Mercy"]));
applicants.push(new Applicant("Latha", ["Mercy", "City", "General"]));
applicants.push(new Applicant("Darrius", ["City", "Mercy", "General"]));

 const programs = {
    "Mercy" : new Program("Mercy", 2, ["Arthur", "Joseph"]), 
    "City" : new Program("City", 1, ["Darrius", "Arthur", "Sunny", "Latha", "Joseph"]),
    "General" : new Program("General", 2,  ["Darrius", "Arthur", "Joseph", "Latha"]),
 };

 const defaultState = {
     applicants: applicants,
     programs: programs
 };

 module.exports = defaultState;
