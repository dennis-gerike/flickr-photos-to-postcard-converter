import axios from "axios"
import axiosRetry from "axios-retry"
import {GetSizesResponse} from "../types/flickrApi/photos/GetSizesResponse"
import {ApiError} from "../types/internal/ApiError"
import {standardHeaders} from "./standardHeaders"
import {standardParams} from "./standardParams"

const FLICKR_API_BASE_URL = "https://api.flickr.com/services/rest/"

/**
 * Calls the Flickr API to request the available image sizes for a given photo.
 */
export async function fetchImageSizes(
    imageId: string,
    flickrApiKey: string,
    httpClient: typeof axios = axios
): Promise<GetSizesResponse> {
    const requestOptions = {
        'headers': standardHeaders,
        'params': {
            ...standardParams,
            'api_key': flickrApiKey,
            'photo_id': imageId,
            'method': 'flickr.photos.getSizes',
        }
    }

    axiosRetry(httpClient, {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay
    })

    const response = await httpClient
        .get(FLICKR_API_BASE_URL, requestOptions)
        .catch(() => {
            throw new ApiError(`Fetching the image sizes for the flickr photo "${imageId}" failed.`)
        })

    return response.data
}
