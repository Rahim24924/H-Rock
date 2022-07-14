
const searchButton= document.getElementById("search").addEventListener("click", function(){
    const songName= document.getElementById("name").value;
    const url =`https://api.lyrics.ovh/suggest/${songName}`
    console.log(songName)

    fetch(url)
    .then(res=> res.json())
    .then(data=>{
        document.getElementById('result').innerHTML='';
        for (let i = 0; i < 10; i++) {
            const element = data.data[i];

            const songsName = data.data[i].title;
            const artistName = data.data[i].artist.name;
            
            console.log(songsName)
            console.log(artistName)

            document.getElementById("result").innerHTML+=`
            </div>
            <div class="search-result col-md-8 mx-auto py-4">
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${songsName}</h3>
                        <p class="author lead">Album by <span>${artistName}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="lyrics('${songsName}', '${artistName}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
            </div>
            `
    }})
      .catch(errror=> {
        document.getElementById("result").innerHTML=`
        </div>
        <div class="search-result col-md-8 mx-auto py-4">
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-12">
                    <h3 class="lyrics-name">Something Went Wrong, No Song Found! Try Again Later</h3>
                </div>
            </div>
        </div>`
      });
});
 function lyrics(title, name){
    fetch(`https://api.lyrics.ovh/v1/${name}/${title}`)
    .then(res=> res.json())
    .then(data=>{
        console.log(data.lyrics);
        const songLyrics = (data.lyrics);
        if (songLyrics== undefined) {
            document.getElementById("lyrics").innerText= "Something Went Wrong, No Song Found! Try Again Later!";
        }
        else{
            document.getElementById("lyrics").innerText= songLyrics;
        }
    })
    .catch(error=>{
        document.getElementById("lyrics").innerText= "Something Went Wrong, No Song Found! Try Again Later!";
    })
 }
