const Program = require('../utils/program.js');
const Applicant = require('../utils/applicant.js');

const Program1 = new Program("City", 2, ["Arthur", "Betty"]);

test('Test program creation - program name', () => {
    expect(Program1.name).toBe("City");
})

test('Test program creation - program max', () => {
    expect(Program1.maxApplicants).toBe(2);
})

test('Test program creation - program applicant rank', () => {
    expect(Program1.applicantRank.length).toBe(2);
})

test('Test program change - applicant rank', () => {
    Program1.changeRank(["Arthur", "Betty", "Charles"])
    expect(Program1.applicantRank.length).toBe(3);
})

const Applicant1 = new Applicant("Arthur", ["City", "General", "Mercy"]);

test('Test checkApplicant func', () => {
    Program1.checkApplicant(Applicant1);
    expect(Program1.applicantRank[0]['applicantName']).toBe('Arthur');
})

test('Test checkApplicant func #2', () => {
    Program1.checkApplicant(Applicant1);
    expect(Program1.applicantRank[0]['triedProposal']).toBe(true);
})

test('Test checkApplicant func #3', () => {
    Program1.checkApplicant(Applicant1);
    expect(Program1.applicantRank[0]['tentativeMatch']).toBe(true);
})

