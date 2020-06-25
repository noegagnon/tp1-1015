    var i = 2;
    var j = 2;
    var taille = 5;

    var starti = i - Math.floor(taille/2);
    var endi = i + Math.floor(taille/2);


    console.log({ starti, endi });



    var startj = j - Math.floor(taille/2);
    var endj = j + Math.floor(taille/2);

    console.log({ startj, endj });



    
    for (x=i - Math.floor(taille/2); x <= i+Math.floor(taille/2); x++) {
        for (y = j-Math.floor(taille/2); y <= j+Math.floor(taille/2); y++) {
            console.log({ x, y })

        }
    }
