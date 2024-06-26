import {Then} from "@cucumber/cucumber"
import fs from "fs"
import assert from "assert"
import {EnvironmentVariables} from "../../EnvironmentVariables"

Then('the final image should have been created', function () {
    const fullPath = `${__dirname}/../../../data/processed/${process.env[EnvironmentVariables.MEDIA_ID]}/${process.env[EnvironmentVariables.MEDIA_ID]}.jpg`
    const fileExists = fs.existsSync(fullPath)
    assert(fileExists, `File "${fullPath}" not found`)
})
