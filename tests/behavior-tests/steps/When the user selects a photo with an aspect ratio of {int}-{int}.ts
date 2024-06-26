import {When} from "@cucumber/cucumber"
import {getFixturesFolderPath} from "../_helper/getFixturesFolderPath"
import {EnvironmentVariables} from "../../EnvironmentVariables"

When('the user selects a photo with an aspect ratio of {int}:{int}', function (x: number, y: number) {
    const fixture = require(`${getFixturesFolderPath()}/${x}by${y}`)
    process.env[EnvironmentVariables.SOURCE_TYPE] = 'flickr-photo'
    process.env[EnvironmentVariables.MEDIA_ID] = fixture.id
    process.env[EnvironmentVariables.ASPECT_RATIO] = `${x / y}`
})
