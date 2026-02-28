export const checkItemExists = (item, res, message) => {
    if(!item){
        res.status(404).json({
            message: message
        })
        return false;
    }
    return true;
}

export const errorMessage = (res, message) => {
    console.log(message);
    res.status(500).json({
        message: message
    })
}