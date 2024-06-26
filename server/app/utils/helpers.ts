export function makeid(length:number):string {
    let result = ""
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLenght = characters.length;
    for (let i = 0; i <length; i++){
        result += characters.charAt(Math.floor(Math.random()* charactersLenght));
    }

    return result;
}

export function slugify(str:string):string{
    str = str.trim();
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    var from = "àáäâãèéëêìíïîòóöôõùúüûũñç·/_,:;";
    var to   = "aaaaaeeeeiiiiooooouuuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes
        .replace(/⁻+/,"-") // trim - from start of text
        .replace(/-+$/,"-") //trim - from end of text
        .replace(/-/g, "-")
    return str;
}