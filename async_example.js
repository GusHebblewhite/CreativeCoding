

url = "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

LoadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
    })
}

const start = async () => {
    const img = await LoadImage(url)
    console.log(img.width)
    //Print some text
    console.log("I'm here");
}

start()