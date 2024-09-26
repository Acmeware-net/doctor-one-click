var userName = "aaa";
var password = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!";
var testPassword = new RegExp(userName);
var match = password.match(testPassword);
console.log(match)
if (match.Success)
{
    console.log("Do not include name in password.");
}
else
{
    console.log("Good password.");
}