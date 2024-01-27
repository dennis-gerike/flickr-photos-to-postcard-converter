import {JimpClient} from "../jimp/JimpClient"
import {ImageInformation} from "../flickr/types/internal/ImageInformation"
import {getDownloadFolderPath} from "./getDownloadFolderPath"
import {getImageFileName} from "./getImageFileName"
import {getMetaInformationFileName} from "./getMetaInformationFileName"
import {getProcessedFolderPath} from "./getProcessedFolderPath"
import {getTextColor} from "./getTextColor"

export async function convertPhotos(photoIds: string[]) {
    const cliProgress = require('cli-progress')
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)
    const jimpClient = new JimpClient()

    // resizing the photos to match the postcard format, then adding a label and finally a nice margin
    console.log('Converting photos')
    progressBar.start(photoIds.length, 0)
    for (const photoId of photoIds) {
        await jimpClient.setPhoto(`${getDownloadFolderPath()}/${getImageFileName(photoId)}`)
        jimpClient.setAspectRatio(Number(process.env.ASPECT_RATIO))
        const photoInformation = require(`${getDownloadFolderPath()}/${getMetaInformationFileName(photoId)}`) as ImageInformation
        const title = photoInformation.title + ' | ' + process.env.CUSTOM_TEXT + ' | ' + photoId
        const textColor = getTextColor()
        const textVerticalBuffer = Number(process.env.TEXT_VERTICAL_BUFFER ?? 0)
        await jimpClient.setTextBox({
            text: title,
            relativeHeight: 5,
            red: textColor.red,
            green: textColor.green,
            blue: textColor.blue,
            relativeVerticalBuffer: textVerticalBuffer,
        })
        jimpClient.setMargin(Number(process.env.MARGIN_HORIZONTAL), Number(process.env.MARGIN_VERTICAL))
        await jimpClient.saveProcessedImage(getProcessedFolderPath(), getImageFileName(photoId))
        jimpClient.resetCanvas()

        progressBar.increment()
    }
    progressBar.stop()
}