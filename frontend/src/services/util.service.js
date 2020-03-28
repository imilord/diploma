export const utilService = {
    makeId,
    uploadImg
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function uploadImg(ev) {
    const CLOUD_NAME = "dcwrnwtiu"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'fy4cqrtq'); // second parameter is the upload preset

    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => {
<<<<<<< HEAD
            // console.log(res)
=======
>>>>>>> f859112b5614ba817b4d59435381b123ea53763a
            return res
        })
        .catch(
            // console.log(err)
        )
}