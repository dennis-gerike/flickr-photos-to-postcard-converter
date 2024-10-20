import fs from "fs"
import {RawGherkinComponents} from "./types/RawGherkinComponents.mjs"
import {XrayTest} from "../xray/types/XrayTest.mjs"

/**
 * Takes a response from the Xray API and extracts all the information that is needed to later-on create a valid Gherkin feature file.
 */
export class XrayGherkinExtractor {
    /**
     * Expects an array which contains the raw test case information from Jira/Xray.
     * Returns an object containing the necessary data to build a Gherkin feature file for each test.
     */
    static extract(rawTests: Array<XrayTest>) {
        let extractedScenarios: RawGherkinComponents[] = []

        rawTests.forEach(test => {
            extractedScenarios.push(XrayGherkinExtractor.extractTest(test))
        })

        XrayGherkinExtractor.storeExtractedGherkinScenariosOnDisk(extractedScenarios)

        return extractedScenarios
    }

    static storeExtractedGherkinScenariosOnDisk(tests: RawGherkinComponents[]) {
        fs.writeFileSync(`./extracted-scenarios.json`, JSON.stringify(tests, null, 2))
    }

    private static extractTest(test: XrayTest) {
        let extractedTest: RawGherkinComponents

        let requirementTitle = 'NONE';
        let requirementId = 'NONE';

        if (test.jira.issuelinks.length > 0) {
            test.jira.issuelinks.forEach(link => {
                if (link.type.outward === 'tests') {
                    requirementId = link.outwardIssue.key;
                    requirementTitle = link.outwardIssue.fields.summary;
                }
            });
        }

        extractedTest = {
            scenario: {
                id: test.jira.key,
                type: test.scenarioType == 'scenario_outline' ? 'Scenario Outline' : 'Scenario',
                title: test.jira.summary,
                gherkin: test.gherkin
            },
            requirement: {
                id: requirementId,
                title: requirementTitle,
                description: ""
            },
        }

        return extractedTest
    }
}