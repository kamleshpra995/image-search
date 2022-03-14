const generateUrl = (record) => {
    const { id, server, secret } = record;
    return `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`
}

export {
    generateUrl
}