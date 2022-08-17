export const getError = (errors: any[], field: string) => {
    const index = errors.findIndex(error => error.field === field)
    if(index !== -1) {
        return errors[index].message
    } else {
        return undefined
    }
}