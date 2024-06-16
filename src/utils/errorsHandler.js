export function errorsHandler (err) {
    let arrErrors = []
    if (err.message) {
        arrErrors.push(new Error(err.message))
    }
    if (err.errors?.length > 0) {
        err.errors.map((e) => arrErrors.push(new Error(e.msg)))
    }
    return arrErrors.map(e => e.message)
}
