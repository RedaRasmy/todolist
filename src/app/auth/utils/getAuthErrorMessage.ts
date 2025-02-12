import { AxiosError } from "axios";

export default function getAuthErrorMessage(
    error : unknown
):string {
    let message : string;

    if (error  && error instanceof AxiosError && error.response) {
        return error.response.data.message
    }

    if (error instanceof Error) {
        message = error.message
    } else if (
        error && typeof error === 'object' && "message" in error 
    ) {
        message = String(error.message)
    } else if ( typeof error === 'string') {
        message = error
    } else {
        message = "Something went wrong"
    }

    return message
}
