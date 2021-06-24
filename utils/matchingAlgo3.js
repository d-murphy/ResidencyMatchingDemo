const data = require('./defaultState2');

let programs = Object.values(data.programs)
let applicants = JSON.parse(JSON.stringify(data.applicants))
    .map(applicant => ({
        ...applicant,
        acceptedTo: programs
            .filter(program => program.capacity > 0 && program.rank.find(({ name }) => name === applicant.name))
            .map(program => ({ name: program.name, capacity: program.capacity }))
    }))
    .map(applicant => ({
        ...applicant,
        options: applicant.rank
            .filter(({ name }) => !!applicant.acceptedTo.find(({ name: aname }) => name === aname))
    }));

// matched = [][capacity]
// loop over programs.rank
//   if program is applicant's first option and matched is not full
//      matched << applicants

// loop over applicants.options (as option)
//   loop over option.rank (if option.matched is not full)
//     if option.rank.applicant is not matched and o.r.applicant has hos

let programsWithOptions = programs.map(program => ({
    ...program,
    options: program.rank
        .map(({ name: applicantName }) => applicants.find(({ name }) => name === applicantName))
        .filter(x => x)
        .filter(applicant => applicant.options.find(option => option.name === program.name))
        .map(a => ({ name: a.name, options: a.options }))
}))

for (const i in applicants) {
    let applicant = applicants[i]
    let options = applicant.options.map(({ name }) => programsWithOptions.find(p => p.name === name))
}

console.log(JSON.stringify(programsWithOptions, null, 2))


