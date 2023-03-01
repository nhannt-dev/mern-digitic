exports.unsignedConverter = (title) => {
    title = title.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    title = title.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    title = title.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    title = title.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    title = title.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    title = title.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    title = title.replace(/đ/g, 'd')
    return title
}