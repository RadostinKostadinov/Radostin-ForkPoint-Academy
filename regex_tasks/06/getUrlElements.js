/* 
6.	Да се извлекат отделните елементи от URL. Елементите са: host, username, domain, port, path, filename, extension, query. 

Примерни URL:
a.	ftp://johnsmith@my.domain.com:8080/path/to/resource/file.txt
b.	https://www.google.com/search?q=notpron
c.	http://example.com/page.html
 */

const validInput = 'ftp://johnsmith@my.domain.com:8080/path/to/resource/file.txt';

function getUrlElements(string){
    const pattern = /^([^\/]+)\/\/(?<host>(?=.*@)(?<username>[\w.]+)@(?<domain>[\w.]+)(:(?<port>[\d]+))?|[\w.]+)(?<path>((?=\/)(\/?[\w]+)+)?\/(?<file>\w+\.(?<extension>\w+)?)?)?(\?|\/)?\??(?<query>.+)?$/m;
    const match = string.match(pattern);
    const i = match.indexOf('groups');
    console.log(Object.entries(match.groups));
}   

getUrlElements(validInput);