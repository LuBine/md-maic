function formatKBD(processedText) {
    return processedText = processedText.replace(/([A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+(?:\s*\+\s*[A-Za-z0-9!@#$%^&*()_+={};':"<>?,./`~]+)*)/g, (match) => {
        return match.split('+').map(key => `<kbd>${key.trim()}</kbd>`).join(' + ');
    });
}


function formatTag(processedText){
    return processedText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function rootMod(processedText){
    return processedText.replace(/([^\s]+)::#([a-zA-Z0-9]+)::/g, '<font color="#$2">$1</font>');
}

module.exports = { formatKBD,formatTag,rootMod };