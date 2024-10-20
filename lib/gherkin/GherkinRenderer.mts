import {RawGherkinComponents} from "./types/RawGherkinComponents.mjs"
import {RenderedGherkin} from "./types/RenderedGherkin.mjs"
import synchronizedPrettier from "@prettier/sync";


export class GherkinRenderer {
    /**
     * Converting all the given tests into "Feature" descriptions, which can later be saved as regular Gherkin `*.feature` files.
     */
    static renderAll(rawGherkins: RawGherkinComponents[]) {
        let renderedGherkinScenarios: RenderedGherkin[] = []

        rawGherkins.forEach(rawGherkin => {
            renderedGherkinScenarios.push({
                rendered: GherkinRenderer.renderOne(rawGherkin),
                reference: rawGherkin
            })
        })

        return renderedGherkinScenarios
    }

    /**
     * Generating a valid "Feature" description from the given information about the scenario and the requirement it is based on.
     */
    static renderOne(rawGherkin: RawGherkinComponents) {
        const renderedGherkin = `
            @REQ_${rawGherkin.requirement.id}
            Feature: ${rawGherkin.requirement.title}
                        
                @TEST_${rawGherkin.scenario.id}
                ${rawGherkin.scenario.type}: ${rawGherkin.scenario.id} » ${rawGherkin.scenario.title}
                    ${rawGherkin.scenario.gherkin}
        `;

        return this.prettify(renderedGherkin)
    }

    /**
     * Cleaning up all indentations and straightening all tables.
     */
    static prettify(renderedGherkin: string) {
        return synchronizedPrettier.format(renderedGherkin, {
            parser: "gherkin",
            plugins: ["prettier-plugin-gherkin"],
        })
    }
}