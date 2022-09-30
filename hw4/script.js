const str = `<strong>'The Internet is becoming'</strong> a part of the social life of a modern teenager: they get to know
each other and spend
time, look for information related to their studies or hobbies, 'discover their knowledge' and / or software
products. <span style="color: red; font-weight: bolder;">aren't</span>  
<strong>'The Internet, as a network infrastructure'</strong>, was created and developed on the basis of an open
protocol and <span style="color: red; font-weight: bolder;">aren't</span>  
scenario. Therefore, the data <strong>'is transferred in transactions'</strong> or unencrypted, which makes it
available for <span style="color: red; font-weight: bolder;">aren't</span>  
interception and reading. Also, fees, spam servers and <strong>'zombie networks'</strong> disseminate
information at the <span style="color: red; font-weight: bolder;">aren't</span> 
initiative of the sender and clog the mailboxes of email users with spam in the same way that they clog the
original mailboxes and distribute flyers and brochures. <strong>'Absolutely any user can publish false
    information'</strong>, or
materials of special content: materials of pornographic, hateful content, suicidal materials, sectarian
materials, profanity materials.
<br>
`
document.querySelector('#text').innerHTML = str + '<button id="replace-btn">Изменить кавычки на двойные</button>'

const replacer = /'/gi;
const replacerBack = /"/gi;

function once() {
    document.querySelector('#text').innerHTML = str.replace(replacer, '"')
}
document.querySelector('#replace-btn').addEventListener('click', (e) => once())
